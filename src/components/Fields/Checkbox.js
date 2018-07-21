import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FieldContainer = styled.li`
	display: flex;
	margin: 0;
	padding: 0;

	@media screen and (max-width: 559px) {
		flex-direction: column;
	}
`;

const FieldLabel = styled.div`
	line-height: 1.5;
	order: 1;
	padding-right: 0.5em;
	width: 10em;

	&:after {
		content: ":";
	}
`;

const Label = styled.label`
	line-height: 1.5;
	order: 2;
`;

const Field = styled.input`
	flex: none;
	margin-right: 1em;
	order: 1;
	width: auto;
`;

const Description = styled.span``;

const Checkbox = props => {
	return (
		<FieldContainer>
			<FieldLabel>{props.labelText}</FieldLabel>
			<Label for={props.name}>
				<Field
					autofocus={props.autofocus}
					checked={props.checked}
					disabled={props.disabled}
					id={props.id}
					name={props.name}
					required={props.required}
					type="checkbox"
				/>
				<Description>{props.description}</Description>
			</Label>
		</FieldContainer>
	);
};

Checkbox.propTypes = {
	autofocus: PropTypes.bool,
	description: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	id: PropTypes.string,
	labelText: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	required: PropTypes.bool,
	value: PropTypes.string,
};

export default Checkbox;