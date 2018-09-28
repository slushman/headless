import React from 'react';
import styled from 'styled-components';

import WPMenuContainer from '../WPMenu/WPMenuContainer';

const SiteFooter = styled.footer`
	--flexwrap: wrap;

	align-items: center;
	background-color: var(--color-dark-gray );
	color: var(--color-light );
	display: flex;
	flex-wrap: var(--flexwrap);
	justify-content: space-between;
	padding: 2em 1em;
	position: relative;
	transition: background-color 0.5s ease;

	@media screen and ( min-width: 550px) {
		--flexwrap: inherit;
	}
`;

const Copyright = styled.div`
	--flex: 0 0 50%;
	--order: 2;
	
	flex: var(--flex);
	order: var(--order );

	@media screen and ( min-width: 550px) {
		--flex: 1;
		--order: 1;
	}
`;

const SocialWrap = styled.div`
	--flex: 0 0 100%;
	--order: 1;

	flex: var(--flex);
	order: var(--order );

	@media screen and ( min-width: 550px) {
		--flex: 1;
		--order: 2;
	}

	svg {
		fill: var(--color-light );
	}
`;

const MenuWrap = styled.div`
	--flex: 0 0 50%;

	flex: var(--flex);
	order: 3;

	@media screen and ( min-width: 550px) {
		--flex: 1;
	}
`;

const Footer = props => {
	//console.log( props );

	return (
		<SiteFooter>
			<Copyright>&copy; { new Date().getFullYear() } Slushman</Copyright>
			<SocialWrap>
				<WPMenuContainer location="social" />
			</SocialWrap>
			<MenuWrap>
				<WPMenuContainer location="footer" linkClass="test" />
			</MenuWrap>
		</SiteFooter>
	);
};

export default Footer;
