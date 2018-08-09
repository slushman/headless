import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import he from 'he';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Footer from '../Footer/Footer';

const transitionName = 'swap';

const PageWrapper = styled.div`
	position: relative;

	&.${transitionName}-enter {
		opacity: 0;
	}

	&.${transitionName}-enter.${transitionName}-enter-active {
		opacity: 1;
		transform: scale(1);
		transition: all 1s ease;
	}

	&.${transitionName}-exit {
		opacity: 1;
	}

	&.${transitionName}-exit.${transitionName}-exit-active {
		opacity: 0;
		transform: scale(10);
		transition: all 1s ease;
	}
`;

const PageArticle = styled.article`
	@media screen and (min-width: 560px) {
		padding-top: var(--site-header-height);
	}
`;

const PageHeader = styled.header`
	--bgcolor: var(--color-lt-blue);
	
	align-items: center;
	background-color: var(--bgcolor);
	color: var(--color-dark);
	display: flex;
	height: var(--height);
	justify-content: center;
	margin: 0;
	padding: 1em;

	&.fade-enter {
		opacity: 0;
	}

	&.fade-enter.fade-enter-active {
		opacity: 1;
		transition: all 1s ease;
	}

	&.fade-exit {
		opacity: 1;
	}

	&.fade-exit.fade-exit-active {
		opacity: 0;
		transition: all 1s ease;
	}
`;

const PageTitle = styled.h1`
	font-family: 'Source Serif Pro', serif;
	font-size: 2em;
	margin: 0;
`;

const PageContent = styled.div`
	--pad: 1em;

	padding-bottom: 1em;
	padding-left: var(--pad);
	padding-right: var(--pad);
	padding-top: 1em;

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

	@media screen and (min-width: 700px) {
		--pad: calc(100vw/2 - 42rem/2);
	}
`;

const Page = ({ page, pathname }) => {
	//console.log(props)

	let pageExcerpt = page.yoast && 0 !== page.yoast.metadesc.length ? page.yoast.metadesc : he.decode(page.excerpt.rendered);
	let pageTitle = he.decode(page.title.rendered);

	return (
		<PageWrapper data-test="page">
			<PageArticle>
				<Helmet>
					<title>{pageTitle}</title>
					<link rel="canonical" href={`${page.link}`} />
					<meta name="description" content={pageExcerpt} />
					<meta property="og:locale" content="en_US" />
					<meta property="og:type" content="article" />
					<meta property="og:title" content={pageTitle} />
					<meta property="og:description" content={pageExcerpt} />
					<meta property="og:url" content={`${page.link}`} />
					<meta property="og:site_name" content="Slushman" />
					<meta property="article:publisher" content="https://www.facebook.com/slushmandesign/" />
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:description" content={pageExcerpt} />
					<meta name="twitter:title" content={pageTitle} />
					<meta name="twitter:site" content="@slushman" />
					<meta name="twitter:creator" content="@slushman" />
					<script type='application/ld+json'>{`{
						"@context": "https://schema.org",
						"@type":"WebPage",
						"author": {
							"@type": "Person",
							"name":"Chris Wilcoxson"
						},
						"headline": "${pageTitle}"
						"lastReviewed": "${page.modified}",
						"description": "${pageExcerpt}"
					}`}</script>
				</Helmet>
				<TransitionGroup component={null}>
					<CSSTransition
						classNames="fade"
						timeout={{
							enter: 5000,
							exit: 5000
						}}
					>
					
						<PageHeader>
							<PageTitle>{pageTitle}</PageTitle>
						</PageHeader>
					</CSSTransition>
				</TransitionGroup>
				<CSSTransition
					classNames="fade"
					timeout={{
						enter: 5000,
						exit: 5000
					}}
				>
					<PageContent dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
				</CSSTransition>
			</PageArticle>
			<Footer />
		</PageWrapper>
	);
};

Page.propTypes = {
	page: PropTypes.object
};

export default Page;