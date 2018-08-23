import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { cachedFetch } from '../../functions';

import Post from '../../components/Post/Post';
import Loading from '../../components/Loading/Loading';

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
				let beforePost = 1 === post.length ? this.getBeforePost(posts,post) : null;
				let afterPost = 1 === post.length ? this.getAfterPost(posts, post) : null;
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
		//console.log(this.state)
		//console.log(this.props)
		if (1 !== this.state.post.length && 'NotFound' === this.state.error) {
			return <Redirect to="/404" />;
		}
		return (
			1 <= this.state.post.length
				? <Post post={this.state.post[0]} beforePost={this.state.beforePost} afterPost={this.state.afterPost} {...this.props} />
				: <Loading />
		);
	}
}

export default PostContainer;