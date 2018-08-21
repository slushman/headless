import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WPMenuList from './WPMenuList';

const Nav = styled.nav`
	--width: 100%;

	background-color: ${props => 'default' === props.location ? 'var(--navbgcolor, transparent)' : ''};
	width: var(--width);

	@media screen and (max-width: 559px) {
		--navbgcolor: ${props => 'default' === props.location ? 'var(--color-dark-blue)' : ''};
	}

	@media screen and (min-width: 560px) {
		--width: auto;
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