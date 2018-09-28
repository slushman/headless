import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import Slushicon from './Slushicon';

const activeClassName = 'selected';

const LinkStyles = css`
	--display: inline-grid;
	--link-color: ${ props => 'footer' === props.menu ? 'var(--color-light )' : 'var(--color-dark-blue )' };
	--zindex: auto;

	align-items: center;
	color: var(--link-color );
	display: var(--display );
	flex-direction: var(--flexdir );
	justify-content: center;
	padding: 0.5em;
	position: relative;
	text-decoration: none;
	text-transform: ${ props => 'main' === props.menu ? 'uppercase' : '' };
	transition: all 1s ease;
	width: 100%;
	z-index: var(--zindex);

	&:before {
		--height: 2px;
		--underlinkcolor: var(--color-light );
		--transform: scale( 0 );
		--transition: all 0.3s ease-in-out;
		--vis: hidden;
		--zindex: auto;

		background-color: var(--underlinkcolor );
		bottom: 0;
		content: "";
		height: var(--height );
		left: 0;
		position: absolute;
		transform: var(--transform);
		transition: var(--transition);
		visibility: var(--vis );
		width: 100%;
		z-index: var(--zindex);

		@media screen and ( min-width: 560px) {
			--underlinkcolor: ${ props => {
				if ( '/' !== props.page ) {
					return 'var(--color-light )';
				} else {
					return 'var(--color-blue )';
				}
			} };
		}
	}

	&:hover {
		--link-color: ${ props => 'footer' === props.menu ? 'var(--color-light )' : 'var(--color-dark-blue )' };

		@media screen and ( min-width: 560px) {
			--link-color: ${ props => {
				if ( '/' === props.page ) {
					return 'var(--color-dark-blue )';
				} else {
					return 'var(--color-light )';
				}
			} };
		}
	}

	&:hover:before {
		--transform: scale( 1 );
		--vis: visible;
	}

	@media screen and ( max-width: 767px) {
		min-height: 48px;
	}

	@media screen and ( min-width: 560px) {
		--display: flex;
		--flexdir: column;
		--link-color: ${ props => {
			if ( '/' === props.page ) {
				return 'var(--color-dark-blue )';
			} else {
				return 'var(--color-light )';
			}
		} };
	}

	&.${ activeClassName } {
		--link-color: ${ props => {
			//console.log( props )
			if ( 'footer' === props.menu) {
				return 'var(--color-charcoal)';
			} else if ( '/blog' === props.page ) {
				return 'var(--color-med-gray )';
			} else {
				return 'var(--color-dark )';
			}
		} };
		--zindex: 1;

		@media screen and ( min-width: 560px) {
			--link-color: ${ props => '/blog' === props.page ? 'var(--color-charcoal)' : 'var(--color-dark )' };
		}

		&:hover {
			--link-color: ${ props => {
				if ( 'footer' === props.menu) {
					return 'var(--color-light )';
				} else {
					return 'var(--color-dark-blue )';
				}
			} };

			@media screen and ( min-width: 560px) {
				--link-color: var(--color-light );
			}
		}

		&:before {
			--height: 100%;
			--transform: none;
			--transition: all 1s ease;
			--underlinkcolor: ${ props => {
				if ( 'footer' === props.menu) {
					return 'var(--color-light )';
				} else if ( '/blog' === props.page ) {
					return 'var(--color-dark-gray )';
				} else {
					return 'var(--color-lt-blue )';
				}
			} };
			--vis: visible;
			--zindex: -1;

			@media screen and ( min-width: 560px) {
				--underlinkcolor: ${ props => '/blog' === props.page && 'var(--color-light )' };
			}
		}

		&:hover:before {
			--bgcolor: var(--color-light );
			--height: 2px;
			--underlinkcolor: ${ props => '/blog' === props.page ? 'var(--color-charcoal)' : 'var(--color-light )' };
		}
	}
`;

const InternalLink = styled(NavLink )`
	${LinkStyles }
`;

const ExternalLink = styled.a`
	${LinkStyles }
`;

const WPMenuLink = props => {
	const linkTarget = props.link.target && "_blank" === props.link.target ? props.link.target : null;
	const linkTitle = props.link.title ? props.link.title : null;
	const destination = 'custom' === props.link.type ? props.link.url : props.link.slug;
	//console.log( { props, linkTarget, linkTitle, destination } )
	return (
		<Fragment>
			{
				'custom' === props.link.type
					? <ExternalLink
						className={ classNames( props.linkClass ) }
						activeClassName={ props.activeClassName }
						menu={ props.menu }
						page={ props.page }
						href={ destination }
						target={ linkTarget }
						title={ linkTitle }
						exact={ true }
					>
						<Slushicon title={ props.link.title } classes={ props.itemClasses }  />
					</ExternalLink>
					: <InternalLink
						className={ classNames( props.linkClass ) }
						activeClassName={ props.activeClassName }
						menu={ props.menu }
						page={ props.page }
						to={ destination }
						target={ linkTarget }
						title={ linkTitle }
						exact={ true }
					>
						<Slushicon title={ props.link.title } classes={ props.itemClasses } />
					</InternalLink>
			}
		</Fragment>
	);
};

WPMenuLink.propTypes = {
	link: PropTypes.object.isRequired,
	menu: PropTypes.string,
	itemClasses: PropTypes.array,
	page: PropTypes.string,
};

export default WPMenuLink;
