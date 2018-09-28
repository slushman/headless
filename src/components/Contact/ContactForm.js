import React from 'react';
import styled from 'styled-components';

import Input from '../Fields/Input';
import Textarea from '../Fields/Textarea';
import Button from '../Fields/Button';
import BotField from '../Fields/BotField';
import Recaptcha from '../Fields/NetlifyCaptcha';

const Form = styled.form`
	border: 0;
	margin: 0;
	padding: 0;
`;

const Fieldset = styled.fieldset`
	border: 0;
	margin: 0;
	padding: 0;
`;

const Legend = styled.legend`
	border: 0;
	font-family: 'Source Serif Pro', serif;
	font-size: 1.5em;
	font-weight: bold;
	margin: 0 0 1em;
	padding: 0;
`;

const InputList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;

	& > li {
		margin-bottom: 1.5em;
	}
`;

const ContactForm = props => {
	return (
		<Form method="POST" name="contact" netlify="true" netlify-honeypot="bot-field" onSubmit={ props.handleSubmit }>
			<Fieldset>
				<Legend>Contact Me</Legend>
				<InputList>
					<Input labelText="Name" name="name" onChange={ props.handleChange } value={ props.name } />
					<Input labelText="Email" name="email" onChange={ props.handleChange } type="email" value={ props.email } />
					<Textarea labelText="Message" name="message" onChange={ props.handleChange } value={ props.message } />
					<BotField />
					<Recaptcha />
					<Button position="right" labelText="Send" />
				</InputList>
			</Fieldset>
		</Form>
	);

}

export default ContactForm;
