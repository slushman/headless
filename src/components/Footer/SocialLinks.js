import React from 'react';

import LinkMenu from '../LinkMenu/LinkMenu';
import IconFacebook from '../Icons/Facebook';
import IconGithub from '../Icons/Github';
import IconTwitter from '../Icons/Twitter';

const SocialLinks = () => {

	let socialLinks = [
		{
			url: 'https://github.com/slushman',
			component: <IconGithub height="48" width="48" fillColor="#fff" />
		},
		{
			url: 'https://www.facebook.com/slushmandesign',
			component: <IconFacebook height="48" width="48" fillColor="#fff" />
		},
		{
			url: 'https://twitter.com/slushman',
			component: <IconTwitter height="48" width="48" fillColor="#fff" />
		},
	]

	return (
		<LinkMenu menuLinks={socialLinks} menuName="social" />
	);
};

export default SocialLinks;