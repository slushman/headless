import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import { cachedFetch } from '../../functions';

import Loading from '../../components/Loading/Loading';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

const AsyncPage = Loadable({
	loader: () => import('../Page/Page'),
	loading: Loading
});

class PageContainer extends Component {
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
			<ErrorBoundry key={i}>
				<Route
					exact
					key={page.id}
					path={`/${page.slug}`}
					render={() => (
						<AsyncPage page={page} pathname={this.props.pathname} />
					)}
				/>
			</ErrorBoundry>
		))
	}

	render() {
		//console.log(this.state)
		return (
			1 <= this.state.pages.length 
				? this.state.pages.map((page, i) => (
					<Route
						exact
						key={page.id}
						path={`/${page.slug}`}
						render={() => (
							<AsyncPage page={page} pathname={this.props.pathname} />
						)}
					/>
				))
				: null
		);
	}
}

export default PageContainer;