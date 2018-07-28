import React from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import IconEmail from '../Icons/Email';
import IconFacebook from '../Icons/Facebook';
import IconGoogle from '../Icons/Google';
import IconLinkedIn from '../Icons/LinkedIn';
import IconPinterest from '../Icons/Pinterest';
import IconStumbleupon from '../Icons/Stumbleupon';
import IconTumblr from '../Icons/Tumblr';
import IconTwitter from '../Icons/Twitter';

const ShurlSection = styled.section`
	--pad: 1em;

	background-color: var(--color-med-gray);
	padding-bottom: 1.5em;
	padding-left: var(--pad);
	padding-right: var(--pad);
	padding-top: 1em;

	@media screen and (min-width: 700px) {
		--pad: calc(100vw/2 - 42rem/2);
	}
`;

const ShurlCTA = styled.h2``;

const ShurlsList = styled.ul`
	--display: grid;

	display: var(--display);
	flex-wrap: wrap;
	grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));
	justify-content: space-between;
	justify-items: center;
	list-style: none;
	margin: 0;
	padding: 0;

	@media screen and (min-width: 560px) {
		--display: flex;
	}
`;

const ShurlItem = styled.li``;

const ShurlLink = styled.a`
	display: block;
`;

const eventTracking = (name, event) => {
	console.log()
	ReactGA.event({
		category: 'SocialSharing',
		action: 'Clicked ' + name,
	})
}

const Shurls = (props) => {
	//console.log(props)

	const currentUrl = window.location.href;
	const currentTitle = escape(props.post.title);
	const currentExcerpt = escape(props.post.excerpt);
	const currentMedia = props.post.media ? props.post.media : null;

	const shurlLinks = [
		{
			url: `mailto:?subject=${currentTitle}&body=${currentExcerpt}`,
			component: <IconEmail fillColor="#000" height="44" width="44" />,
			name: 'email',
		},
		{
			url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
			component: <IconFacebook fillColor="#3b5998" height="44" width="44" />,
			name: 'facebook',
		},
		{
			url: `https://plus.google.com/share?url=${currentUrl}`,
			component: <IconGoogle fillColor="#dd4b39" height="44" width="44" />,
			name: 'google',
		},
		{
			url: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&source=${currentUrl}`,
			component: <IconLinkedIn fillColor="#0077b5" height="44" width="44" />,
			name: 'linkedin',
		},
		{
			url: `https://pinterest.com/pin/create/button/url=${currentUrl}&description=${currentExcerpt}&media=${currentMedia}`,
			component: <IconPinterest fillColor="#bd081c" height="44" width="44" />,
			name: 'pinterest',
		},
		{
			url: `http://www.stumbleupon.com/submit?url=${currentUrl}&title=${currentTitle}`,
			component: <IconStumbleupon fillColor="#eb4924" height="44" width="44" />,
			name: 'stumbleupon',
		},
		{
			url: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${currentUrl}&title=${currentTitle}`,
			component: <IconTumblr fillColor="#35465c" height="44" width="44" />,
			name: 'tumblr',
		},
		{
			url: `https://twitter.com/intent/tweet?url=${currentUrl}`,
			component: <IconTwitter fillColor="#1da1f2" height="44" width="44" />,
			name: 'twitter',
		},
	]

	return (
		<ShurlSection>
			<ShurlCTA>Share this post!</ShurlCTA>
			<ShurlsList>
				{
					shurlLinks.map((link, i) => (
						<ShurlItem key={i}>
							<ShurlLink className="shurl-link" href={link.url} data-name={link.name} onClick={(e) => eventTracking(link.name, e)} target="_blank">
								{link.component}
							</ShurlLink>
						</ShurlItem>
					))
				}
			</ShurlsList>
		</ShurlSection>
	);
};

export default Shurls;