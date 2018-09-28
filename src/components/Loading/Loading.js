import React from 'react';
import styled from 'styled-components';

const LoadingContent = styled.div`
	--pad: 1em;

	padding-left: var(--pad );
	padding-right: var(--pad );

	@media screen and ( min-width: 700px) {
		--pad: calc( 100vw/2 - 42rem/2);
	}
`;

const Loading = ( { isLoading, error } ) => {
	if ( isLoading ) {
		return <LoadingContent>Loading...</LoadingContent>
	} else if ( error ) {
		return <LoadingContent>Sorry, there was a problem loading the page.</LoadingContent>
	} else {
		return null;
	}
};

export default Loading;
