import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import he from 'he';

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
`;

const Item = styled.li`
	--margbot: 1.5em;

	margin-bottom: var(--margbot);

	@media screen and (min-width: 550px) {
		max-width: 50%;
	}
`;

const PostNavLink = styled(Link)`
	--link-color: #0474B5;
	color: var(--link-color);

	&:visited,
	&:active,
	&:hover {
		--link-color: var(--color-dark);
	}

	&:focus {
		outline-color: #E8671C;
	}
`;


const PostNavLinks = ({beforePost,afterPost}) => {
	return (
		<Wrap>
			<CTA>Check out other recent posts:</CTA>
			<List>
				<Item>
					<PostNavLink to={`/post/${beforePost.slug}`}>{he.decode(beforePost.title.rendered)}</PostNavLink>
				</Item>
				<Item>
					<PostNavLink to={`/post/${afterPost.slug}`}>{he.decode(afterPost.title.rendered)}</PostNavLink>
				</Item>
			</List>
		</Wrap>
	);
};

PostNavLinks.propTypes = {
	beforePost: PropTypes.object,
	afterPost: PropTypes.object,
};

export default PostNavLinks;