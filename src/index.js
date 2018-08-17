import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';

import App from './components/App/App';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SkipToContentLink from './components/App/SkipToContentLink';
import registerServiceWorker from './registerServiceWorker';
import './globalStyles.js';
import ReactGA from 'react-ga';
import './globalStyles.js';

ReactGA.initialize(`${process.env.GATRACKING}`);

const fireTracking = () => {
	ReactGA.pageview(window.location.hash)
}

const SiteMain = styled.main`
	display: grid;

	& > div {
		width: 100vw;
	}
`;

render(
	<BrowserRouter onUpdate={fireTracking}>
		<Route to="/" render={ props => {
				return (
					<Fragment>
						<SkipToContentLink />
						<Header pathname={props.location.pathname} />
						<SiteMain id="primary">
							<App {...props} />
						</SiteMain>
						<Footer />
					</Fragment>
				);
			}
		} />
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();