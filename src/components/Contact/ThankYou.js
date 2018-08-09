import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
	padding-bottom: 3em;
	padding-top: 3em;
`;

const Content = styled.p`
	margin-bottom: 1.5em;
`;

const Success = Content.extend`
	color: green;
`;

const ThankYou = props => {
	return (
		<Wrap>
			<Success>Message sent!</Success>
			<Content>Thank you for contacting me! I'll respond as soon as I can.</Content>
			<Content>While you're waiting, <Link to="/blog">read some articles from my blog</Link>!</Content>

		</Wrap>
	);
};

export default ThankYou;