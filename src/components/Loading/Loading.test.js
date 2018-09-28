import React from 'react';
import renderer from 'react-test-renderer';

import Loading from './Loading';

const isLoading = true;

it( 'renders without crashing', () => {

	// Renders without crashing
	const component = renderer.create(
		<Loading />
	);
	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	// isLoading is false - should return null
	// tree.isLoading = false;
	// tree = component.toJSON();
	// expert( tree ).toMatchSnapshot();


	// error has content - should display error text.

} );
