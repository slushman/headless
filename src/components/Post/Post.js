import React from 'react';
import moment from 'moment-js';
import PropTypes from 'prop-types';
import he from 'he';
import EmbedContainer from 'react-oembed-container';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Shurls from './Shurls';
import Footer from '../Footer/Footer';

const PostWrapper = styled.div`
	background: linear-gradient(to right top, #0089f2 50%, #DDD 50%);
    background-size: 100% calc(100% - 100vh);
    background-repeat: no-repeat;
    background-position: 0px var(--site-header-height);
	position: relative;

	&:before {
		background: var(--color-light);
		bottom: 0;
		content: "";
		position: fixed;
		top: calc(var(--site-header-height) + var(--scroll-height));
		width: 100%;
		z-index: 0;
	}
`;

const PostArticle = styled.article`
	--headAndScroll: calc(var(--site-header-height) + var(--scroll-height));
	--padtop: ${props => props.pathname.startsWith('/post') ? 'var(--headAndScroll)' : null};
	
	padding-top: var(--padtop);
	position: relative;

	@media screen and (min-width: 560px) {
		--padtop: var(--headAndScroll);
	}
`;

const PostHeader = styled.header`
	--bgcolor: ${props => props.image ? 'rgba(2, 51, 79 ,0.5)' : 'var(--color-dark-blue)'};
	--pad: ${props => props.image ? '3em' : '1em'};
	
	align-items: center;
	background-attachment: fixed;
	background-color: var(--bgcolor);
	background-image: url(${props => props.image});
	background-repeat: no-repeat;
	background-size: cover;
	color: var(--color-light);
	display: flex;
	height: var(--height);
	justify-content: center;
	margin: 0;
	padding-bottom: var(--pad);
	padding-left: 1em;
	padding-right: 1em;
	padding-top: var(--pad);
	position: relative;

	&:before {
		background-color: var(--bgcolor);
		bottom: 0;
		content: "";
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
	}

	@media screen and (min-width: 560px) {
		--pad: ${props => props.image ? '3em' : '1em'};
	}
`;

const PostTitle = styled.h1`
	--fontsize: 2em;
	color: var(--color-light);
	font-family: 'Source Serif Pro', serif;
	font-size: var(--fontsize);
	margin: 0;
	max-width: 42rem;
	z-index: 1;

	@media screen and (min-width: 560px) {
		--fontsize: ${props => props.image ? '3em' : '2em'};
	}
`;

const PostDate = styled.p`
	--pad: 1em;

	background-color: var(--color-lt-blue);
	margin: 0;
	padding-bottom: 1em;
	padding-left: var(--pad);
	padding-right: var(--pad);
	padding-top: 1em;

	@media screen and (min-width: 700px) {
		--pad: calc(100vw/2 - 42rem/2);
	}
`;

const PostPrimary = styled.div`
	--pad: 1em;

	padding-bottom: 2em;
	padding-left: var(--pad);
	padding-right: var(--pad);
	padding-top: 1em;

	& p {
		line-height: 1.75;
		margin-bottom: 1.5em;
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

	@media screen and (min-width: 700px) {
		--pad: calc(100vw/2 - 42rem/2);
	}
`;

const PostContent = styled.div``;

const Post = props => {

	//console.log(props)

	let image = props.post._embedded['wp:featuredmedia'] ? props.post._embedded['wp:featuredmedia'][0] : false;

	let post = {
		title: he.decode(props.post.title.rendered),
		image: image ? image.source_url : null,
		height: image ? image.media_details.height : null,
		width: image ? image.media_details.width : null,
		altText: image ? image.alt_text : null,
		excerpt: he.decode(props.post.excerpt.rendered.replace(/<[^>]+>/g, ''))
	}

	return (
		<PostWrapper>
			<PostArticle image={post.image} pathname={props.pathname}>
				<Helmet>
					<title>{post.title}</title>
					<link rel="canonical" href={`${props.post.link}`} />
					<meta property="og:locale" content="en_US" />
					<meta property="og:type" content="article" />
					<meta property="og:title" content={post.title} />
					<meta property="og:description" content={post.excerpt} />
					<meta property="og:url" content={`${props.post.link}`} />
					<meta property="og:site_name" content="Slushman" />
					<meta property="article:publisher" content="https://www.facebook.com/slushmandesign/" />
					<meta property="article:section" content={`${props.post._embedded['wp:term'][0][0].name}`} />
					<meta property="article:published_time" content={`${props.post.date}`} />
					<meta property="article:modified_time" content={`${props.post.modified}`} />
					<meta property="og:updated_time" content={`${props.post.modified}`} />
					<meta property="og:image" content={post.image} />
					<meta property="og:image:secure_url" content={post.image} />
					<meta property="og:image:width" content={post.width} />
					<meta property="og:image:height" content={post.height} />
					<meta property="og:image:alt" content={post.altText} />
					<meta name="twitter:image" content={post.image} />
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:description" content={post.excerpt} />
					<meta name="twitter:title" content={post.title} />
					<meta name="twitter:site" content="@slushman" />
					<meta name="twitter:creator" content="@slushman" />
					<script type='application/ld+json'>{`{
						"@context": "https://schema.org",
						"@type":"BlogPosting",
						"author": {
							"@type": "Person",
							"name":"Chris Wilcoxson"
						},
						"headline": "${post.title}"
						"datePublished": "${props.post.date}",
						"image": "${post.image}",
						"description": "${post.excerpt}"
					}`}</script>
				</Helmet>
				<PostHeader image={post.image}>
					<PostTitle image={post.image}>{post.title}</PostTitle>
				</PostHeader>
				<PostDate>Published {moment(props.post.date).format("YYYY.MM.DD")}</PostDate>
				<PostPrimary id="primary">
					<EmbedContainer markup={props.post.content.rendered}>
						<PostContent dangerouslySetInnerHTML={{ __html: props.post.content.rendered }} />
					</EmbedContainer>
				</PostPrimary>
				<Shurls {...props} />
			</PostArticle>
			<Footer />
		</PostWrapper>
	);
};

Post.propTypes = {
	post: PropTypes.object,
	match: PropTypes.object
};

export default Post;