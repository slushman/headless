import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import WPMenuContainer from '../WPMenu/WPMenuContainer';

const SiteHeader = styled.header`
	--bgcolor: var(--color-light );
	--flexdir: column;
	--height: var(--site-header-height );
	--padsides: 0;
	--pos: ${ props => props.page.startsWith( '/post' ) ? 'fixed' : 'relative' };

	align-items: center;
	background-color: var(--bgcolor );
	color: var(--color-light );
	display: flex;
	flex-direction: var(--flexdir );
	flex-wrap: wrap;
	height: var(--height );
	justify-content: space-between;
	margin: 0;
	padding-left: var(--padsides );
	padding-right: var(--padsides );
	position: var(--pos );
	top: 0;
	transition: background-color 1s ease;
	width: 100%;
	z-index: 99;

	@media screen and ( min-width: 560px) {
		--bgcolor: ${ props => {
			if ( '/blog' === props.page ) {
				return 'var(--color-dark-gray )';
			} else if ( '/' === props.page ) {
				return 'transparent';
			} else {
				return 'var(--color-dark-blue )';
			}
		} };

		--flexdir: row;
		--padsides: 1em;
		--pos: ${ props => '/' === props.page ? null : 'fixed' };
	}
`;

const Title = styled.p`
	--top-marg: 0.25em;

	margin: 0;
	margin-top: var(--top-marg );

	@media screen and ( min-width: 560px) {
		--top-marg: 0;
	}
`;

const TitleHome = styled.h1`
	display: none;
`;

const StyledLink = styled( Link )`
	display: block;
`;

const LogoImg = styled.img`
	--width: 300px;

	filter: var(--filter );
	height: auto;
	transition: width 1s ease;
	width: var(--width );

	@media screen and ( min-width: 560px) {
		--filter: ${ props => '/' === props.page ? null : 'grayscale( 100 ) brightness( 100 )' };
		--width: ${ props => '/' !== props.page ? '200px' : '300px' };
	}
`;

const TitleContent = ( { page } ) => (
	<StyledLink to="/">
		<LogoImg src="/images/slushman-animated.svg" alt="Slushman" page={ page } />
	</StyledLink>
);

const Header = ( { pathname } ) => {
	return (
		<SiteHeader page={ pathname }>
			<Title><TitleContent page={ pathname } /></Title>
			{ '/' === pathname && <TitleHome>Slushman</TitleHome> }
			<WPMenuContainer location="main" page={ pathname } />
		</SiteHeader>
	);
};

Header.propTypes = {
	pathname: PropTypes.string,
};

export default Header;
