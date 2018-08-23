import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import App from './components/App/App';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SkipToContentLink from './components/App/SkipToContentLink';
import registerServiceWorker from './registerServiceWorker';
import './globalStyles.js';

ReactGA.initialize('UA-27308708-01', { debug: false });

const SiteMain = styled.main`
	display: grid;

	& > div {
		width: 100vw;
	}

	@media screen and (min-width: 560px) {
		padding-top: ${props => '/' === props.path ? '0' : 'var(--site-header-height)'};
	}
`;

render(
	<BrowserRouter>
		<Route to="/" render={ props => {
			return (
				<Fragment>
					<SkipToContentLink />
					<Header pathname={props.location.pathname} />
					<SiteMain id="primary" path={props.location.pathname}>
						<App {...props} />
					</SiteMain>
					<Footer />
				</Fragment>
			)}
		} />
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();