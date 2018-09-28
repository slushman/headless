import React from 'react';
import styled from 'styled-components';

const SkipLink = styled.a`
	border: 0;
	clip: rect( 1px, 1px, 1px, 1px);
	clip-path: inset( 50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute !important;
	width: 1px;
	word-wrap: normal !important;

	&:focus {
		background-color: var(--color-lt-gray );
		border-radius: 3px;
		box-shadow: 0 0 2px 2px var(--color-dark );
		clip: auto !important;
		clip-path: none;
		color: var(--color-dark );
		display: block;
		font-size: 0.875em;
		font-weight: bold;
		height: auto;
		left: 5px;
		line-height: normal;
		padding: 15px 23px 14px;
		text-decoration: none;
		top: 5px;
		width: auto;
		z-index: 100000;						
	}
`;

const SkipToContentLink = () => {
	return (
		<SkipLink href="#main">
			Skip to content
		</SkipLink>
	);
};

export default SkipToContentLink;
