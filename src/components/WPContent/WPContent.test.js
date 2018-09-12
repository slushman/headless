import React from 'react';
import renderer from 'react-test-renderer';

import WPContent from './WPContent';

const content = {
	rendered: "Testing simulated content from WordPress."
};

it('renders without crashing', () => {
	const component = renderer.create(
		<WPContent content={content} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
