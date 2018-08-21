import React from 'react';
import moment from 'moment-js';
import PropTypes from 'prop-types';
import he from 'he';
import EmbedContainer from 'react-oembed-container';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { getImage } from '../../functions';

import Caption from './Caption';
import Shurls from './Shurls';
import PostNavLinks from './PostNavLinks';

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
		top: 0;
		width: 100%;
		z-index: 0;
	}
`;

const PostArticle = styled.article`
	position: relative;
`;

const PostHeader = styled.header`
	--bgcolor: ${props => props.imageSizes ? 'rgba(2, 51, 79 ,0.5)' : 'var(--color-dark-blue)'};
	--pad: ${props => props.imageSizes ? '3em' : '1em'};
	--bgImage: url(${props => props.imageSizes.small});
	
	align-items: center;
	background-color: var(--bgcolor);
	background-image: var(--bgImage);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	color: var(--color-light);
	display: flex;
	flex-direction: column;
	height: var(--height);
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
		--bgImage: url(${props => props.imageSizes.med});
		--pad: ${props => props.imageSizes.med ? '7.5em' : '3em'};
	}

	@media screen and (min-width: 700px) {
		justify-content: center;
	}

	@media screen and (min-width: 1024px) {
		--bgImage: url(${props => props.imageSizes.large});
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
		--fontsize: 3em;
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

	@media screen and (min-width: 700px) {
		--pad: calc(100vw/2 - 42rem/2);
	}
`;

const PostContent = styled.div`
	& a {
		--link-color: #0474B5;
		color: var(--link-color);
	}

	& a:visited,
	& a:active,
	& a:hover {
		--link-color: var(--color-dark);
	}

	& a:focus {
		outline-color: #E8671C;
	}
`;

const Post = props => {

	//console.log(props)

	let image = props.post._embedded['wp:featuredmedia'] ? props.post._embedded['wp:featuredmedia'][0] : false;

	let imageSizes = {
		small: image.media_details ? getImage(image.media_details.sizes, 'small') : null,
		med: image.media_details ? getImage(image.media_details.sizes, 'med') : null,
		large: image.media_details ? getImage(image.media_details.sizes, 'large') : null,
	}

	let post = {
		title: he.decode(props.post.title.rendered),
		image: image ? image.source_url : null,
		height: image ? image.media_details.height : null,
		width: image ? image.media_details.width : null,
		altText: image ? image.alt_text : null,
		excerpt: props.post.yoast && 0 !== props.post.yoast.metadesc.length ? props.post.yoast.metadesc : he.decode(props.post.excerpt.rendered),
	}

	return (
		<PostWrapper>
			<PostArticle pathname={props.pathname}>
				<Helmet>
					<title>{props.post.yoast && 0 !== props.post.yoast.title.length ? props.post.yoast.title : post.title}</title>
					<link rel="canonical" href={props.post.link} />
					<meta name="description" content={post.excerpt} />
					<meta property="og:locale" content="en_US" />
					<meta property="og:type" content="article" />
					<meta property="og:title" content={post.title} />
					<meta property="og:description" content={post.excerpt} />
					<meta property="og:url" content={props.post.link} />
					<meta property="og:site_name" content="Slushman" />
					<meta property="article:publisher" content="https://www.facebook.com/slushmandesign/" />
					<meta property="article:section" content={props.post._embedded['wp:term'][0][0].name} />
					<meta property="article:published_time" content={props.post.date} />
					<meta property="article:modified_time" content={props.post.modified} />
					<meta property="og:updated_time" content={props.post.modified} />
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
				<PostHeader imageSizes={imageSizes}>
					<PostTitle image={post.image}>{post.title}</PostTitle>
					{	image.credits
							? <Caption credits={image.credits} />
							: null
					}
				</PostHeader>
				<PostDate>Published {moment(props.post.date).format("YYYY.MM.DD")}</PostDate>
				<PostPrimary id="primary">
					<EmbedContainer markup={props.post.content.rendered}>
						<PostContent dangerouslySetInnerHTML={{ __html: props.post.content.rendered }} />
					</EmbedContainer>
				</PostPrimary>
				<Shurls {...props} />
				<PostNavLinks beforePost={props.beforePost} afterPost={props.afterPost} />
			</PostArticle>
		</PostWrapper>
	);
};

Post.propTypes = {
	post: PropTypes.object,
	match: PropTypes.object
};

export default Post;