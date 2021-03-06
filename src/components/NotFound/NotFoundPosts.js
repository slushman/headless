import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flexcerpt from '../Flexcerpt/Flexcerpt';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

const HomePosts = styled.ul`
	--display: grid;

	background-color: var(--color-lt-gray );
	display: var(--display );
	flex-wrap: wrap;
	grid-template-columns: repeat( auto-fit, minmax( 40ch, 1fr ) );
	list-style: none;
	margin: 0;
	padding: 0;

	@media screen and ( min-width: 1280px) {
		--display: flex;
	}
`;

// Posts on HomeArchive should have min-width, but
// only fill up to 3-across. ???

const NotFoundPosts = ( { posts } ) => {
	return (
		<HomePosts>
			{
				posts.map( ( post, i ) => {
					return (
						<ErrorBoundry key={ i }>
							<Flexcerpt post={ post } display={ [ 'date', 'content' ] } location="home" index={ i } />
						</ErrorBoundry>
					)
				} )
			}
		</HomePosts>
	);
};

NotFoundPosts.propTypes = {
	posts: PropTypes.array,
};

export default NotFoundPosts;
