import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WPMenuList from './WPMenuList';
import WPMenuLink from './WPMenuLink';

const MenuItem = styled.li`
	flex: 1;
	margin-bottom: 0;
	margin-left: ${props => 'social' === props.location ? '1em' : ''};
	margin-right: ${props => 'social' === props.location ? '1em' : ''};
	margin-top: 0;
	position: relative;
	text-align: center;

	& ul { /* All submenus */
		--opacity: 0;
	}

	&:hover ul { /* All submenus */
		--opacity: 1;
	}
`;

const WPMenuItem = props => {

	//console.log(props)

	const subMenuLinks = props.menuLinks.filter(link => {
		return parseInt(link.parent, 10) === parseInt(props.item.id, 10);
	})

	return (
		<MenuItem location={props.menu.slug} className={props.item.classes.string}>
			<WPMenuLink link={props.item} menu={props.menu.slug} linkClass={props.linkClass} itemClasses={props.item.classes.array} page={props.page} />
			{1 <= subMenuLinks.length 
				? <WPMenuList 
					menuLinks={props.menuLinks} 
					location={props.menu.slug} 
					parentId={parseInt(props.item.id, 10)} 
					depthLevel={props.depthLevel + 1} 
					{...props} /> 
				: null
			}
		</MenuItem>
	);
}

WPMenuItem.propTypes = {
	item: PropTypes.object,
	menuLinks: PropTypes.array,
	depthLevel: PropTypes.number
}

export default WPMenuItem;

	//if (item.classes.includes('slushicons')) {

		// const svgIcon = item.classes.filter(classname => {
		// 	return classname.includes('svg-')
		// })

		// recrate the Slushicons structure here. Allow for
		// icon - text, text - icon, icon only, text only.

		//const iconName = svgIcon ? svgIcon.toString().substr(4) : null;
		//const properName = iconName.charAt(0).toUpperCase() + iconName.substr(1);

		/**
		 * Figure out how to pass the name of a component here.
		 */
		//itemTitle = Icon(properName);

	//}
