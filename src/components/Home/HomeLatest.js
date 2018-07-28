import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import he from 'he';
import styled from 'styled-components';

const PostLatest = styled.div`
	--padtop: 1em;
	--padbot: 1em;
	padding-bottom: var(--padbot);
	padding-top: var(--padtop);
	background: linear-gradient(rgba(255,255,255,0.85),rgba(255,255,255,0.85)), url(${props => props.image});
	transition: all 5s ease;

	@media screen and (min-width: 560px) {
		--padbot: 3em;
		--padtop: calc(var(--site-header-height) * 2);
		margin-top: calc(var(--site-header-height) * -1);
	}
`;

const HomeLatestTitleContent = styled.div`
	--pad: 1em;

	padding-left: var(--pad);
	padding-right: var(--pad);

	@media screen and (min-width: 700px) {
		--pad: calc(100vw/2 - 42rem/2);
	}
`;

const CTAHomeTop = styled.p`
	text-transform: uppercase;
`;

const HomeLatestTitle = styled.h2`
	font-size: 2.5em;
`;

const HomeContentExcerpt = styled.div``;

const HomeLatest = ({post}) => {
	//console.log(post)

	let image = post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0] : false;
	let imageSource = false !== image ? image.source_url : null;

	return (
		<PostLatest image={imageSource}>
			<HomeLatestTitleContent>
				<CTAHomeTop>Read my latest article:</CTAHomeTop>
				<HomeLatestTitle>
					<Link to={`/post/${post.slug}`}>{he.decode(post.title.rendered)}</Link>
				</HomeLatestTitle>
				<HomeContentExcerpt dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
			</HomeLatestTitleContent>
		</PostLatest>
	);
};

HomeLatest.propTypes = {
	post: PropTypes.object
};

export default HomeLatest;