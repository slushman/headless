import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FieldContainer = styled.li`
	display: flex;
	margin: 0;
	padding: 0;

	@media screen and ( max-width: 559px) {
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

const Field = styled.textarea`
	--bgcolor: #fff;
	--borderColor: var(--color-dark-gray );
	--color: currentColor;

	background-color: var(--bgcolor );
	border-color: var(--borderColor );
	border-width: 1px;
	border-style: solid;
	color: var(--color );
	font-size: 1.25em;
	line-height: 1.5;
	padding: 0.25em;

	&:disabled {
		--bgcolor: var(--color-light );
		--borderColor: var(--color-med-gray );
		--color: var(--color-med-gray );
	}

	&:readonly {
		--borderColor: var(--color-lt-gray ); 
		--color: var(--color-dark-gray );

		cursor: not-allowed;
	}
`;

const Description = styled.small``;

const Required = styled.small`
	color: var(--color-dark-gray );
`;

const Textarea = props => {
	return (
		<FieldContainer>
			<Label for={ props.name }>{ props.labelText }</Label>
			<FieldWrap>
				<Field 
					autofocus={ props.autofocus }
					cols={ props.cols }
					disabled={ props.disabled }
					id={ props.id }
					maxlength={ props.maxlength }
					name={ props.name }
					onChange={ props.onChange }
					readonly={ props.readonly }
					required={ props.required }
					rows={ props.rows }
					value={ props.value }
				/>
				<Description>{ props.description } <Required>{ props.required ? null : '(Optional)' }</Required></Description>
			</FieldWrap>
		</FieldContainer>
	);
};

Textarea.propTypes = {
	autofocus: PropTypes.bool,
	cols: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.number
	] ),
	description: PropTypes.string,
	disabled: PropTypes.bool,
	id: PropTypes.string,
	labelText: PropTypes.string.isRequired,
	maxlength: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	] ),
	name: PropTypes.string.isRequired,
	readonly: PropTypes.bool,
	required: PropTypes.bool,
	rows: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	] ),
	value: PropTypes.string,
	wrap: PropTypes.oneOf(['soft','hard'] ),
};

Textarea.defaultProps = {
	cols: 10,
	rows: 10,
	required: true,
}

export default Textarea;
