import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flexcerpt from '../Flexcerpt/Flexcerpt';

const Wrap = styled.nav`
	--pad: 1em;

	padding-left: var(--pad);
	padding-right: var(--pad);
	position: relative;

	@media screen and (min-width: 700px) {
		--pad: calc(100vw/2 - 42rem/2);
	}
`;

const CTA = styled.h2`

`;

const List = styled.ul`
	justify-content: space-between;
	list-style: none;
	margin: 0;
	padding: 0;

	@media screen and (min-width: 550px) {
		display: flex;
	}

	& li {
		max-width: 50%;
	}
`;

const PostNavLinks = ({beforePost,afterPost}) => {
	return (
		<Wrap>
			<CTA>Check out other recent posts:</CTA>
			<List>
				{
					beforePost ? <Flexcerpt post={beforePost} display={['date','content']} /> : null
				}
				{
					afterPost ? <Flexcerpt post={afterPost} display={['date','content']} /> : null
				}
			</List>
		</Wrap>
	);
};

PostNavLinks.propTypes = {
	beforePost: PropTypes.object,
	afterPost: PropTypes.object,
};

export default PostNavLinks;