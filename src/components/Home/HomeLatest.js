import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import he from 'he';
import styled from 'styled-components';
import { getImage } from '../../functions';

//background: linear-gradient( rgba( 255,255,255,0.85 ),rgba( 255,255,255,0.85 ) ), url(${ props => props.imageSizes.small } );

const PostLatest = styled.div`
	--bgImage: url(${ props => props.imageSizes.small } );
	--padtop: 1em;
	--padbot: 1em;

	background-image: var(--bgImage );
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	display: flex;
	padding-bottom: var(--padbot );
	padding-top: var(--padtop);
	position: relative;
	transition: all 1s ease;

	&:before {
		background-color: rgba( 255,255,255,0.85 );
		bottom: 0;
		content: "";
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 0;
	}

	@media screen and ( min-width: 560px) {
		--bgImage: url(${ props => props.imageSizes.med } );
		--padbot: 3em;
		--padtop: calc(var(--site-header-height ) * 2);

		margin-top: calc(var(--site-header-height ) * -1 );
	}

	@media screen and ( min-width: 1024px) {
		--bgImage: url(${ props => props.imageSizes.large } );
	}	
`;

const HomeLatestTitleContent = styled.div`
	--pad: 1em;

	padding-left: var(--pad );
	padding-right: var(--pad );
	z-index: 1;

	@media screen and ( min-width: 700px) {
		--pad: calc( 100vw/2 - 42rem/2);
	}
`;

const CTAHomeTop = styled.p`
	text-transform: uppercase;
`;

const HomeLatestTitle = styled.h2`
	font-size: 2.5em;
`;

const StyledLink = styled( Link )`
	--link-color: var(--color-blue );

	color: var(--link-color );
	
	&:visited,
	&:active,
	&:hover {
		--link-color: var(--color-blue );
	}

	&:focus {
		outline-color: #E8671C;
	}
`;

const HomeContentExcerpt = styled.div``;

const HomeLatest = ( { post } ) => {
	//console.log( post )
	let image = post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0] : false;
	let excerptContent = post.yoast && 0 !== post.yoast.metadesc.length ? post.yoast.metadesc : he.decode( post.excerpt.rendered );

	let imageSizes = {
		small: image.media_details ? getImage( image.media_details.sizes, 'small' ) : null,
		med: image.media_details ? getImage( image.media_details.sizes, 'med' ) : null,
		large: image.media_details ? getImage( image.media_details.sizes, 'large' ) : null,
	}

	return (
		<PostLatest imageSizes={ imageSizes } data="latest">
			<HomeLatestTitleContent>
				<CTAHomeTop>Read my latest article:</CTAHomeTop>
				<HomeLatestTitle>
					<StyledLink to={ `/post/${ post.slug }` }>{he.decode( post.title.rendered ) }</StyledLink>
				</HomeLatestTitle>
				<HomeContentExcerpt dangerouslySetInnerHTML={ { __html: excerptContent } } />
			</HomeLatestTitleContent>
		</PostLatest>
	);
};

HomeLatest.propTypes = {
	post: PropTypes.object,
};

export default HomeLatest;
