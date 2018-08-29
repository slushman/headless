import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icons from '../SVGS/Icons';

const Text = styled.span`
	border 		: ${props => 'text-hide' === props.textPos && '0'};
	clip 		: ${props => 'text-hide' === props.textPos && 'rect(1px, 1px, 1px, 1px)'};
	clip-path 	: ${props => 'text-hide' === props.textPos && 'inset(50%)'};
	height 		: ${props => 'text-hide' === props.textPos && '1px'};
	margin 		: ${props => 'text-hide' === props.textPos && '-1px'};
	overflow 	: ${props => 'text-hide' === props.textPos && 'hidden'};
	padding 	: ${props => 'text-hide' === props.textPos && '0'};
	position 	: ${props => 'text-hide' === props.textPos && 'absolute !important'};
	width 		: ${props => 'text-hide' === props.textPos && '1px'};
	word-wrap	: ${props => 'text-hide' === props.textPos && 'normal !important'};
`;

const Slushicon = props => {

	//console.log(props)

	let textPos = null;
	let Icon = null;

	if ( props.classes.includes('slushicon') ) {

		let iconClass = props.classes.filter(className => { return className.includes('icon-') } )[0];
		iconClass = iconClass.substr(5);
		const iconComponentName = iconClass.charAt(0).toUpperCase() + iconClass.substr(1);
		Icon = Icons[iconComponentName];
		textPos = props.classes.filter(className => { return className.includes('text-'); } )[0];

	}

	return (
		<Fragment>
			{
				'text-left' === textPos
					? <Icon height="44" width="44" />
					: null
			}
			<Text textPos={textPos}>{props.title}</Text>
			{
				'text-left' !== textPos && null !== textPos
					? <Icon height="44" width="44" />
					: null
			}
		</Fragment>
	);
};

Slushicon.propTypes = {
	title: PropTypes.string,
	classes: PropTypes.array
};

export default Slushicon;