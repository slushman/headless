import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import WPMenuList from './WPMenuList';

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

const activeClassName = 'selected';

const MenuItemLink = styled(NavLink)`
	--display: inline-grid;
	--link-color: ${props => 'footer' === props.menulocation ? 'var(--color-light)' : 'var(--color-dark-blue)'};
	--zindex: auto;

	align-items: center;
	color: var(--link-color);
	display: var(--display);
	justify-content: center;
	padding: 0.5em;
	position: relative;
	text-decoration: none;
	text-transform: ${props => 'default' === props.menulocation ? 'uppercase' : ''};
	transition: all 1s ease;
	width: 100%;
	z-index: var(--zindex);

	&:before {
		--height: 2px;
		--underlinkcolor: var(--color-light);
		--transform: scale(0);
		--transition: all 0.3s ease-in-out;
		--vis: hidden;
		--zindex: auto;

		background-color: var(--underlinkcolor);
		bottom: 0;
		content: "";
		height: var(--height);
		left: 0;
		position: absolute;
		transform: var(--transform);
		transition: var(--transition);
		visibility: var(--vis);
		width: 100%;
		z-index: var(--zindex);

		@media screen and (min-width: 560px) {
			--underlinkcolor: ${props => {
				if ('/blog' === props.page) {
					return 'var(--color-charcoal)';
				} else if ('/' !== props.page) {
					return 'var(--color-light)';
				} else {
					return 'var(--color-blue)';
				}
			}};
		}
	}

	&:hover {
		--link-color: ${props => 'footer' === props.menulocation ? 'var(--color-light)' : 'var(--color-dark-blue)'};

		@media screen and (min-width: 560px) {
			--link-color: ${props => {
				if ('/' === props.page) {
					return 'var(--color-dark-blue)';
				} else if ('/blog' === props.page) {
					return 'var(--color-charcoal)';
				} else {
					return 'var(--color-light)';
				}
			}};
		}
	}

	&:hover:before {
		--transform: scale(1);
		--vis: visible;
	}

	@media screen and (max-width: 767px) {
		min-height: 48px;
	}

	@media screen and (min-width: 560px) {
		--link-color: ${props => {
			if ('/' === props.page) {
				return 'var(--color-dark-blue)';
			} else if ('/blog' === props.page ) {
				return 'var(--color-charcoal)';
			} else {
				return  'var(--color-light)';
			}
		}};
	}

	&.${activeClassName} {
		--link-color: ${props => {
			if ('/blog' === props.page || 'footer' === props.menulocation) {
				return 'var(--color-charcoal)';
			} else {
				return 'var(--color-dark)';
			}
		}};
		--zindex: 1;

		@media screen and (min-width: 560px) {
			--link-color: ${props => '/blog' === props.page ? 'var(--color-light)' : 'var(--color-dark)'};
		}

		&:hover {
			--link-color: ${props => {
				if ('footer' === props.menulocation) {
					return 'var(--color-light)';
				} else if ('/blog' === props.page) {
					return 'var(--color-charcoal)';
				} else {
					return 'var(--color-dark-blue)';
				}
			}};

			@media screen and (min-width: 560px) {
				--link-color: ${props => '/blog' === props.page ? 'var(--color-charcoal)' : 'var(--color-light)'};
			}
		}

		&:before {
			--height: 100%;
			--transform: none;
			--transition: all 1s ease;
			--underlinkcolor: ${props => {
				if ('footer' === props.menulocation) {
					return 'var(--color-light)';
				} else if ('/blog' === props.page) { 
					return 'var(--color-med-gray)';
				} else {
					return 'var(--color-lt-blue)';
				}
			}};
			--vis: visible;
			--zindex: -1;

			@media screen and (min-width: 560px) {
				--underlinkcolor: ${props => '/blog' === props.page && 'var(--color-charcoal)'};
			}
		}

		&:hover:before {
			--bgcolor: ${props => '/blog' === props.page ? 'var(--color-charcoal)' : 'var(--color-light)'};
			--height: 2px;
			--underlinkcolor: ${props => '/blog' === props.page ? 'var(--color-charcoal)' : 'var(--color-light)'};
		}
	}
`;

const WPMenuItem = ({ item, location, menuLinks, depthLevel, ...rest }) => {

	const subMenuLinks = menuLinks.filter(link => {
		return parseInt(link.parent, 10) === parseInt(item.id, 10);
	})

	//console.log({ rest })

	const linkTarget = item.target && "_blank" === item.target ? item.target : null;
	const linkTitle = item.title ? item.title : null;

	//if (item.classes.includes('slushicons')) {

		// const svgIcon = item.classes.filter(classname => {
		// 	return classname.includes('svg-')
		// })

		// recrate the Slushicons structure here. Allow for
		// icon - text, text - icon, icon only, text only.

		//const iconName = svgIcon ? svgIcon.toString().substr(4) : null;
		//const properName = iconName.charAt(0).toUpperCase() + iconName.substr(1);

		/**
		 * Figure out how to pass the name of a component here.
		 */
		//itemTitle = Icon(properName);

	//}

	return (
		<MenuItem location={location} className={item.classes.string}>
			<MenuItemLink
				className={classNames(rest.linkClass)}
				activeClassName={activeClassName}
				depth={depthLevel}
				menulocation={location}
				page={rest.page}
				to={`/${item.slug}`}
				target={linkTarget}
				title={linkTitle}
				exact={true}
			>{item.title}</MenuItemLink>
			{1 <= subMenuLinks.length 
				? <WPMenuList 
					menuLinks={menuLinks} 
					location={location} 
					parentId={parseInt(item.id, 10)} 
					depthLevel={depthLevel + 1} 
					{...rest} /> 
				: null
			}
		</MenuItem>
	);
}

WPMenuItem.propTypes = {
	menuLinks: PropTypes.array
}

export default WPMenuItem;