import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import WPMenu from '../WPMenu/WPMenu';

const SiteHeader = styled.header`
	--bgcolor: var(--color-light);
	--flexdir: column;
	--height: var(--site-header-height);
	--padsides: 0;
	--pos: ${props => props.page.startsWith('/post') ? 'fixed' : 'relative'};

	align-items: center;
	background-color: var(--bgcolor);
	color: var(--color-light);
	display: flex;
	flex-direction: var(--flexdir);
	flex-wrap: wrap;
	height: var(--height);
	justify-content: space-between;
	margin: 0;
	padding-left: var(--padsides);
	padding-right: var(--padsides);
	position: var(--pos);
	top: 0;
	transition: background-color 1s ease;
	width: 100%;
	z-index: 99;

	@media screen and (min-width: 560px) {
		--bgcolor: ${props => {

			if ('/blog' === props.page) {

				return 'var(--color-med-gray)';

			} else if ('/' === props.page) {

				return 'transparent';

			} else {

				return 'var(--color-dark-blue)';

			}
		}};

		--flexdir: row;
		--padsides: 1em;
		--pos: ${props => '/' === props.page ? null : 'fixed'};
	}
`;

const Title = styled.p`
	--top-marg: 0.25em;

	margin: 0;
	margin-top: var(--top-marg);

	@media screen and (min-width: 560px) {
		--top-marg: 0;
	}
`;

const TitleHome = styled.h1`
	display: none;
`;

const StyledLink = styled(Link)`
	display: block;
`;

const LogoImg = styled.img`
	--width: 300px;

	filter: var(--filter);
	height: auto;
	transition: width 1s ease;
	width: var(--width);

	@media screen and (min-width: 560px) {
		--filter: ${props => '/' === props.page ? null : 'grayscale(100) brightness(100)'};
		--width: ${props => '/' !== props.page ? '200px' : '300px'};
	}
`;

const TitleContent = props => (
	<StyledLink to="/">
		<LogoImg src="/images/slushman-animated.svg" alt="Slushman" page={props.pathname} />
	</StyledLink>
);

const Header = props => {
	//console.log(props)

	return (
		<SiteHeader page={props.pathname} transitionName="header">
			<Title><TitleContent {...props} /></Title>
			{'/' === props.pathname && <TitleHome>Slushman</TitleHome>}
			<WPMenu menuId={127} page={props.pathname} />
		</SiteHeader>
	);
};

Header.propTypes = {
	location: PropTypes.object,
	path: PropTypes.string,
	pathname: PropTypes.string,
};

export default Header;