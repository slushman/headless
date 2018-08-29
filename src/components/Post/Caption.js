import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconCamera from '../SVGS/Camera';

const CreditLink = styled.a`
	bottom: 1em;
	color: var(--color-light);
	display: flex;
	padding: 0.25em;
	position: absolute;
	right: 1em;
	text-decoration: none;
`;

const Credit = styled.span`
	color: var(--color-light);
	font-size: 0.625em;
	margin-left: 0.5em;
`;

const Caption = ({credits}) => {
	//console.log(credits)
	return (
			<CreditLink href={credits.credit_url}>
				<IconCamera width="16" height="16" fillColor="#fff" />
				<Credit>by {credits.credit}</Credit>
			</CreditLink>
	);
};

Caption.propTypes = {
	credits: PropTypes.object
};

export default Caption;