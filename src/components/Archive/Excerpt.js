import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment-js';
import he from 'he';
import classNames from 'classnames';
import styled from 'styled-components';
import { getImage } from '../../functions';

const transitionName = 'zoom';

const ExcerptListItem = styled.li`
	display: flex;
	flex-direction: column;
	hyphens: auto;
	overflow-wrap: break-word;
	transition: all 0.5s ease;
	word-wrap: break-word;
	word-break: break-all;
	word-break: break-word;

	&:hover,
	&:focus-within {
		--filter: grayscale(1);
	}

	&:focus-within a:focus {
		outline: none;
		text-decoration: none;
	}

	.${transitionName}-enter {
		opacity: 0;
	}

	.${transitionName}-enter.${transitionName}-enter-active {
		height: 100vh;
		opacity: 1;
		transition: all 1s ease;
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
		transform: scale(10);
		transition: all 1s ease;
	}
`;

const ExcerptLink = styled(Link)``;

const ExcerptImg = styled.div`
	--height: 7em;
	--bgImage: url(${props => props.image});

	background-image: var(--bgImage);
	background-repeat: no-repeat;
	background-size: cover;
	filter: var(--filter);
	height: var(--height);

	@media screen and (min-width: 700px) {
		--height: 10em;
	}
`;

const ExcerptTitleWrap = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	max-width: 60ch;
	padding: 1em;
`;

const ExcerptTitle = styled.h2``;

const ExcerptDate = styled.small`
	margin-top: auto;
	margin-bottom: 0;
	text-decoration: none;
`;

const Excerpt = props => {
	//console.log(post)

	let post = props.post;
	let image = post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0] : false;
	let imageSource = image.media_details ? getImage(image.media_details.sizes, 'small') : null
	let excerptTitle = he.decode(post.title.rendered);

	return (
		<ExcerptListItem className={classNames(props.listItemClass)}>
			<ExcerptLink to={`/post/${post.slug}`}>
				<ExcerptImg image={imageSource} />
				<ExcerptTitleWrap>
					<ExcerptTitle>{excerptTitle}</ExcerptTitle>
					<ExcerptDate>Published {moment(post.date).format("YYYY.MM.DD")}</ExcerptDate>
				</ExcerptTitleWrap>
			</ExcerptLink>
		</ExcerptListItem>
	);
};

Excerpt.propTypes = {
	post: PropTypes.object,
	listItemClass: PropTypes.array
};

export default Excerpt;