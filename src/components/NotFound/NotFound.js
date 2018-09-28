import React from 'react';
import styled from 'styled-components';

import NotFoundPostsContainer from './NotFoundPostsContainer';

const NotFoundSection = styled.section`
	position: relative;
`;

const NotFoundHeader = styled.header`
	--bgcolor: var(--color-accent );
	
	align-items: center;
	background-color: var(--bgcolor );
	color: var(--color-light );
	display: flex;
	height: var(--height );
	justify-content: center;
	margin: 0;
	padding: 1em;
`;

const NotFoundTitle = styled.h1`
	font-family: 'Source Serif Pro', serif;
	font-size: 2em;
	margin: 0;
`;

const NotFoundContent = styled.div`
	--pad: 1em;

	padding-bottom: 1em;
	padding-left: var(--pad );
	padding-right: var(--pad );
	padding-top: 1em;

	@media screen and ( min-width: 700px) {
		--pad: calc( 100vw/2 - 42rem/2);
	}
`;

const Heading = styled.h2``;

const Content = styled.p`
	line-height: 1.75;
`;

const NotFound = () => {
	return (
		<NotFoundSection>
			<NotFoundHeader>
				<NotFoundTitle>Content Not Found</NotFoundTitle>
			</NotFoundHeader>
			<NotFoundContent>
				<Content>Nope. This is not the content you're looking for. Maybe try droids?</Content>
				<Heading>Check out some other posts:</Heading>
			</NotFoundContent>
			<NotFoundPostsContainer />
		</NotFoundSection>
	);
};

export default NotFound;
