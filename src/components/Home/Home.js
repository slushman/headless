import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { cachedFetch } from '../../functions';

import HomeLatest from './HomeLatest';
import HomeArchive from './HomeArchive';
import Loading from '../Loading/Loading';
import Footer from '../Footer/Footer';

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
	background-color: var(--color-med-gray);
	padding: 1.5em;
	text-transform: uppercase;
`;

const StyledLink = styled(Link)`
	position: relative;
	text-decoration: none;

	&:before {
		--bgcolor: var(--color-dark);
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

class Home extends Component {

	state = {
		posts: {},
		error: null,
		quantity: 12,
		start: 0,
		latest: {}
	}

	componentDidMount() {

		cachedFetch(`${process.env.REACT_APP_API}/wp/v2/posts?_embed&per_page=1`, 24 * 60 * 60)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					this.setState({
						error: 'Something went wrong...'
					})
				}
			})
			.then(latest => {
				this.setState({
					latest
				})
				cachedFetch(`${process.env.REACT_APP_API}/wp/v2/posts?_embed&per_page=100&categories=145&exclude=${latest[0].id}`, 24 * 60 * 60)
					.then(response => {
						if (response.ok) {
							return response.json();
						} else {
							this.setState({
								error: 'Something went wrong...'
							})
						}
					})
					.then(posts => {
						this.setState({
							posts
						})
					})
					.catch(error => this.setState({
						error
					}));
			})
			.catch(error => this.setState({
				error
			}));

	}

	render() {
		//console.log(this.state)
		let page = {
			title: 'Slushman Home',
			description: 'Web developer focusing on creating full-stack sites using React, WordPress, performance, and accessibility.',
			link: this.props.location.pathname
		}
		return (
			<HomeWrapper>
				<Helmet>
					<title>{`${page.title}`}</title>
					<link rel="canonical" href={`${this.props.location.pathname}`} />
					<meta property="og:locale" content="en_US" />
					<meta property="og:type" content="article" />
					<meta property="og:title" content={`${page.title}`} />
					<meta property="og:description" content={`${page.description}`} />
					<meta property="og:url" content={`${this.props.location.pathname}`} />
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
					1 === this.state.latest.length
						? <HomeLatest post={this.state.latest[0]} />
						: <Loading />
				}
				<HomeFeatArticlesHeading>Featured Articles</HomeFeatArticlesHeading>
				{
					1 <= this.state.posts.length
						? <HomeArchive title="Blog" {...this.state} />
						: <Loading />
				}
				<CTAHomeBottom>
					<StyledLink to="/blog">Read more articles</StyledLink>
				</CTAHomeBottom>
				<Footer />
			</HomeWrapper>
		);
	}
}

export default Home;