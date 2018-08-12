import React, { Component } from 'react';

import { cachedFetch } from '../../functions';

import Post from '../../components/Post/Post';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';

class PostContainer extends Component {
	state = {
		post: {},
		error: null,
		beforePost: {},
		afterPost: {}
	}

	componentDidMount() {
		cachedFetch(`${process.env.REACT_APP_API}/wp/v2/posts?_embed&per_page=100`, 24 * 60 * 60)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					this.setState({
						error: 'Something went wrong...'
					})
				}
			})
			.then(posts => {
				//console.log(posts);
				//console.log(this.props)

				// Returns an array
				let post = posts.filter((post) => {
					return post.slug === this.props.match.params.slug;
				})
				let beforePost = this.getBeforePost(posts,post);
				let afterPost = this.getAfterPost(posts, post);
				let error = 1 !== post.length ? 'NotFound' : null;

				this.setState({
					post,
					beforePost,
					afterPost,
					error
				})
			})
			.catch(error => this.setState({
				error
			}));
	}

	getBeforePost = (posts, post) => {
		let currentIndex = this.findIndex(posts, post[0].id);
		if ( 0 === currentIndex ) { return null; }
		return posts[currentIndex - 1];
	}

	getAfterPost = (posts, post) => {
		let currentIndex = this.findIndex(posts, post[0].id);
		if (posts.length - 1 === currentIndex) { return null; }
		return posts[currentIndex + 1];
	}

	findIndex = (haystack,needle) => {
		for ( let i = 0; i < haystack.length; i++ ) {
			if ( needle === haystack[i].id ) {
				return i;
			}
		}
	}

	render() {
		console.log(this.state)
		if (1 !== this.state.post.length && 'NotFound' !== this.state.error) {
			return <Loading />; 
		}
		if ('NotFound' === this.state.error) {
			return <NotFound />;
		}
		return (
			<Post post={this.state.post[0]} pathname={this.props.location.pathname} beforePost={this.state.beforePost} afterPost={this.state.afterPost} />
		);
	}
}

export default PostContainer;