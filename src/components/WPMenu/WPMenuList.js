import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WPMenuItem from './WPMenuItem';

const MenuList = styled.ul`
	display: flex;
	justify-content: center;
	list-style: none;
	margin: 0;
	padding: 0;
`;

/**
 * WPMenuList component. Displays an unordered list of navigation links.
 * 
 * @param 		array 		menuLinks 		Array of menu item objects.
 * @param 		string 		location 		The theme location
 * @param 		int 		parentId 		The parent menu item ID
 * @param 		int 		depth 			The menu item depth level.
 */
const WPMenuList = ({ menuLinks, location, parentId = 0, depthLevel = 0, ...rest }) => {

	//console.log(rest)

	const linksAtThisDepth = menuLinks.filter(link => {
		return parseInt(link.parent, 10) === parseInt(parentId, 10);
	})

	return (
		
		<MenuList location={location} depth={depthLevel}>
			{
				linksAtThisDepth.map((item, key) => (
					<WPMenuItem key={key} item={item} location={location} menuLinks={menuLinks} depthLevel={depthLevel} {...rest} />
				))
			}
		</MenuList>
	);
}

WPMenuList.propTypes = {
	menuLinks: PropTypes.array,
	location: PropTypes.string,
	parentId: PropTypes.number,
	depthLevel: PropTypes.number
}

WPMenuList.defaultProps = {
	menuLinks: [],
	location: '',
	parentId: 0,
	depthLevel: 0
}

export default WPMenuList;