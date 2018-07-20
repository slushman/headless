import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonWrap = styled.li`
	display: flex;
	justify-content: ${props => 'right' === props.position ? 'flex-end' : 'flex-start' };
	margin: 0;
	padding: 0;
`;

const ButtonElement = styled.button`
	--bgcolor: #fff;
	--borderColor: var(--color-dark-gray);
	--borderWidth: 1px;
	--color: currenColor;

	background: none;
	background-color: var(--bgcolor);
	border-color: var(--borderColor);
	border-radius: 0;
	border-style: solid;
	border-width: var(--borderWidth);
	box-shadow: none;
	color: var(--color);
	cursor: pointer;
	font-size: 1em;
	padding: 0.25em 1em;
	text-shadow: none;
	transition: 0.4s ease;

	&:hover,
	&:active,
	&:focus {
		--bgcolor: var(--color-dark-gray);
		--borderColor: inherit;
		--color: #fff;
	}
`;

const Button = props => {
	return (
		<ButtonWrap position={props.position}>
			<ButtonElement type={props.type}>{props.labelText}</ButtonElement>
		</ButtonWrap>
	);
};

Button.propTypes = {
	labelText: PropTypes.string,
	position: PropTypes.string,
	type: PropTypes.string
};

Button.defaultProps = {
	labelText: 'Submit',
	position: 'left',
	type: 'submit'
}

export default Button;