
/**
 * Returns the JSON response from the passed in URL and options.
 * 
 * Looks first at cache, if it exists.
 * If it doesn't exist, it returns the result of the promise from 
 * the fetch.
 * 
 * @param 		string 		url 		The URL to fetch
 * @param 		string 		options 	The length of time to cache
 * 											the request (in seconds)
 * @return 		json 					The JSON response.
 */
export function cachedFetch(url, options) {

	let expiry = 5 * 60 // 5 min default

	if (typeof options === 'number') {
		expiry = options
		options = undefined
	} else if (typeof options === 'object') {
		expiry = options.seconds || expiry
	}

	let cacheKey = url
	let cached = localStorage.getItem(cacheKey)
	let whenCached = localStorage.getItem(cacheKey + ':ts')

	if (cached !== null && whenCached !== null) {

		let age = (Date.now() - whenCached) / 1000

		if (age < expiry) {
			let response = new Response(new Blob([cached]))
			return Promise.resolve(response)
		} else {
			localStorage.removeItem(cacheKey)
			localStorage.removeItem(cacheKey + ':ts')
		}

	}

	return fetch(url, options).then(response => {

		if (response.status === 200) {
			let ct = response.headers.get('Content-Type')
			if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
				response.clone().text().then(content => {
					localStorage.setItem(cacheKey, content)
					localStorage.setItem(cacheKey + ':ts', Date.now())
				})
			}
		}
		return response

	})

} // cachedFetch()

/**
 * Returns one of the color classes.
 * 
 * Uses modulo to get a number within the array length from the increment passed in.
 * 
 * @param 		int 		increment 		The increment number from map.
 * @return 		string 						The color class.
 */
export function getColorClass(increment) {
	
	let excerptColors = ['white-on-blue', 'charcoal-on-med-gray', 'dark-gray-on-white', 'lt-gray-on-dark', 'blue-on-white', 'white-on-dark-gray'];
	let counter = increment % excerptColors.length;

	//console.log({counter:counter,increment: increment});
	return excerptColors[counter];

} // getColorClass()