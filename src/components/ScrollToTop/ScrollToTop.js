import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ScrollToTopButton = styled.button`
	--bgcolor: var(--color-dark-blue );
	--textColor: var(--color-light );

	background: none;
	background-color: var(--bgcolor );
	border: none;
	border-color: var(--color-dark-blue );
	border-radius: 0;
	border-style: solid;
	border-width: 2px;
	bottom: ${ props => props.fixed ? '1.5em' : '' };
	box-shadow: none;
	color: var(--textColor );
	cursor: pointer;
	display: block;
	font-size: 1em;
	height: 2em;
	margin-right: 1em;
	padding: 0;
	position: ${ props => props.fixed ? 'fixed' : 'relative' };
	right: ${ props => props.fixed ? '1.5em' : '' };
	text-shadow: none;
	transition: 0.4s ease;
	width: 2em;
	z-index: ${ props => props.fixed ? '999' : '' };

	&:hover {
		--bgcolor: var(--color-light );
		--textColor: var(--color-dark-blue );

		border-color: inherit;
	}

	&:active,
	&:focus {
		border-color: inherit;
	}
`;

const ScrollToTopLabel = styled.span`
	--clip: rect( 1px, 1px, 1px, 1px);
	--clippath: inset( 50%);
	--height: 1px;
	--padding: 0;
	--width: 1px;

	background-color: var(--color-lt-gray );
	border: 0;
	border-radius: 3px;
	box-shadow: 0 0 2px 2px rgba(var(--color-dark-gray ), 0.6 );
	clip: var(--clip);
	clip-path: var(--clippath );
	color: var(--color-dark-gray );
	display: block;
	font-size: 0.875rem;
	font-weight: bold;
	height: var(--height );
	line-height: normal;
	margin: -1px;
	overflow: hidden;
	padding: var(--padding );
	position: absolute !important;
	text-decoration: none;
	width: var(--width );
	word-wrap: normal !important;

	&:focus {
		--clip: auto !important;
		--clippath: none;
		--height: auto;
		--padding: 15px 23px 14px;
		--width: 100%;

		z-index: 100000; /* Above WP toolbar */
	}
`;

class ScrollToTop extends Component {
	scrollToTop = () => {
		window.scroll( { top: 0, left: 0, behavior: 'smooth' } );
	}
	hideUntil = () => {
		if ( !this.props.fixed ) { return; }
		// hide if the page has not scrolled enough
	}
	noOverlapFooter = () => {
		if ( !this.props.fixed ) { return; }
		// do not allow this to overlap the footer.
	}
	render() {
		return (
			<ScrollToTopButton onClick={ this.scrollToTop } title="Back to top" fixed={ this.props.fixed }>
				&uarr;
				<ScrollToTopLabel>Back to top</ScrollToTopLabel>
			</ScrollToTopButton>
		);
	}
}

ScrollToTop.propTypes = {
	fixed: PropTypes.bool,
};

export default ScrollToTop;
