import React from 'react';
import PropTypes from 'prop-types';

const Google = props => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={ props.width } height={ props.height } viewBox="0 0 20 20" aria-labelledby="title">
			<title id="title">Google plus icon</title>
			<path fill={ props.fillColor } d="M2.8 4.9c2.3-1.7 5.7-1.5 7.8.5-.6.5-1.1 1.1-1.7 1.6-1.6-1.4-4.2-1.2-5.5.4-1.6 1.8-1.1 4.9 1 6.1 2 1.2 5 .2 5.5-2.2H6.3V9.1h6c.2 1.8-.2 3.8-1.4 5.2-1.5 1.8-4.2 2.4-6.4 1.7-2.1-.6-3.9-2.5-4.3-4.7-.5-2.4.5-5 2.6-6.4zM16.3 7.3h1.8v1.8h1.8v1.8h-1.8v1.8h-1.8v-1.8h-1.8V9.1h1.8V7.3z" />
		</svg>
	);
};

Google.propTypes = {
	fillColor: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
};

Google.defaultProps = {
	fillColor: '',
	width: 20,
	height: 20,
}

export default Google;
