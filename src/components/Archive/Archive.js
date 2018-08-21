import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Flexcerpt from '../Flexcerpt/Flexcerpt';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const ArchiveWrapper = styled.div`
	position: relative;
`;

const ArchiveHeader = styled.header`
	--bgcolor: var(--color-med-gray);
	
	align-items: center;
	background-color: var(--bgcolor);
	color: var(--color-charcoal);
	display: flex;
	height: var(--height);
	justify-content: center;
	margin: 0;
	padding: 1em;

	@media screen and (min-width: 560px) {
		--bgcolor: var(--color-dark-blue);
		color: var(--color-light);
	}
`;

const ArchiveTitle = styled.h1`
	font-family: 'Source Serif Pro', serif;
	font-size: 2em;
	margin: 0;
`;

const ArchiveList = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(calc( 375px - 2em ), 1fr));
	list-style: none;
	margin: 0;
	padding: 0;
`;

const ArchiveCTABottomWrap = styled.div`
	align-items: center;
	display: flex;
`;

const ArchiveCTALoadMore = styled.button`
	--borderColor: var(--color-dark-blue);
	--bgColor: var(--color-dark-blue);
	--color: var(--color-light);

	background: none;
	background-color: var(--bgColor);
	border: 2px solid var(--borderColor);
	border-radius: 0;
	box-shadow: none;
	color: var(--color);
	cursor: pointer;
	display: block;
	font-size: 1em;
	margin: 0 auto;
	padding: 1.5em;
	transition: all 0.4s ease;
	text-shadow: none;
	text-transform: uppercase;

	&:hover,
	&:active,
	&:focus {
		--bgColor: var(--color-light);
		--color: var(--color-dark-blue);

		border-color: inherit;
	}
`;

const Archive = props => {
	//console.log(props)
	return (
		<ArchiveWrapper>
			<Helmet>
				<link rel="canonical" href="" />
				<title>{props.title}</title>
			</Helmet>
			<ArchiveHeader transitionName="test">
				<ArchiveTitle>{props.title}</ArchiveTitle>
			</ArchiveHeader>
			<ArchiveList>
				{
					props.showPosts.map((post, i) => {
						return (
							<ErrorBoundry key={i}>
								<Flexcerpt post={post} display={['image', 'date']} index={i} />
							</ErrorBoundry>
						)
					})
				}
			</ArchiveList>
			<ArchiveCTABottomWrap>
				<ArchiveCTALoadMore onClick={props.onClick}>See more articles</ArchiveCTALoadMore>
				<ScrollToTop />
			</ArchiveCTABottomWrap>
		</ArchiveWrapper>
	);
};

Archive.propTypes = {
	showPosts: PropTypes.array,
	title: PropTypes.string,
};

export default Archive;