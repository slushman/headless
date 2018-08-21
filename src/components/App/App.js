import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import { cachedFetch } from '../../functions';

import Analytics from '../Analytics/Analytics';
import Loading from '../Loading/Loading';

const AsyncHome = Loadable({
	loader: () => import('../Home/HomeContainer'),
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
const AsyncPage = Loadable({
	loader: () => import('../Page/Page'),
	loading: Loading
});
const AsyncNotFound = Loadable({
	loader: () => import('../NotFound/NotFound'),
	loading: Loading
});

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

	pageRoutes = (pages,location) => {
		//console.log(props)
		return pages.map((page, i) => {
			//console.log(props)
			return (
				<Route
					exact
					key={page.id}
					path={`/${page.slug}`}
					component={Analytics(AsyncPage)}
					//render={() => (<AsyncPage page={page} location={location} />)}
				/>
			)
		})
	}
	
	render() {
		// console.log(this.props)
		// console.log(this.state)
		// <Route exact path="/blog" render={() => (<AsyncArchive match={this.props.match} />)} />
		return (
			1 <= this.state.pages.length 
				? 	<Switch>
						<Route exact path="/" component={Analytics(AsyncHome)} />
						<Route exact path="/blog" render={() => (
							Analytics(<AsyncArchive match={this.props.match} />)
						)} />
						{1 <= this.state.pages.length ? this.pageRoutes(this.state.pages,this.props.location) : null }
						<Route path="/post/:slug" component={Analytics(AsyncPost)} />
						<Route exact path="/404" component={Analytics(AsyncNotFound)} />
						<Redirect from="/:slug" to="/post/:slug" />
						<Route component={Analytics(AsyncNotFound)} />
					</Switch>
				: null
		);
	}
};

export default App;