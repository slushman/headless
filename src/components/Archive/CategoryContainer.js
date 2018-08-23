import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { cachedFetch } from '../../functions';

import Archive from './Archive';
import Loading from '../Loading/Loading';

/**
 * Wrapper for category archive pages.
 */
class CategoryContainer extends Component {

	state = {
		posts: [],
		showPosts: [],
		error: null,
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
				this.setState({ posts })
				this.setShowPosts();
			})
			.catch(error => this.setState({
				error
			}));
	}

	setShowPosts = () => {
		let showPosts = this.state.posts.filter(post => {
			return post.categories.includes(this.props.cat.id); // how to select by category.
		});

		this.setState({ showPosts })
	}

	render() {
		//console.log(this.state)

		return (
			1 <= this.state.showPosts.length
				? <Archive
					ctaToBlog={true}
					loadMoreText="Go Back to Blog"
					onClick={this.loadMore}
					scrollTop={this.scrollToTop}
					showPosts={this.state.showPosts}
					title={this.props.cat.name + ' Posts'}
				/>
				: <Loading />
		);
	}
}

CategoryContainer.PropTypes = {
	cat: PropTypes.object
}

export default CategoryContainer;