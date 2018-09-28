import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FieldContainer = styled.li`
	display: flex;
	margin: 0 0 1.5em;
	padding: 0;

	@media screen and ( max-width: 559px) {
		flex-direction: column;
	}
`;

const FieldLabel = styled.div`
	order: 1;
	padding-right: 0.5em;
	width: 10em;
`;

const FieldList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const FieldItem = styled.li``;

const Label = styled.label`
	order: 1;
	padding-right: 0.5em;
	width: 10em;
`;

const FieldWrap = styled.span`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	order: 2;
`;

const Field = styled.input`
	flex: 1 1 auto;
	margin-right: 1em;
	order: 2;
`;

const DescList = styled.ul`
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
`;

const DescItem = styled.li`
	&:not(:last-chilD ) {
		margin-right: 1.5em;
	}
`;

const Description = styled.small``;

const Required = styled.small`
	color: var(--color-dark-gray );
`;

const Radios = props => {
	return (
		<FieldContainer>
			<FieldLabel for={ props.name }>{ props.labelText }</FieldLabel>
			<FieldWrap>
				<FieldList>
					{
						props.radios.map( ( radio, i ) => (
							<FieldItem key={ i }>
								<Label for={ props.name }>
									<Field
										autofocus={ props.autofocus }
										checked={ props.checked }
										disabled={ props.disabled }
										id={ props.id }
										name={ props.name }
										required={ props.required }
										type="radio"
										value={ radio.value }
									/>
									{ radio.label }
								</Label>
							</FieldItem>
						) )
					}
				</FieldList>
				<DescList>
					<DescItem>
						<Description>{ props.description }</Description>
					</DescItem>
					<DescItem>
						<Required>{ props.required ? null : '(Optional)' }</Required>
					</DescItem>
				</DescList>
			</FieldWrap>
		</FieldContainer>
	);
};

Radios.propTypes = {
	autofocus: PropTypes.bool,
	description: PropTypes.string,
	disabled: PropTypes.bool,
	id: PropTypes.string,
	labelText: PropTypes.string.isRequired,
	multiple: PropTypes.bool,
	name: PropTypes.string.isRequired,
	radios: PropTypes.arrayOf( propTypes.shape( {
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
	} ) ),
	required: PropTypes.bool,
	size: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	] ),
};

Radios.defaultProps = {
	required: true,
}

export default Radios;
