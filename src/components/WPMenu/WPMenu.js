import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { cachedFetch } from '../../functions';

import WPMenuList from './WPMenuList';

const Nav = styled.nav`
	background-color: ${props => 'default' === props.location ? 'var(--navbgcolor, transparent)' : ''};
	width: ${props => 'default' === props.location ? 'var(--width)' : ''};

	@media screen and (max-width: 559px) {
		--navbgcolor: ${props => 'default' === props.location ? 'var(--color-dark-blue)' : ''};
		--width: ${props => 'default' === props.location ? '100%' : ''};
	}
`;

/**
 * Requires the WPMenu REST API plugin installed on the WordPress site.
 */
class WPMenu extends Component {

	state = {
		menu: {},
		error: null
	}

	componentDidMount() {

		let fetchUrl = this.props.menuId ? `${process.env.REACT_APP_API}/wpmenu/v1/menus/${this.props.menuId}` : `${process.env.REACT_APP_API}/wpmenu/v1/menu-locations/${this.props.location}`

		cachedFetch(`${fetchUrl}`, 5 * 60)
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
					error: ! menu.hasOwnProperty('name') ? 'NotFound' : null
				})
			})
			.catch(error => this.setState({
				error
			}));
	}

	render() {
		if ( !this.state.menu.items && !Array.isArray(this.state.menu) ) { return null; }

		let menuItems = this.props.menuId ? this.state.menu.items : this.state.menu;
		let locationName = this.props.location ? this.props.location : this.state.menu.slug;

		//console.log({ 'props': this.props, 'state': this.state, 'menu': this.state.menu, menuItems, locationName })

		return (
			<Nav location={locationName}>
				<WPMenuList menuLinks={menuItems} location={locationName} {...this.props} />
			</Nav>
		);
	}
}

WPMenu.propTypes = {
	menuId: PropTypes.number,
	location: PropTypes.string,
	page: PropTypes.string
};

export default WPMenu;