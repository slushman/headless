import { injectGlobal } from 'styled-components';

injectGlobal`
	:root {
		--color-light: #F2F6F7;
		--color-lt-gray: #E9EFF2;
		--color-med-gray: #BEC8CF;
		--color-dark-gray: #606569;
		--color-charcoal: #313436;
		
		--color-lt-blue: #90C8E8;
		--color-medlt-blue: #61B7E8;
		--color-bright-blue: #1C9DE8;
		--color-blue: #0474B5;
		--color-dark-blue: #03649C; /* rgb(3, 100, 156) */
		--color-dark: #02334F; /* rgb(2, 51, 79) */

		--color-lt-accent: #CF1C04;
		--color-accent: #B51804;
		--color-dark-accent: #9C1503;

		--site-header-height: 128px;
		--scroll-height: 4px;

		@media screen and (min-width: 560px) {
			--site-header-height: 80px;
		}
	}

	html {
		box-sizing: border-box;
	}

	*,
	*:before,
	*:after { /* Inherit box-sizing to make it easier to change the property for components that leverage other behavior; see https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */
		box-sizing: inherit;
	}

	body {
		--fontsize: 1rem;

		background-color: #F2F6F7;
		background-color: var(--color-light);
		color: var(--color-dark);
		font-family: 'Source Sans Pro', sans-serif;
		font-size: var(--fontsize);
		margin: 0;
		padding: 0;

		@media screen and (min-width: 19rem) {
			--fontsize: calc(1rem + 0.2 * ((100vw - 19rem) / 60));
		}

		@media screen and (min-width: 80rem) {
			--fontsize: 1.2rem;
		}
	}

	img {
		height: auto;
		max-width: 100%;
	}

	figure {
		margin: 0;
		margin-bottom: 1.5em;
	}

	embed,
	iframe,
	object {
		max-width: 100%;
	}

	iframe[sandbox=allow-scripts] {
		width: 100%;
	}


	/**
	 * WordPress Styles
	 */

	.screen-reader-text {
		background-color: var(--color-lt-gray);
		border: 0;
		border-radius: 3px;
		box-shadow: 0 0 2px 2px rgba(var(--color-dark-gray), 0.6);
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		color: var(--color-dark-gray);
		display: block;
		font-size: 0.875rem;
		font-weight: bold;
		height: 1px;
		line-height: normal;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute !important;
		text-decoration: none;
		width: 1px;
		word-wrap: normal !important;
	}

	.screen-reader-text:focus {
		clip: auto !important;
		clip-path: none;
		height: auto;
		padding: 15px 23px 14px;
		width: 100%;
		z-index: 100000; /* Above WP toolbar */
	}

	.gallery {
		display: grid;
		grid-gap: 1em;
		margin-bottom: 1.5em;
	}

	.gallery-item {
		margin: 0;
	}

	.gallery-columns-3 {
		grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
	}

	.gallery-caption,
	.wp-caption-text {
		font-size: 1rem;
		font-style: italic;
	}

	.alignnone,
	a img.alignnone,
	.wp-caption.alignnone {
		margin: 0.25em 1.125em 1.125em 0;
	}

	.aligncenter,
	div.aligncenter,
	a img.aligncenter {
		display: block;
		margin: 0.25em auto 0.25em auto;
	}

	.alignright,
	a img.alignright,
	.wp-caption.alignright {
		float: right;
		margin: 0.25em 0 1.125em 1.125em;
	}

	.alignleft,
	a img.alignleft,
	.wp-caption.alignleft {
		float: left;
		margin: 0.25em 1.125em 1.125em 0;
	}

	.wp-caption {
		background: #fff;
		border: 1px solid #f0f0f0;
		max-width: 96%; /* Image does not overflow the content area */
		padding: 0.25em 0.125em 0.5em;
		text-align: center;
	}

	.wp-caption img {
		border: 0 none;
		height: auto;
		margin: 0;
		max-width: 98.5%;
		padding: 0;
		width: auto;
	}

	.wp-caption p.wp-caption-text {
		font-size: 11px;
		line-height: 17px;
		margin: 0;
		padding: 0 4px 5px;
	}
`;