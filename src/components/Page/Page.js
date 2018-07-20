import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import he from 'he';
import styled from 'styled-components';

import Footer from '../Footer/Footer';

const PageWrapper = styled.div`
	position: relative;
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

	@media screen and (min-width: 700px) {
		--pad: calc(100vw/2 - 42rem/2);
	}
`;

const Page = ({ page }) => {
	//console.log(page)

	return (
		<PageWrapper>
			<PageArticle>
				<Helmet>
					<title>{he.decode(page.title.rendered)}</title>
					<link rel="canonical" href={`${page.link}`} />
					<meta property="og:locale" content="en_US" />
					<meta property="og:type" content="article" />
					<meta property="og:title" content={he.decode(page.title.rendered)} />
					<meta property="og:description" content={page.excerpt.rendered} />
					<meta property="og:url" content={`${page.link}`} />
					<meta property="og:site_name" content="Slushman" />
					<meta property="article:publisher" content="https://www.facebook.com/slushmandesign/" />
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:description" content={page.excerpt.rendered} />
					<meta name="twitter:title" content={he.decode(page.title.rendered)} />
					<meta name="twitter:site" content="@slushman" />
					<meta name="twitter:creator" content="@slushman" />
					<script type='application/ld+json'>{`{
						"@context": "https://schema.org",
						"@type":"WebPage",
						"author": {
							"@type": "Person",
							"name":"Chris Wilcoxson"
						},
						"headline": "${he.decode(page.title.rendered)}"
						"lastReviewed": "${page.modified}",
						"description": "${page.excerpt.rendered}"
					}`}</script>
				</Helmet>
				<PageHeader>
					<PageTitle>{page.title.rendered}</PageTitle>
				</PageHeader>
				<PageContent dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
			</PageArticle>
			<Footer />
		</PageWrapper>
	);
};

Page.propTypes = {
	page: PropTypes.object
};

export default Page;