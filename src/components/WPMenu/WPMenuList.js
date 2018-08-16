import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WPMenuItem from './WPMenuItem';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

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
 * @param 		int 		parentId 		The parent menu item ID
 * @param 		int 		depth 			The menu item depth level.
 */
const WPMenuList = ({ menuLinks, parentId = 0, depthLevel = 0, ...rest }) => {

	//console.log(rest)

	const linksAtThisDepth = menuLinks.filter(link => {
		return parseInt(link.parent, 10) === parseInt(parentId, 10);
	})

	return (		
		<MenuList>
			{
				linksAtThisDepth.map((item, key) => (
					<ErrorBoundry key={key}>
						<WPMenuItem key={key} item={item} menuLinks={menuLinks} depthLevel={depthLevel} {...rest} />
					</ErrorBoundry>
				))
			}
		</MenuList>
	);
}

WPMenuList.propTypes = {
	menuLinks: PropTypes.array,
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