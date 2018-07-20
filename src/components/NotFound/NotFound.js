import React from 'react';
import styled from 'styled-components';

const NotFoundSection = styled.section``;

const NotFoundHeader = styled.header`
	--bgcolor: var(--color-dark-blue);
	
	align-items: center;
	background-color: var(--bgcolor);
	color: var(--color-light);
	display: flex;
	height: var(--height);
	margin: 0;
	padding-left: 1em;
	padding-right: 1em;
	padding-top: var(--site-header-height);
`;

const NotFoundTitle = styled.h1`
	font-family: 'Source Serif Pro', serif;
	font-size: 2em;
	margin: 0;
`;

const NotFoundContent = styled.div`
	--pad: 1em;

	padding-left: var(--pad);
	padding-right: var(--pad);

	@media screen and (min-width: 700px) {
		--pad: calc(100vw/2 - 42rem/2);
	}
`;

const NotFound = () => {
	return (
		<NotFoundSection>
			<NotFoundHeader>
				<NotFoundTitle>Error 404</NotFoundTitle>
			</NotFoundHeader>
			<NotFoundContent>
				Nope. This is not the page you're looking for. Maybe try droids?
			</NotFoundContent>
		</NotFoundSection>
	);
};

export default NotFound;