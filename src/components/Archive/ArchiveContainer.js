import React, { Component } from 'react';

import { cachedFetch } from '../../functions';

import Archive from '../../components/Archive/Archive';
import Loading from '../Loading/Loading';

/**
 * Wrapper for all post archive pages.
 * 
 * Checks the current browser width and sets the quantity in state accordingly.
 * Fetches all the posts from WP.
 * Listens to the window for resizing.
 * 
 * As the window is resized, quantity is updated.
 */
class ArchiveContainer extends Component {

	state = {
		posts: {},
		error: null,
		quantity: 6,
		showPosts: [],
		start: 0,
		end: 6
	}
	
	componentDidMount() {
		this.setQuantity();

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
				this.slicePosts(this.state.start);
			})
			.catch(error => this.setState({
				error
			}));

		window.addEventListener('resize', this.updateQuantity);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateQuantity);
	}

	/**
	 * Sets showPosts in state with posts in the requested category.
	 * 
	 * @uses 		slicePosts()
	 */
	filterCats = (categoryId) => {
		// reset state for start, end, and showPosts

		// filter all the posts by categoryId
		let catPosts = this.state.posts.filter( post => {
			return post.categories.includes(categoryId);
		} );

		this.setState({
			showPosts: catPosts
		})

		// slice the results by quantity
		this.slicePosts( this.state.start )
	} // filterCats()

	/**
	 * Runs when the "See More Articles" button is clicked.
	 * 
	 * Runs updateSlice with the end + 1 as the starting place.
	 * 
	 * @uses 		slicePosts()
	 */
	loadMore = () => {
		this.slicePosts(this.state.end+1,true);
	}

	/**
	 * Slices the array of posts from fetch.
	 * Updates showPosts and end in state.
	 * 
	 * @param {int} start - The array starting position to slice from.
	 * @param {bool} update - Whether to update showPosts (use true) or replace showPosts (false - default).
	 */
	slicePosts = (start,update) => {
		let startItem = start ? start : this.state.start;
		let end = startItem + this.state.quantity;
		let sliced = this.state.posts.slice(startItem, end);
		let showPosts = update ? [...this.state.showPosts, ...sliced] : sliced;

		this.setState({
			showPosts,
			end
		})
	}

	/**
	 * Sets quantity in state based on the width of the browser window.
	 * 
	 * @return {int} newQuantity - the calculated quantity.
	 */
	setQuantity = () => {
		let width = window.innerWidth;
		let newQuantity = this.state.quantity;

		if (1014 >= width) {
			newQuantity = 6;
		} else if (1015 <= width && 1346 >= width) {
			newQuantity = 9;
		} else if (1347 <= width && 1682 >= width) {
			newQuantity = 12;
		} else if (1683 <= width) {
			newQuantity = 15;
		}

		if ( newQuantity !== this.state.quantity ) {
			this.setState({
				quantity: newQuantity
			})
		}
		return newQuantity;
	}

	/**
	 * Updates quantity in state and re-slices posts if needed.
	 * 
	 * @uses 	setQuantity()
	 */
	updateQuantity = () => {
		let nowQuantity = this.state.quantity;
		let quantityCheck = this.setQuantity();

		if (quantityCheck !== nowQuantity ) {
			this.slicePosts( this.state.start );
		}
	}

	render() {
		//console.log(this.state)

		return (
			1 <= this.state.posts.length
				? <Archive 
					title="Blog" 
					showPosts={this.state.showPosts} 
					onClick={this.loadMore}
					scrollTop={this.scrollToTop}
				/>
				: <Loading />
		);
	}
}

export default ArchiveContainer;