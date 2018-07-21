import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Notes:
 * 
 * Inexplicably, "readonly" doesn't work.
 */

const FieldContainer = styled.li`
	display: flex;
	margin: 0;
	padding: 0;

	@media screen and (max-width: 559px) {
		flex-direction: column;
	}
`;

const Label = styled.label`
	line-height: 1.5;
	order: 1;
	padding-right: 0.5em;
	width: 10em;

	&:after {
		content: ":";
	}
`;

const FieldWrap = styled.span`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	order: 2;
`;

const Field = styled.input`
	--bgcolor: #fff;
	--borderColor: var(--color-dark-gray);
	--borderWidth: 1px;
	--color: currentColor;

	background-color: var(--bgcolor);
	border-color: var(--borderColor);
	border-width: var(--borderWidth);
	border-style: solid;
	color: var(--color);
	font-size: 1.25em;
	line-height: 1.5;
	padding: 0.25em;
	transition: 0.4s ease;

	&:disabled {
		--bgcolor: var(--color-light);
		--borderColor: var(--color-med-gray);
		--color: var(--color-med-gray);
	}

	&:read-only {
		--borderColor: var(--color-lt-gray); 
		--color: var(--color-dark-gray);

		cursor: not-allowed;
	}
`;

const Description = styled.small``;

const Required = styled.small`
	color: var(--color-dark-gray);
`;

const Input = props => {
	//console.log(props)
	return (
		<FieldContainer>
			<Label for={props.name}>{props.labelText}</Label>
			<FieldWrap>
				<Field 
					autocomplete={props.autocomplete}
					autofocus={props.autofocus}
					disabled={props.disabled}
					id={props.id}
					max={props.max}
					maxlength={props.maxlength}
					min={props.min}
					name={props.name}
					onChange={props.onChange}
					readonly={props.readonly} 
					required={props.required} 
					size={props.size} 
					step={props.step} 
					type={props.type}
					value={props.value}
					width={props.width}
				/>
				<Description>{props.description} <Required>{props.required ? null : '(Optional)'}</Required></Description>
			</FieldWrap>
		</FieldContainer>
	);
};

Input.propTypes = {
	autocomplete: PropTypes.bool,
	autofocus: PropTypes.bool,
	description: PropTypes.string,
	disabled: PropTypes.bool,
	id: PropTypes.string,
	labelText: PropTypes.string,
	max: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	maxlength: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	min: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	name: PropTypes.string.isRequired,
	readonly: PropTypes.bool,
	required: PropTypes.bool,
	size: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	step: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	type: PropTypes.oneOf([
		'email',
		'hidden',
		'number',
		'password',
		'tel',
		'text',
		'url',
	]),
	value: PropTypes.string,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

Input.defaultProps = {
	required: true,
	type: 'text'
}

export default Input;