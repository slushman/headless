import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flexcerpt from '../Flexcerpt/Flexcerpt';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

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
							<Flexcerpt post={post} display={['date','content', 'cats']} location="home" index={i} cats={props.cats} />
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