import React from 'react';
import styled from 'styled-components';

import WPMenuContainer from '../WPMenu/WPMenuContainer';

const SiteFooter = styled.footer`
	align-items: center;
	background-color: var(--color-dark-gray);
	color: var(--color-light);
	display: flex;
	justify-content: space-between;
	padding: 2em 1em;
	position: relative;
	transition: background-color 0.5s ease;
`;

const Copyright = styled.div``;

const Footer = props => {
	//console.log(props);

	return (
		<SiteFooter>
			<Copyright>&copy; {new Date().getFullYear()} Slushman</Copyright>
			<WPMenuContainer location="footer" />
		</SiteFooter>
	);
};

export default Footer;

