/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';
import { button } from '@wordpress/icons';

/**
 * Register the Read More button block variation.
 */
registerBlockVariation( 'core/button', {
	name: 'read-more-button/post-url',
	icon: button,
	title: __( 'Read More', 'no-blocks-just-bindings' ),
	description: __(
		'Displays a button that links to the current post, page, or other content-type.',
		'no-blocks-just-bindings'
	),
	scope: [ 'inserter' ],
	example: {
		attributes: {
			className: 'is-style-fill',
			text: __( 'Read More', 'no-blocks-just-bindings' ),
		},
	},
	attributes: {
		metadata: {
			bindings: {
				url: {
					source: 'read-more-button/post-url',
				},
			},
		},
	},
	isActive: ( blockAttributes ) =>
		'read-more-button/post-url' ===
		blockAttributes?.metadata?.bindings?.url?.source,
} );