import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { cachedFetch } from '../../functions';

import WPMenu from './WPMenu';
import Loading from '../Loading/Loading';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

/**
 * Requires the WPMenu REST API plugin installed on the WordPress site.
 */
class WPMenuContainer extends Component {

	state = {
		menu: {},
		error: null
	}

	componentDidMount() {

		let fetchUrl = this.props.menuId ? `${process.env.REACT_APP_API}/wpmenu/v1/menus/${this.props.menuId}` : `${process.env.REACT_APP_API}/wpmenu/v1/menu-locations/${this.props.location}`

		cachedFetch(`${fetchUrl}`, 24 * 60 * 60)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					this.setState({
						error: 'Something went wrong...'
					})
				}
			})
			.then(menu => {
				this.setState({
					menu,
					error: !menu.hasOwnProperty('name') ? 'NotFound' : null
				})
			})
			.catch(error => this.setState({
				error
			}));
	}

	render() {
		//console.log(this.state.menu)
		return (
			<ErrorBoundry>
			{
				this.state.menu.items && 1 <= this.state.menu.items.length
					? <WPMenu
						menu={this.state.menu}
						{...this.props}
					/>
					: <Loading />
			}
			</ErrorBoundry>
		);
	}
}

WPMenuContainer.propTypes = {
	menuId: PropTypes.number,
	location: PropTypes.string,
	page: PropTypes.string
};

export default WPMenuContainer;