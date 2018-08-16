import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WPMenuList from './WPMenuList';

const Nav = styled.nav`
	background-color: ${props => 'default' === props.location ? 'var(--navbgcolor, transparent)' : ''};
	width: ${props => 'default' === props.location ? 'var(--width)' : ''};

	@media screen and (max-width: 559px) {
		--navbgcolor: ${props => 'default' === props.location ? 'var(--color-dark-blue)' : ''};
		--width: ${props => 'default' === props.location ? '100%' : ''};
	}
`;

const WPMenu = props => {
	return (
		<Nav location={props.menu.slug}>
			<WPMenuList menuLinks={props.menu.items} {...props} />
		</Nav>
	);
};

WPMenu.propTypes = {
	menu: PropTypes.object
};

export default WPMenu;