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