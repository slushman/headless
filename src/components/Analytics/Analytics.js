import React, { Component } from 'react';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-27308708-1');

const Analytics = (WrappedComponent, options = {}) => {

	const trackPage = page => {
		ReactGA.set({
			page,
			...options
		});
		ReactGA.pageview(page);
	}

	const HOC = class extends Component {
		componentDidMount() {
			const page = this.props.location.pathname;
			trackPage( page );
		}

		componentWillReceiveProps(nextProps) {
			const currentPage = this.props.location.pathname;
			const nextPage = nextProps.location.pathname;

			if (currentPage !== nextPage) {
				trackPage(nextPage);
			}
		}

		render () {
			return <WrappedComponent {...this.props} />;
		}

	} // HOC

	return HOC;

} // withTracker

export default Analytics;