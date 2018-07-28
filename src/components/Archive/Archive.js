import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import Excerpt from '../Excerpt/Excerpt';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Footer from '../Footer/Footer';

import { getColorClass } from '../../functions';

import '../Excerpt/ExcerptColors.css';

const transitionName = 'zoom';

const ArchiveWrapper = styled.div`
	position: relative;

	@media screen and (min-width: 560px) {
		padding-top: var(--site-header-height);
	}
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

	.${transitionName}-enter {
		opacity: 0;
	}

	.${transitionName}-enter.${transitionName}-enter-active {
		height: 100vh;
		opacity: 1;
		transition: all 5s ease;
		width: 100vw;
	}

	.${transitionName}-exit {
		height: 100vh;
		opacity: 1;
		transform: scale(10);
		width: 100vw;
	}

	.${transitionName}-exit.${transitionName}-exit-active {
		opacity: 0;
		transition: all 5s ease;
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
	background: none;
	background-color: var(--color-blue);
	border: none;
	border-radius: 0;
	box-shadow: none;
	color: var(--color-light);
	display: block;
	font-size: 1em;
	min-width: 40vw;
	margin: 0 auto;
	padding: 1.5em;
	text-shadow: none;
	text-transform: uppercase;

	&:hover,
	&:active,
	&:focus {
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
				<TransitionGroup component={null}>
					{
						props.showPosts.map((post, i) => {
							let colorClass = getColorClass(i);
							//console.log({colorClass,i})
							return (
								<CSSTransition
									key={i}
									classNames={transitionName}
									timeout={{
										enter: 5000,
										exit: 5000
									}}
								>
									<ErrorBoundry key={i}>
										<Excerpt post={post} listItemClass={[colorClass]} />
									</ErrorBoundry>
								</CSSTransition>
							)
						})
					}
				</TransitionGroup>
			</ArchiveList>
			<ArchiveCTABottomWrap>
				<ArchiveCTALoadMore onClick={props.onClick}>See more articles</ArchiveCTALoadMore>
				<ScrollToTop />
			</ArchiveCTABottomWrap>
			<Footer />
		</ArchiveWrapper>
	);
};

Archive.propTypes = {
	showPosts: PropTypes.array,
	title: PropTypes.string,
};

export default Archive;