import React, { Component } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import Input from '../Fields/Input';
import Textarea from '../Fields/Textarea';
import Button from '../Fields/Button';


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

class ContactForm extends Component {

	state = {
		name: '',
		email: '',
		message: ''
	}

	encode = (data) => {
		return Object.keys(data)
			.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
			.join("&");
	}

	handleSubmit = event => {
		fetch('/',{
			method: "POST",
			headers: { "Content-Type": "Application/x-www-form-urlencoded" },
			body: this.encode({"form-name": "contact", ...this.state})
		})
		.then( () => alert("Success!"))
		.catch(error => alert(error));

		event.preventDefault();
		
		ReactGA.event({
			category: 'ContactForm',
			action: 'Clicked Submit'
		})
	}

	handleChange = event => this.setState({ [event.target.name]: event.target.value })

	render() {
		return (
			<Form method="POST" name="contact" netlify="true" netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
				<Fieldset>
					<Legend>Contact Me</Legend>
					<InputList>
						<Input labelText="Name" name="name" onChange={this.handleChange} value={this.state.name} />
						<Input labelText="Email" name="email" onChange={this.handleChange} type="email" value={this.state.email} />
						<Textarea labelText="Message" name="message" onChange={this.handleChange} value={this.state.message} />
						<Button position="right" labelText="Send" />
					</InputList>
				</Fieldset>
			</Form>
		);
	}
};

export default ContactForm;