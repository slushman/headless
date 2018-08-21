import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import he from 'he';
import styled from 'styled-components';

import FormContainer from '../Contact/FormContainer';
import GitHub from '../GitHub/GitHub';

const PageWrapper = styled.div`
	position: relative;
`;

const PageArticle = styled.article``;

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
`;

const PageTitle = styled.h1`
	font-family: 'Source Serif Pro', serif;
	font-size: 2em;
	margin: 0;
`;

const ContentWrap = styled.div`
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

const WPContent = styled.div`
	p {
		line-height: 1.75;
		margin: 0 0 1.5em;
	}
`;

const Page = ({ page, location }) => {
	//console.log(page)
	//console.log(location)

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
				<PageHeader>
					<PageTitle>{pageTitle}</PageTitle>
				</PageHeader>
				<ContentWrap>
					<WPContent dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
					{
						'/contact' === location.pathname
							? <FormContainer />
							: null
					}
					{
						'/plugins' === location.pathname
							? <GitHub />
							: null
					}
				</ContentWrap>
			</PageArticle>
		</PageWrapper>
	);
};

Page.propTypes = {
	page: PropTypes.object
};

export default Page;