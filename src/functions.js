
/**
 * Returns the JSON response from the passed in URL and options.
 * 
 * Looks first at cache, if it exists.
 * If it doesn't exist, it returns the result of the promise from 
 * the fetch.
 * 
 * @param 		string 		url 		The URL to fetch
 * @param 		string 		options 	The length of time to cache
 * 											the request ( in seconds )
 * @return 		json 					The JSON response.
 */
export function cachedFetch(url, options ) {

	let expiry = 5 * 60 // 5 min default

	if ( typeof options === 'number' ) {
		expiry = options
		options = undefined
	} else if ( typeof options === 'object' ) {
		expiry = options.seconds || expiry
	}

	let cacheKey = url
	let cached = localStorage.getItem( cacheKey )
	let whenCached = localStorage.getItem( cacheKey + ':ts' )

	if ( cached !== null && whenCached !== null) {

		let age = (Date.now() - whenCached ) / 1000

		if ( age < expiry ) {
			let response = new Response(new Blob([cached ] ) )
			return Promise.resolve( response )
		} else {
			localStorage.removeItem( cacheKey )
			localStorage.removeItem( cacheKey + ':ts' )
		}

	}

	return fetch(url, options ).then( response => {

		if ( response.status === 200 ) {
			let ct = response.headers.get( 'Content-Type' )
			if ( ct && ( ct.match( /application\/json/i ) || ct.match( /text\//i ) )) {
				response.clone().text().then( content => {
					localStorage.setItem( cacheKey, content )
					localStorage.setItem( cacheKey + ':ts', Date.now() )
				} )
			}
		}
		return response

	} )

} // cachedFetch()

/**
 * Returns the appropriate image URL based on the sizes available.
 * 
 * @param {*} imageSizes 
 * @param {*} requestedSize 
 */
export function getImage( imageSizes, requestedSize ) {

	if ( 'small' === requestedSize ) {

		if ( imageSizes.medium && 0 !== imageSizes.medium.source_url.length ) {

			return imageSizes.medium.source_url;

		}

		if ( imageSizes.medium_large && 0 !== imageSizes.medium_large.source_url.length ) {

			return imageSizes.medium_large.source_url;

		}

		if ( imageSizes.large && 0 !== imageSizes.large.source_url.length ) {

			return imageSizes.large.source_url;

		}

		return imageSizes.full.source_url;

	}

	if ( 'med' === requestedSize ) {

		if ( imageSizes.medium_large && 0 !== imageSizes.medium_large.source_url.length ) {

			return imageSizes.medium_large.source_url;

		}

		if ( imageSizes.large && 0 !== imageSizes.large.source_url.length ) {

			return imageSizes.large.source_url;

		}

		return imageSizes.full.source_url;

	}

	if ( 'large' === requestedSize ) {

		if ( imageSizes.large && 0 !== imageSizes.large.source_url.length ) {

			return imageSizes.large.source_url;

		}

		return imageSizes.full.source_url;

	}

} // getImage()

/**
 * Capitalizes the first letter of each word.
 * 
 * @param 		string 		strToCaps 		The string to capitalize.
 * @return 		string 						The capitalized string.
 */
export function toTitleCase( strToCaps ) {

	return strToCaps.replace( /\w\S*/g, function ( txt ) {
	
		return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase();
	
	} );

} // toTitleCase()