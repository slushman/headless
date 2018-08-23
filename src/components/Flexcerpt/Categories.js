import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

const CatsList = styled.ul`
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
	z-index: 1;

	> li + li:before {
		content: ", ";
		text-decoration: none;
	}
`;

const Cat = styled.li``;

const CatLink = styled(Link)`
	display: inline-block;
	font-size: 0.875em;
	margin-bottom: 0.5em;
	text-transform: uppercase;
`;

const Categories = ({cats}) => {

	//console.log(cats)

	let showCats = cats.filter(cat => {
		return 'Home Feature' !== cat.name;
	} )

	//console.log(showCats)

	return (
		<CatsList>
			{
				showCats.map((cat, i) => {
					return (
						<ErrorBoundry key={i}>
							<Cat>
								<CatLink to={`/category/${cat.slug}`}>{cat.name}</CatLink>
							</Cat>
						</ErrorBoundry>
					)
				})
			}
		</CatsList>
	);
};

Categories.propTypes = {
	cats: PropTypes.array
};

export default Categories;