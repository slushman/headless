import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment-js';
import he from 'he';
import classNames from 'classnames';
import styled from 'styled-components';

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
`;

const ExcerptLink = styled(Link)``;

const ExcerptImg = styled.div`
	--height: 7em;

	background-image: url(${props => props.image});
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
	let imageSource = false !== image ? image.source_url : null;

	return (
		<ExcerptListItem className={classNames(props.listItemClass)}>
			<ExcerptLink to={`/post/${post.slug}`}>
				<ExcerptImg image={imageSource} />
				<ExcerptTitleWrap>
					<ExcerptTitle>{he.decode(post.title.rendered)}</ExcerptTitle>
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