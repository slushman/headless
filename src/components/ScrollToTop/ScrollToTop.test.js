import React from 'react';
import renderer from 'react-test-renderer';

import ScrollToTop from './ScrollToTop';

it( 'renders without crashing', () => {
	const component = renderer.create(
		<ScrollToTop />
	);
	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
