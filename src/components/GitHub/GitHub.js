import React, { Component } from 'react';

import { cachedFetch } from '../../functions';

import Repos from './Repos';
import Loading from '../../components/Loading/Loading';

class GitHub extends Component {
	state = {
		repos: [],
		showRepos: [],
	}
	componentDidMount() {
		cachedFetch( 'https://api.github.com/users/slushman/repos', 24 * 60 * 60 )
			.then( response => {
				if ( response.ok ) {
					return response.json();
				} else {
					this.setState( {
						error: 'Something went wrong...'
					} )
				}
			} )
			.then( repos => {
				//console.log( repos );
				let starred = repos.filter( repo => {
					return 0 < repo.stargazers_count;
				} )
				// Returns an array
				let showRepos = starred.sort( ( a,b ) => {
					return Number( b.stargazers_count ) - Number( a.stargazers_count );
				} )
				this.setState( {
					repos,
					showRepos,
				} )
			} )
			.catch( error => this.setState( {
				error
			} ) );
	}

	render() {
		return (
			1 <= this.state.showRepos.length
				? <Repos repos={ this.state.showRepos } />
				: <Loading />
		);
	}
}

export default GitHub;
