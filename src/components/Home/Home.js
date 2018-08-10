import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HomeLatest from './HomeLatest';
import HomeArchive from './HomeArchive';
import Loading from '../Loading/Loading';
import Footer from '../Footer/Footer';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

const HomeWrapper = styled.div`
	position: relative;
`;

const HomeFeatArticlesHeading = styled.h2`
	--pad: 1em;
	background-color: var(--color-lt-blue);
	color: var(--color-dark);
	font-family: 'Source Serif Pro', serif;
	margin: 0;
	padding-bottom: var(--pad);
	padding-left: 1em;
	padding-right: 1em;
	padding-top: var(--pad);

	@media screen and (min-width: 700px) {
		--pad: 1.5em;
	}
`;

const CTAHomeBottom = styled.div`
	background-color: var(--color-lt-gray);
	padding: 1.5em;
	text-transform: uppercase;
`;

const StyledLink = styled(Link)`
	color: var(--color-dark-blue);
	position: relative;
	text-decoration: none;

	&:before {
		--bgcolor: var(--color-dark-blue);
		--vis: hidden;

		background-color: var(--bgcolor);
		bottom: 0;
		content: "";
		height: 2px;
		left: 0;
		position: absolute;
		transform: scale(0);
		transition: all 0.3s ease-in-out 0s;
		visibility: var(--vis);
		width: 100%;
	}

	&:hover:before {
		--vis: visible;

		transform: scale(1);
	}
`;

const Home = props => {

	let page = {
		title: 'Slushman Home',
		description: 'Full-stack web developer focusing on React, WordPress, performance, and accessibility.',
		link: props.location.pathname
	}

	return (
		<HomeWrapper>
			<Helmet>
				<title>{`${page.title}`}</title>
				<link rel="canonical" href={window.location.href} />
				<meta name="description" content={page.description} />
				<meta property="og:locale" content="en_US" />
				<meta property="og:type" content="article" />
				<meta property="og:title" content={`${page.title}`} />
				<meta property="og:description" content={`${page.description}`} />
				<meta property="og:url" content={window.location.href} />
				<meta property="og:site_name" content="Slushman" />
				<meta property="article:publisher" content="https://www.facebook.com/slushmandesign/" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:description" content={`${page.description}`} />
				<meta name="twitter:title" content={`${page.title}`} />
				<meta name="twitter:site" content="@slushman" />
				<meta name="twitter:creator" content="@slushman" />
				<script type='application/ld+json'>{`{
					"@context": "https://schema.org",
					"@type":"WebPage",
					"author": {
						"@type": "Person",
						"name":"Chris Wilcoxson"
					},
					"headline": "${page.title}"
					"description": "${page.description}"
				}`}</script>
			</Helmet>
			{
				1 === props.latest.length
					? <ErrorBoundry>
						<HomeLatest post={props.latest[0]} />
					</ErrorBoundry>
					: <Loading />
			}
			<HomeFeatArticlesHeading>Featured Articles</HomeFeatArticlesHeading>
			{
				1 <= props.posts.length
					? <HomeArchive title="Blog" {...props} />
					: <Loading />
			}
			<CTAHomeBottom>
				<StyledLink to="/blog">Read more articles</StyledLink>
			</CTAHomeBottom>
			<Footer />
		</HomeWrapper>
	);

};

Home.propTypes = {
	latest: PropTypes.array,
	posts: PropTypes.array,
};

export default Home;