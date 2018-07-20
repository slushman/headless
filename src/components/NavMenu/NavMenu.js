import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styled from 'styled-components';

const NavMenu = styled.nav``;

const MenuList = styled.nav`
	display: flex;
	justify-content: center;
	list-style: none;
	margin: 0;
	padding: 0;
`;

const MenuItem = styled.li`
	flex: 1;
	margin-bottom: 0;
	margin-left: ${props => 'social' === props.location ? '1em' : ''};
	margin-right: ${props => 'social' === props.location ? '1em' : ''};
	margin-top: 0;
	position: relative;
	text-align: center;

	& ul { /* All submenus */
		--opacity: 0;
	}

	&:hover ul { /* All submenus */
		--opacity: 1;
	}
`;

const MenuLink = styled(NavLink)`
	--display: inline-grid;
	--link-color: ${props => 'default' === props.location ? 'var(--color-light)' : ''};

	align-items: center;
	color: var(--link-color);
	display: var(--display);
	justify-content: center;
	padding: 0.5em;
	text-transform: ${props => 'default' === props.location ? 'uppercase' : ''};
	width: 100%;

	@media screen and (max-width: 767px) {
		min-height: 48px;
	}
`;

const NavMenu = (props) => {

	return (
		<NavMenu location={props.menuName}>
			<MenuList className={classNames(props.listClass)}>
				{props.navLinks.map((link, i) => (
					<li className={classNames(props.itemClass)} key={i}>
						<MenuLink
							className={classNames(props.linkClass)}
							activeClassName="current-menu-link"
							to={link.url}
						>
							{link.label}
						</MenuLink>
					</li>
				))}
			</MenuList>
		</NavMenu>
	);
};

NavMenu.propTypes = {
	navLinks: PropTypes.array.isRequired,
	menuName: PropTypes.string.isRequired,
	listClass: PropTypes.array,
	itemClass: PropTypes.array,
	linkClass: PropTypes.array
};

export default NavMenu;