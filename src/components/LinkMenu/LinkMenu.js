import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styled from 'styled-components';

import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

const Nav = styled.nav`
	margin-bottom: ${props => 'social' === props.location ? '1.5em' : ''};
`;

const MenuList = styled.ul`
	display: flex;
	justify-content: center;
	list-style: none;
	margin: 0;
	padding: 0;
`;

const MenuListItem = styled.li`
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

const MenuItemLink = styled(Link)`
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

const LinkMenu = (props) => {

	return (
		<Nav location={props.menuName}>
			<MenuList className={classNames(props.listClass)}>
				{props.menuLinks.map((link, i) => (
					<ErrorBoundry>
						<MenuListItem className={classNames(props.itemClass)} key={i}>
							<MenuItemLink className={classNames(props.linkClass)} to={link.url}>
								{link.component}
							</MenuItemLink>
						</MenuListItem>
					</ErrorBoundry>
				))}
			</MenuList>
		</Nav>
	);
};

LinkMenu.propTypes = {
	menuLinks: PropTypes.array.isRequired,
	menuName: PropTypes.string,
	listClass: PropTypes.array,
	itemClass: PropTypes.array,
	linkClass: PropTypes.array
};

LinkMenu.defaultProps = {
	menuName: 'main'
}

export default LinkMenu;