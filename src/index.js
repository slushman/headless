import React from 'react';
import { render } from 'react-dom';
import WebFont from 'webfontloader';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import './globalStyles.js';
import ReactGA from 'react-ga';
import './globalStyles.js';

ReactGA.initialize(`${process.env.GATRACKING}`);

WebFont.load({
	google: {
		families: ['Source Code Pro', 'Source Sans Pro:n4,n7', 'Source Serif Pro:n4,n7']
	}
});

const fireTracking = () => {
	ReactGA.pageview(window.location.hash)
}

/**
 * Render function in top Route comes from this article about page transitions:
 * https://blog.etch.team/react-page-transitions-make-your-website-feel-native-bf2804b011dc
 */
render(
	<BrowserRouter onUpdate={fireTracking}>
		<Route to="/" render={
			({location,match}) => {
				const { pathname } = location;
				const { path } = match;
				return (
					<App location={location} pathname={pathname} path={path} />
				);
			}
		} />
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();