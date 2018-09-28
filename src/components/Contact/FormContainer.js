import React, { Component } from 'react';
import ReactGA from 'react-ga';

import ContactForm from './ContactForm';
import ThankYou from './ThankYou';

class FormContainer extends Component {

	state = {
		name: '',
		email: '',
		message: '',
		submitted: false
	}

	encode = ( data ) => {
		return Object.keys( data )
			.map( key => encodeURIComponent( key ) + "=" + encodeURIComponent( data[ key ] ) )
			.join( "&" );
	}

	handleSubmit = event => {
		fetch( '/', {
			method: "POST",
			headers: { "Content-Type": "Application/x-www-form-urlencoded" },
			body: this.encode( { "form-name": "contact", ...this.state } )
			}
		)
		.then( () => {
			this.setState( {
				submitted: true
			} )
			setTimeout( () => {
				this.setState( {
					name: '',
					email: '',
					message: '',
					submitted: false
				} )
			}, 5000 );
		} )
		.catch( error => alert( error ) );

		event.preventDefault();

		ReactGA.event( {
			category: 'ContactForm',
			action: 'Clicked Submit'
		} )
	}

	handleChange = event => this.setState( { [ event.target.name ]: event.target.value } )

	render() {
		return (
			this.state.submitted ?
				<ThankYou /> :
				<ContactForm
					handleSubmit={ this.handleSubmit }
					handleChange={ this.handleChange }
					name={ this.state.name }
					email={ this.state.email }
					message={ this.state.message }
				/>
		);
	}
};

export default FormContainer;
