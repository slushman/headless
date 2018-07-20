import React, { Component } from 'react';

import { cachedFetch } from '../../functions';

import Archive from '../../components/Archive/Archive';
import Loading from '../Loading/Loading';

/**
 * Wrapper for category archive pages.
 * 
 * Checks the current browser width and sets the quantity in state accordingly.
 * Fetches all the posts from WP.
 * Listens to the window for resizing.
 * 
 * As the window is resized, quantity is updated.
 */
class CategoryContainer extends Component {

	state = {
		posts: {},
		error: null,
		quantity: 6,
		start: 0,
	}

	componentDidMount() {
		this.updateQuantity();

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
			})
			.catch(error => this.setState({
				error
			}));

		window.addEventListener('resize', this.updateQuantity);
	}

	updateQuantity = () => {
		let width = window.innerWidth;
		let quantity = this.state.quantity;

		if (1042 >= width) {
			quantity = 6;
		} else if (1043 <= width && 1382 >= width) {
			quantity = 9;
		} else if (1383 <= width && 1723 >= width) {
			quantity = 12;
		} else if (1724 <= width) {
			quantity = 15;
		}
		this.setState({
			quantity
		})
	}

	render() {
		//console.log(this.state)

		return (
			1 <= this.state.posts.length
				? <Archive title="Blog" {...this.state} />
				: <Loading />
		);
	}
}

export default CategoryContainer;