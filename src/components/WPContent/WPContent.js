import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EmbedContainer from 'react-oembed-container';

const Content = styled.div`
	& a {
		--link-color: var(--color-blue);
		
		color: var(--link-color);
	}

	& a:visited,
	& a:active,
	& a:hover {
		--link-color: var(--color-blue);
	}

	& a:focus {
		outline-color: #E8671C;
	}

	& p {
		line-height: 1.75;
		margin: 0 0 1.5em;
	}

	& pre,
	& code,
	& kbd,
	& samp, {
		font-family: 'Source Code Pro', monospace;
		position: relative;
	}

	& pre {
		color: var(--color-light);
		padding: 1.5em 0;
		position: relative;
		z-index: 1;
	}

	& pre:before {
		background-color: var(--color-dark);
		bottom: 0;
		content: "";
		left: 50%;
		margin-right: -50vw;
		margin-left: -50vw;
		position: absolute;
		right: 50%;
		top: 0;
		width: 100vw;
		z-index: -1;
	}

	& pre code {
		display: block;
		font-family: 'Source Code Pro', monospace;
		font-size: 1rem;
		overflow: scroll;
		padding: 1em;
	}
`;

const WPContent = ({content}) => {
	return (
		<EmbedContainer markup={content.rendered}>
			<Content dangerouslySetInnerHTML={{ __html: content.rendered }} />
		</EmbedContainer>
	);
};

WPContent.propTypes = {
	content: PropTypes.object
};

export default WPContent;