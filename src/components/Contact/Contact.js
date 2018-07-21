import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import ContactForm from './ContactForm';
import LinkMenu from '../LinkMenu/LinkMenu';
import IconFacebook from '../Icons/Facebook';
import IconGithub from '../Icons/Github';
import IconTwitter from '../Icons/Twitter';
import Footer from '../Footer/Footer';

const ContactWrapper = styled.div``;

const ContactArticle = styled.article`
	transition: all 0.5s ease;

	@media screen and (min-width: 560px) {
		padding-top: var(--site-header-height);
	}
`;

const ContactHeader = styled.header`
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

const ContactTitle = styled.h1`
	font-family: 'Source Serif Pro', serif;
	font-size: 2em;
	margin: 0;
`;

const ContentWrap = styled.div`
	--pad: 1em;

	padding: 1em var(--pad);

	@media screen and (min-width: 700px) {
		--pad: calc(100vw/2 - 42rem/2);
	}
`;

const SocialHeading = styled.h2`
	font-family: 'Source Serif Pro', serif;
	margin: 0 0 1em;
`;

const SocialSection = styled.section``;

const Content = styled.p`
	line-height: 1.75;
`;

const Heading = styled.h2``;

const Contact = (props) => {
	//console.log(props)

	let socialLinks = [
		{
			url: 'https://github.com/slushman',
			component: <IconGithub height="48" width="48" />
		},
		{
			url: 'https://www.facebook.com/slushmandesign',
			component: <IconFacebook height="48" width="48" />
		},
		{
			url: 'https://twitter.com/slushman',
			component: <IconTwitter height="48" width="48" />
		},
	]

	let page = {
		title: 'Contact',
		description: 'Contact slushman or connect with me on social media.',
		link: props.location.pathname
	}

	return (
		<ContactWrapper>
			<ContactArticle>
				<Helmet>
					<title>{`${page.title}`}</title>
					<link rel="canonical" href={`${props.location.pathname}`} />
					<meta property="og:locale" content="en_US" />
					<meta property="og:type" content="article" />
					<meta property="og:title" content={`${page.title}`} />
					<meta property="og:description" content={`${page.description}`} />
					<meta property="og:url" content={`${props.location.pathname}`} />
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
				<ContactHeader>
					<ContactTitle>Contact</ContactTitle>
				</ContactHeader>
				<ContentWrap>
					<SocialSection>
						<SocialHeading>Connect With Me on Social Media</SocialHeading>
						<LinkMenu menuLinks={socialLinks} menuName="social" />
					</SocialSection>

					<Heading>Need a Developer?</Heading>
					<Content>I'm available to work on projects as a freelance developer. I've worked on projects ranging from large, complex sites with strict government-enforced standards to single-page static HTML sites. I've built with WordPress, React, plain HTML, and other systems. We will work together to determine what works best for your project and organization.</Content>
					<Content>I'm experienced at creating accurate cost estimates, timelines, and delivering within the expected timeframe.</Content>
					<Content>When contacting me about a project, please include the following information:</Content>
					<ul>
						<li>A description of your organization</li>
						<li>An overview of the project</li>
						<li>Your deadline and/or your ideal timeline</li>
						<li>Your project budget</li>
					</ul>
					
					<Heading>Need Training?</Heading>
					<Content>I've trained hundreds of people on using their websites, particularly with WordPress. I've done one-on-one trainings as well as group presentations for government organizations, universities, non-profits, individuals, and businesses. To setup a training session, contact me with your preferred date and training needs.</Content>
					
					<Heading>Not Sure You Need a New Site?</Heading>
					<Content>With a site audit, I'll find ways your site can load and operate faster, be more accessible, and easier to use. Contact me with your specific concerns and your site URL for rates.</Content>
					
					<ContactForm />
				</ContentWrap>
			</ContactArticle>
			<Footer />
		</ContactWrapper>
	);
}

export default Contact;
