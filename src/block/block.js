/**
 * BLOCK: location-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, PlainText, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { SelectControl } = wp.components;
//import { RichText } from '@wordpress/block-editor';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'plugins/location-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Location' ), // Block title.
	icon: 'location', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'location' ),
	],
	attributes: {
		name: {
			type: 'string',
			source: 'html',
			selector: '.name',
		},
		author: {
			type: 'string',
			source: 'html',
			selector: '.author',
		},
		address: {
			type: 'string',
			source: 'text',
			selector: '.address',
		},
		imgUrl: {
			type: 'string',
			default: 'https://placehold.it/450x350',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		// Creates a <p class='wp-block-cgb-block-location-block'></p>.
		const { attributes: { name, author, address, imgUrl }, setAttributes, className } = props;
		// quote = props.attributes.quote


		function changeName( value ) {
			setAttributes( { name: value } );
		}

		function changeAuthor( value ) {
			setAttributes( { author: value } );
		}

		function changeAddress( value ) {
			setAttributes( { address: value } );
		}

		function selectImage( value ) {
			// console.log(value);
			setAttributes( { imgUrl: value.sizes.thumbnail.url } ); // thumbnail, full, medium
		}

		return (
			<div className={ props.className }>
				<div className="Namebox">
				<PlainText className="name"

						  tagName="div"
						  value={ name }
						  onChange={ changeName }
						  placeholder="What is the name of your location?"
				/>
				</div>
				<PlainText className="address"

						   value={ address }
						   onChange={ changeAddress }
						   placeholder="Address"
				/>
				<div className="location-profile">
					<div className="photo">
							<p>Photo of Location:</p>
							<MediaUploadCheck>
							<MediaUpload
								allowedTypes={['image']}
								onSelect={selectImage}
								render={({open}) =>
									<img src={imgUrl} onClick={open} />
								}
							/>
						</MediaUploadCheck>
					</div>
					<div className="text">
						<PlainText className="author"
								   value={ author }
								   onChange={ changeAuthor }
								   placeholder="Your Name"
						/>

					</div>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {

		return (
			<div className={ props.className }>
				<p>Name of Location:</p>
				<RichText.Content tagName="div" className="name" value={ props.attributes.name }/>
				<div className="location-profile">
					<p>Address:</p>
					<p className="address">{ props.attributes.address }</p>
					<p>Photo of Location</p>
					<div className="photo">
						<img src={props.attributes.imgUrl} alt={'Photo of ' + props.attributes.name}/>
					</div>
					<div className="text">
						<p>Author:</p>
						<p className="author">{ props.attributes.author }</p>
					</div>
				</div>
			</div>
		);
	},
} );
