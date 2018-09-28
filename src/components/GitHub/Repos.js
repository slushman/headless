import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { toTitleCase } from '../../functions';

import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

const RepoWrap = styled.div``;

const Heading2 = styled.h2``;

const RepoList = styled.ul``;

const RepoItem = styled.li``;

const RepoLink = styled.a`
	--link-color: var(--color-blue );

	color: var(--link-color );

	&:visited,
	&:active,
	&:hover {
		--link-color: var(--color-blue );
	}

	&:focus {
		outline-color: #E8671C;
	}
`;

const RepoStars = styled.span``;

const Repos = ( { repos } ) => {
	//console.log( repos )
	return (
		<RepoWrap>
			<Heading2>GitHub Repos</Heading2>
			<RepoList>
			{
				repos.map( ( repo, i ) => {
					let splitName = repo.name.replace( /-/g, ' ' );
					return (
						<ErrorBoundry key={ i }>
							<RepoItem>
								<RepoLink href={ repo.html_url }>{ toTitleCase( splitName ) }</RepoLink> <RepoStars>( { repo.stargazers_count } stars )</RepoStars>
							</RepoItem>
						</ErrorBoundry>
					)
				} )
			}
			</RepoList>
		</RepoWrap>
	);
};

Repos.propTypes = {
	repos: PropTypes.array,
};

export default Repos;
