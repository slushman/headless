import React from 'react';
import PropTypes from 'prop-types';

const Tumblr = props => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={ props.width } height={ props.height } viewBox="0 0 20 20" aria-labelledby="title">
			<title id="title">Tumblr icon</title>
			<path fill={ props.fillColor } d="M15.7 18.7c-.4.5-2 1.1-3.4 1.2-4.3.1-5.9-3.1-5.9-5.3V8.1h-2V5.6c3-1.1 3.7-3.8 3.9-5.3 0-.1.1-.1.1-.1h2.9v5h4v3h-4v6.1c0 .8.3 2 1.9 1.9.5 0 1.2-.2 1.6-.3l.9 2.8z" />
		</svg>
	);
};

Tumblr.propTypes = {
	fillColor: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
};

Tumblr.defaultProps = {
	fillColor: '',
	width: 20,
	height: 20,
}

export default Tumblr;
