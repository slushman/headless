import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment-js';
import he from 'he';
import classNames from 'classnames';
import styled from 'styled-components';
import { getImage } from '../../functions';

const colorCount = 6;

const ExcerptListItem = styled.li`
	--bgcolor: ${props => {
		let counter = props.index % colorCount;
		if (5 === counter) {
			return 'var(--color-dark-gray)';
		} else if (4 === counter) {
			return 'var(--color-light)';
		} else if (3 === counter) {
			return 'var(--color-dark)';
		} else if (2 === counter) {
			return 'var(--color-light)';
		} else if (1 === counter) {
			return 'var(--color-med-gray)';
		} else if (0 === counter) {
			return 'var(--color-blue)';
		} else {
			return 'var(--color-lt-gray)';
		}
	}};
	--color: ${props => {
		let counter = props.index % colorCount;
		if (5 === counter) {
			return 'var(--color-light)';
		} else if (4 === counter) {
			return 'var(--color-blue)';
		} else if (3 === counter) {
			return 'var(--color-lt-gray)';
		} else if (2 === counter) {
			return 'var(--color-dark-gray)';
		} else if (1 === counter) {
			return 'var(--color-charcoal)';
		} else if (0 === counter) {
			return 'var(--color-light)';
		} else {
			return 'var(--color-dark)';
		}
	}};
	
	
	
	background-color: var(--bgcolor);
	color: var(--color);
	flex: ${props => 'home' === props.location ? '33%' : ''};
	hyphens: auto;
	overflow-wrap: break-word;
	transition: 0.4s ease;
	word-wrap: break-word;
	word-break: break-all;
	word-break: break-word;

	&:hover,
	&:focus-within {
		--bgcolor: ${props => {
			let counter = props.index % colorCount;
			if (5 === counter) {
				return 'var(--color-light)';
			} else if (4 === counter) {
				return 'var(--color-blue)';
			} else if (3 === counter) {
				return 'var(--color-lt-gray)';
			} else if (2 === counter) {
				return 'var(--color-dark-gray)';
			} else if (1 === counter) {
				return 'var(--color-charcoal)';
			} else if (0 === counter) {
				return 'var(--color-light)';
			} else {
				return 'var(--color-lt-blue)';
			}
		}};
		--color: ${props => {
			let counter = props.index % colorCount;
			if (5 === counter) {
				return 'var(--color-dark-gray)';
			} else if (4 === counter) {
				return 'var(--color-light)';
			} else if (3 === counter) {
				return 'var(--color-dark)';
			} else if (2 === counter) {
				return 'var(--color-light)';
			} else if (1 === counter) {
				return 'var(--color-med-gray)';
			} else if (0 === counter) {
				return 'var(--color-blue)';
			} else {
				return 'var(--color-dark)';
			}
		}};
		--filter: grayscale(1);
	}

	& a {
		--color: ${props => {
			let counter = props.index % colorCount;
			if (5 === counter) {
				return 'var(--color-light)';
			} else if (4 === counter) {
				return 'var(--color-blue)';
			} else if (3 === counter) {
				return 'var(--color-lt-gray)';
			} else if (2 === counter) {
				return 'var(--color-dark-gray)';
			} else if (1 === counter) {
				return 'var(--color-charcoal)';
			} else if (0 === counter) {
				return 'var(--color-light)';
			} else {
				return 'var(--color-blue)';
			}
		}};

		background-color: var(--bgcolor);
		color: var(--color);
		transition: 0.4s ease;
	}

	&:hover a,
	&:focus-within a:focus {
		--color: ${props => {
			let counter = props.index % colorCount;
			if (5 === counter) {
				return 'var(--color-dark-gray)';
			} else if (4 === counter) {
				return 'var(--color-light)';
			} else if (3 === counter) {
				return 'var(--color-dark)';
			} else if (2 === counter) {
				return 'var(--color-light)';
			} else if (1 === counter) {
				return 'var(--color-med-gray)';
			} else if (0 === counter) {
				return 'var(--color-blue)';
			} else {
				return 'var(--color-dark)';
			}
		}};
	}

	&:focus-within a:focus {
		outline: none;
		text-decoration: none;
	}
`;

const ExcerptWrap = styled.div`
	--pad: 1em;

	display: flex;
	flex-direction: column;
	flex-grow: 1;
	margin: 0 auto;
	max-width: 60ch;
	padding: var(--pad);
	z-index: 1;
`;

//calc(100vw/2 - 42rem/2)

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

const ExcerptTitle = styled.h2``;

const ExcerptDate = styled.small`
	margin-top: auto;
	margin-bottom: 0;
	text-decoration: none;
`;

const ExcerptContent = styled.div``;

const Flexcerpt = props => {
	//console.log(post)

	let post = props.post;
	let image = post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0] : false;
	let imageSource = image.media_details ? getImage(image.media_details.sizes, 'small') : null;
	let excerptTitle = he.decode(post.title.rendered);
	let excerptContent = post.yoast && 0 !== post.yoast.metadesc.length ? post.yoast.metadesc : he.decode(post.excerpt.rendered);

	return (
		<ExcerptListItem className={classNames(props.listItemClass)} location={props.location} index={props.index}>
			{
				true === props.display.includes('image') ?
					<ExcerptLink to={`/post/${post.slug}`}>
						<ExcerptImg image={imageSource} />
					</ExcerptLink>
					: null
			}	
			<ExcerptWrap>
				<ExcerptTitle>
					<ExcerptLink to={`/post/${post.slug}`}>{excerptTitle}</ExcerptLink>
				</ExcerptTitle>
				{
					true === props.display.includes('date')
						? <ExcerptDate>Published {moment(post.date).format("YYYY.MM.DD")}</ExcerptDate>
						: null
				}
				{
					true === props.display.includes('content')
						? <ExcerptContent dangerouslySetInnerHTML={{ __html: excerptContent }} />
						: null
				}
			</ExcerptWrap>
		</ExcerptListItem>
	);
};

Flexcerpt.propTypes = {
	post: PropTypes.object,
	listItemClass: PropTypes.array,
	display: PropTypes.array, // Options: image, date, content. The Title is always published.
	index: PropTypes.number
};

export default Flexcerpt;