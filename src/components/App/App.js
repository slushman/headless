import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Analytics from 'react-router-ga';

import { cachedFetch } from '../../functions';

import Loading from '../Loading/Loading';

const AsyncHome = Loadable( {
	loader: () => import( '../Home/HomeContainer' ),
	loading: Loading
} );
const AsyncArchive = Loadable( {
	loader: () => import( '../Archive/ArchiveContainer' ),
	loading: Loading
} );
const AsyncPost = Loadable( {
	loader: () => import( '../Post/PostContainer' ),
	loading: Loading
} );
const AsyncPage = Loadable( {
	loader: () => import( '../Page/Page' ),
	loading: Loading
} );
const AsyncNotFound = Loadable( {
	loader: () => import( '../NotFound/NotFound' ),
	loading: Loading
} );
const AsyncCategory = Loadable( {
	loader: () => import( '../Archive/CategoryContainer' ),
	loading: Loading
} );

class App extends Component {

	state = {
		pages: [],
		cats: []
	}

	componentDidMount() {
		cachedFetch( `${ process.env.REACT_APP_API }/wp/v2/pages?_embed&per_page=100`, 30 * 24 * 60 * 60 )
			.then( response => {
				if ( response.ok ) {
					return response.json();
				} else {
					this.setState( {
						error: 'Something went wrong...'
					} )
				}
			} )
			.then( pages => {
				this.setState( {
					pages
				} )
			} )
			.catch( error => this.setState( {
				error
			} ) );

		cachedFetch( `${ process.env.REACT_APP_API }/wp/v2/categories?per_page=100`, 24 * 60 * 60 )
			.then( response => {
				if ( response.ok ) {
					return response.json();
				} else {
					this.setState( {
						error: 'Something went wrong...'
					} )
				}
			} )
			.then( cats => {
				this.setState( { cats } )
			} )
			.catch( error => this.setState( { error } ) );
	}

	pageRoutes = () => {
		//console.log( this.state.pages )
		return this.state.pages.map( ( page,i ) => {
			//console.log( props )
			return (
				<Route
					exact
					key={ page.id }
					path={ `/${ page.slug }` }
					render={ () => (
						<AsyncPage page={ page } location={ this.props.location } />
					) }
				/>
			)
		} )
	}

	categoryRoutes = () => {
		//console.log( this.state.cats )
		return this.state.cats.map( ( cat, i ) => {
			//console.log( props )
			return (
				<Route
					exact
					key={ cat.id }
					path={ `/category/${ cat.slug }` }
					render={ () => (
						<AsyncCategory cat={ cat } />
					) }
				/>
			)
		} )
	}
	
	render() {
		// console.log( this.props )
		// console.log( this.state )
		return (
			1 <= this.state.pages.length && 1 <= this.state.cats.length ?
				<Analytics id="UA-27308708-1" debug>
					<Switch>
						<Route exact path="/" component={ AsyncHome } />
						<Route exact path="/blog" render={ () => (
							<AsyncArchive match={ this.props.match } />
						) } />
						{ this.pageRoutes() }
						{ this.categoryRoutes() }
						<Route path="/post/:slug" component={ AsyncPost } />
						<Route exact path="/404" component={ AsyncNotFound } />
						<Redirect from="/:slug" to="/post/:slug" />
						<Route component={ AsyncNotFound } />
					</Switch>
				</Analytics> :
				null
		);
	}
};

export default App;
