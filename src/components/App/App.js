import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import styled from 'styled-components';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SkipToContentLink from './SkipToContentLink';
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
const AsyncContact = Loadable({
	loader: () => import('../Contact/Contact'),
	loading: Loading
});
const AsyncPageContainer = Loadable({
	loader: () => import('../Page/PageContainer'),
	loading: Loading
});
// const AsyncPage = Loadable({
// 	loader: () => import('../Page/Page'),
// 	loading: Loading
// });
const AsyncNotFound = Loadable({
	loader: () => import('../NotFound/NotFound'),
	loading: Loading
});

const SiteMain = styled.main`
	display: grid;

	& > div {
		width: 100vw;
	}
`;

const App = props => {
	return (
		<Fragment>
			<SkipToContentLink />
			<Header {...props} />
			<SiteMain id="primary">
				<Route location={props.location} render={() => (
					<Switch>
						<Route exact path="/" component={AsyncHome} />
						<Route exact path="/blog" render={(match) => (
							<AsyncArchive match={match} />
						)} />
						<Route exact path="/contact" component={AsyncContact} />
						<Route path="/post/:slug" component={AsyncPost} />
						<AsyncPageContainer />
						{/*1 <= this.state.pages.length ? this.pageRoutes(this.state.pages) : null*/}
						<Route component={AsyncNotFound} />
					</Switch>
				)} />
			</SiteMain>
			<Footer />
		</Fragment>
	);
};

export default App;