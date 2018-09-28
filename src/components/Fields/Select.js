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

const Field = styled.select`
	flex: 1 1 auto;
	order: 2;
`;

const Option = styled.option`

`;

const Description = styled.small``;

const Required = styled.small`
	color: var(--color-dark-gray );
`;

const Select = props => {
	return (
		<FieldContainer>
			<Label for={ props.name }>{ props.labelText }</Label>
			<FieldWrap>
				<Field
					autofocus={ props.autofocus }
					disabled={ props.disabled }
					id={ props.id }
					multiple={ props.multiple }
					name={ props.name }
					required={ props.required }
					size={ props.size }
				>
				{
					props.options.map( ( option,i ) => (
						<Option key={ i } value={ option.value } selected={ option.value === props.value }>{ option.label }</Option>
					) )
				}
				</Field>
				<Description>{ props.description } <Required>{ props.required ? null : '(Optional)' }</Required></Description>
			</FieldWrap>
		</FieldContainer>
	);
};

Select.propTypes = {
	autofocus: PropTypes.bool,
	description: PropTypes.string,
	disabled: PropTypes.bool,
	id: PropTypes.string,
	labelText: PropTypes.string.isRequired,
	multiple: PropTypes.bool,
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf( propTypes.shape( {
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
	} ) ),
	required: PropTypes.bool,
	size: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	] ),
	value: PropTypes.string,
};

Select.defaultProps = {
	required: true,
}

export default Select;
