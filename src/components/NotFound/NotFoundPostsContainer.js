import React, { Component } from 'react';
import { cachedFetch } from '../../functions';

import NotFoundPosts from './NotFoundPosts';
import Loading from '../Loading/Loading';

class NotFoundPostsContainer extends Component {
	state = {
		posts: [],
		error: null,
		showPosts: [],
	}
	componentDidMount() {
		cachedFetch( `${ process.env.REACT_APP_API }/wp/v2/posts?_embed&per_page=100`, 24 * 60 * 60 )
			.then( response => {
				if ( response.ok ) {
					return response.json();
				} else {
					this.setState( {
						error: 'Something went wrong...'
					} )
				}
			} )
			.then( posts => {
				let showPosts = posts.slice( 0, 12);
				//console.log( showPosts )
				this.setState( {
					posts,
					showPosts
				} )
				
			} )
			.catch( error => this.setState( {
				error
			} ) );
	} // componentDidMount()
	render() {
		//console.log( this.state )
		return (
			1 <= this.state.showPosts.length
				? <NotFoundPosts
					posts={ this.state.showPosts }
					{ ...this.props }
				/>
				: <Loading />
		);
	}
}

export default NotFoundPostsContainer;
