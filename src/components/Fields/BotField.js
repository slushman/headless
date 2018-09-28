import React from 'react';
import styled from 'styled-components';

const FieldContainer = styled.li`
	display: none;
`;

const Label = styled.label`
	line-height: 1.5;
	order: 1;
	padding-right: 0.5em;
	width: 10em;

	&:after {
		content: ": ";
	}
`;

const Field = styled.input``;

const BotField = props => {
	return (
		<FieldContainer>
			<Label for="bot-field">Don’t fill this out if you're human</Label>
			<Field name="bot-field" />
		</FieldContainer>
	);
};

export default BotField;
