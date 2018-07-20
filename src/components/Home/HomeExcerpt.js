import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment-js';
import he from 'he';
import classNames from 'classnames';
import styled from 'styled-components';

const HomeExcerptListItem = styled.li`
	flex: 33%;
	hyphens: auto;
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-all;
	word-break: break-word;
`;

const HomeExcerptTitleContent = styled.div`
	--pad: 1em;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	margin: 0 auto;
	max-width: 60ch;
	padding: var(--pad);

	@media screen and (min-width: 700px) {
		--pad: 2em;
	}
`;

const HomeExcerptTitle = styled.h2``;

const HomeExcerptDate = styled.small``;

const ContentExcerptHome = styled.div``;

const HomeExcerpt = props => {
	//console.log(post)

	let post = props.post;

	return (
		<HomeExcerptListItem className={classNames(props.listItemClass)}>
			<HomeExcerptTitleContent>
				<HomeExcerptTitle>
					<Link to={`/post/${post.slug}`}>{he.decode(post.title.rendered)}</Link>
				</HomeExcerptTitle>
				<HomeExcerptDate>Published {moment(post.date).format("YYYY.MM.DD")}</HomeExcerptDate>
				<ContentExcerptHome dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
			</HomeExcerptTitleContent>
		</HomeExcerptListItem>
	);
};

HomeExcerpt.propTypes = {
	post: PropTypes.object
};

export default HomeExcerpt;