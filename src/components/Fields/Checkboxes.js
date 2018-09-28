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

const FieldLabel = styled.div`
	line-height: 1.5;
	order: 1;
	padding-right: 0.5em;
	width: 10em;

	&:after {
		content: ":";
	}
`;

const Fieldset = styled.fieldset`
	border: 0;
	margin: 0;
	order: 2;
	padding: 0;
`;

const Legend = styled.legend`
	border: 0;
	font-family: 'Source Serif Pro', serif;
	line-height: 1.5;
	margin: 0;
	padding: 0;
`;

const CheckboxList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const Label = styled.label`
	line-height: 1.5;
	order: 1;
	padding-right: 0.5em;
	width: 10em;
`;

const Field = styled.input`
	flex: 1 1 auto;
	line-height: 1.5;
	margin-right: 1em;
	order: 2;
`;

const Required = styled.small`
	color: var(--color-dark-gray );
`;

const Checkboxes = props => {
	return (
		<FieldContainer>
			<FieldLabel>{ props.labelText }</FieldLabel>
			<Fieldset>
				<Legend>{ props.description } <Required>{ props.required ? null : '(Optional)' }</Required></Legend>
				<CheckboxList>
				{
					props.boxes.map( ( box, i ) => (
						<FieldContainer key={ i }>
							<Label for={ props.name }>
								<Field
									autofocus={ props.autofocus }
									checked={ props.checked }
									disabled={ props.disabled }
									id={ props.id }
									name={ props.name }
									required={ props.required }
									type="checkbox"
									value={ box.value }
								/>
								{ box.label }
							</Label>
						</FieldContainer>
					) )
				}
				</CheckboxList>
			</Fieldset>
		</FieldContainer>
	);
};

Checkboxes.propTypes = {
	autofocus: PropTypes.bool,
	description: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	id: PropTypes.string,
	labelText: PropTypes.string.isRequired,
	multiple: PropTypes.bool,
	name: PropTypes.string.isRequired,
	boxes: PropTypes.arrayOf( propTypes.shape( {
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
	} ) ),
	required: PropTypes.bool,
	size: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	] ),
};

Checkboxes.defaultProps = {
	required: true,
}

export default Checkboxes;
