import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HomeExcerpt from './HomeExcerpt';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

import { getColorClass } from '../../functions';

const HomePosts = styled.ul`
	--display: grid;

	background-color: var(--color-lt-gray);
	display: var(--display);
	flex-wrap: wrap;
	grid-template-columns: repeat(auto-fit, minmax(40ch, 1fr));
	list-style: none;
	margin: 0;
	padding: 0;

	@media screen and (min-width: 1280px) {
		--display: flex;
	}
`;

// Posts on HomeArchive should have min-width, but
// only fill up to 3-across. ???

const HomeArchive = props => {

	let showPosts = props.posts.slice(props.start, props.quantity);

	return (
		<HomePosts>
			{
				showPosts.map((post, i) => {
					return (
						<ErrorBoundry key={i}>
							<HomeExcerpt post={post} listItemClass={[getColorClass(i)]} />
						</ErrorBoundry>
					)	
				})
			}
		</HomePosts>
	);
};

HomeArchive.propTypes = {
	posts: PropTypes.array,
	start: PropTypes.number,
	quantity: PropTypes.number
};

export default HomeArchive;