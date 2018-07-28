import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { cachedFetch } from '../../functions';
import styled from 'styled-components';

import Header from '../Header/Header';
//import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';

const AsyncHome = Loadable({
	loader: () => import('../Home/Home'),
	loading: Loading
});
const AsyncArchive = Loadable({
	loader: () => import('../Archive/ArchiveContainer'),
	loading: Loading
});
const AsyncPost = Loadable({
	loader: () => import('../Post/PostContainer'),
	loading: Loading
});
const AsyncContact = Loadable({
	loader: () => import('../Contact/Contact'),
	loading: Loading
});
const AsyncPage = Loadable({
	loader: () => import('../Page/Page'),
	loading: Loading
});
const AsyncNotFound = Loadable({
	loader: () => import('../NotFound/NotFound'),
	loading: Loading
});

const SiteMain = styled.main`
	display: grid;
	grid-template-areas: 'TransitionThis';

	& > div {
		grid-area: TransitionThis;
		width: 100vw;
	}
`;

class App extends Component {

	state = {
		pages: {}
	}

	componentDidMount() {
		cachedFetch(`${process.env.REACT_APP_API}/wp/v2/pages?_embed&per_page=100`, 30 * 24 * 60 * 60)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					this.setState({
						error: 'Something went wrong...'
					})
				}
			})
			.then(pages => {
				this.setState({
					pages
				})
			})
			.catch(error => this.setState({
				error
			}));
	}

	pageRoutes = (pages) => {
		return pages.map((page, i) => (
			<Route
				exact
				key={page.id}
				path={`/${page.slug}`}
				render={() => (
					<AsyncPage page={page} pathname={this.props.pathname} />
				)}
			/>
		))
	}

	render() {
		//console.log(this.state);
		
		return (
			<Fragment>
				<Header {...this.props} />
				<SiteMain id="primary">
					<Route location={this.props.location} render={() => (
						<Switch>
							<Route exact path="/" component={AsyncHome} />
							<Route exact path="/blog" render={(match) => (
								<AsyncArchive match={match} />
							)} />
							<Route exact path="/contact" component={AsyncContact} />
							<Route path="/post/:slug" component={AsyncPost} />
							{1 <= this.state.pages.length ? this.pageRoutes(this.state.pages) : null}
							<Route component={AsyncNotFound} />
						</Switch>
					)} />
				</SiteMain>
			</Fragment>
		);
	}
}

export default App;
