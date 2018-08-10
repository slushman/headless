import React, { Component } from 'react';
import { cachedFetch } from '../../functions';

import Home from './Home';
import Loading from '../Loading/Loading';

class HomeContainer extends Component {

	state = {
		posts: [],
		error: null,
		latest: [],
		showPosts: [],
		catID: null,
	}

	componentDidMount() {

		cachedFetch(`${process.env.REACT_APP_API}/wp/v2/categories?per_page=100`, 24 * 60 * 60)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					this.setState({
						error: 'Something went wrong...'
					})
				}
			})
			.then(cats => {
				let homeFeatureCategoryId = cats.filter(cat => {
					return cat.slug === 'home-feature';
				})
				this.setState({
					catID: homeFeatureCategoryId[0].id
				})
			})
			.catch(error => this.setState({
				error
			}));

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
				this.setState({
					posts
				})
				this.getLatest();
				this.getPosts();
			})
			.catch(error => this.setState({
				error
			}));

	} // componentDidMount()

	getLatest = () => {
		let latest = this.state.posts.slice(0, 1);
		this.setState({ latest: latest })
	}

	getPosts = () => {
		let featured = this.state.posts.filter(post => {
			return post.categories.includes(this.state.catID); // how to select by category.
		});

		let showPosts = featured.slice(0, 6);

		this.setState({ showPosts })
	}

	render() {
		console.log(this.state)
		return (
			1 <= this.state.posts.length
				? <Home
					latest={this.state.latest}
					posts={this.state.showPosts}
					{...this.props}
				/>
				: <Loading />
		);
	}
}

export default HomeContainer;