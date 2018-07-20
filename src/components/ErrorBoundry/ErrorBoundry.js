import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorWrap = styled.div``;
const ErrorTitle = styled.h1``;
const ErrorContent = styled.p``;

class ErrorBoundry extends Component {

	state = {
		hasError: false,
		error: null,
		info: null
	}

	componentDidCatch(error, info) {
		this.setState({
			hasError: true,
			error,
			info
		});
	}
	
	render() {
		if(this.state.hasError) {
			return (
				<ErrorWrap>
					<ErrorTitle>Oops, something we wrong.</ErrorTitle>
					<ErrorContent>The error: { this.state.error.toString() }</ErrorContent>
					<ErrorContent>Where it occured: { this.state.info.componentStack }</ErrorContent>
				</ErrorWrap>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundry;