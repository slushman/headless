import React, { Component } from 'react';

import { cachedFetch } from '../../functions';

import Post from '../../components/Post/Post';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';

class PostContainer extends Component {
	state = {
		post: {},
		error: null
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

				this.setState({
					post,
					error: 1 !== post.length ? 'NotFound' : null
				})
			})
			.catch(error => this.setState({
				error
			}));
	}

	render() {
		//console.log(this.state)
		if (1 !== this.state.post.length && 'NotFound' !== this.state.error) {
			return <Loading />; 
		}
		if ('NotFound' === this.state.error) {
			return <NotFound />;
		}
		return (
			<Post post={this.state.post[0]} />
		);
	}
}

export default PostContainer;