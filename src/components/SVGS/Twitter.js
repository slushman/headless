import React from 'react';
import PropTypes from 'prop-types';

const Twitter = props => {
	return (
		<svg xmlns="https://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 20 20" aria-labelledby="title">
			<title id="title">Twitter icon</title>
			<path fill={props.fillColor} d="M18.94 4.46c-.49.73-1.11 1.38-1.83 1.9.01.15.01.31.01.47 0 4.85-3.69 10.44-10.43 10.44-2.07 0-4-.61-5.63-1.65.29.03.58.05.88.05 1.72 0 3.3-.59 4.55-1.57a3.671 3.671 0 0 1-3.42-2.55c.22.04.45.07.69.07.33 0 .66-.05.96-.13a3.68 3.68 0 0 1-2.94-3.6v-.04c.5.27 1.06.44 1.66.46a3.68 3.68 0 0 1-1.63-3.06c0-.67.18-1.3.5-1.84 1.81 2.22 4.51 3.68 7.56 3.83-.06-.27-.1-.55-.1-.84a3.67 3.67 0 0 1 3.67-3.66c1.06 0 2.01.44 2.68 1.16.83-.17 1.62-.47 2.33-.89-.28.85-.86 1.57-1.62 2.02a7.08 7.08 0 0 0 2.11-.57z" />
		</svg>
	);
};

Twitter.propTypes = {
	fillColor: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string
};

Twitter.defaultProps = {
	fillColor: '',
	width: 20,
	height: 20
}

export default Twitter;