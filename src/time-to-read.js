/**
 * WordPress dependencies
 */
import { __, _n, _x, sprintf } from '@wordpress/i18n';
import { registerBlockBindingsSource,registerBlockVariation, serialize } from '@wordpress/blocks';
import { count } from '@wordpress/wordcount';
import { scheduled } from '@wordpress/icons';

/**
 * Register the Time to Read block variation.
 * 
 * his is a block variation version of the Time to Read block in Gutenberg.
 * The original block can be found here: https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/post-time-to-read
 */
registerBlockVariation( 'core/paragraph', {
	name: 'time-to-read/time',
	icon: scheduled,
	title: __( 'Time to Read', 'no-blocks-just-bindings' ),
	description: __(
		'Show minutes required to finish reading the post.',
		'no-blocks-just-bindings'
	),
	category: 'theme',
	scope: [ 'block', 'inserter' ],
	example: {
		attributes: {
			content: __( '12 minutes', 'no-blocks-just-bindings' ),
		},
	},
	attributes: {
		metadata: {
			bindings: {
				content: {
					source: 'time-to-read/time',
				},
			},
		},
	},
	isActive: ( blockAttributes ) =>
		'time-to-read/time' ===
		blockAttributes?.metadata?.bindings?.content?.source,
} );

/**
 * Register the Time to Read block binding source.
 */
registerBlockBindingsSource({
	name: 'time-to-read/time',
	getValues( { select, clientId, context, bindings } ) {
		const { postId, postType } = context;
		const entity = select( 'core' ).getEditedEntityRecord( 'postType', postType, postId );

		/**
		 * Average reading rate - based on average taken from
		 * https://irisreading.com/average-reading-speed-in-various-languages/
		 * (Characters/minute used for Chinese rather than words).
		 */
		const averageReadingRate = 189;

		/**
		 * When no edits have been made to the post, the blocks property is not available.
		 * In that case, we use the content property. No serialization is needed.
		 * 
		 * The fact that the block property is not always available is likely a bug in the core.
		 */
		const postContent = entity?.blocks ? serialize( entity.blocks ) : entity?.content;

		/**
		 * translators: If your word count is based on single characters (e.g. East Asian characters),
		 * enter 'characters_excluding_spaces' or 'characters_including_spaces'. Otherwise, enter 'words'.
		 * Do not translate into your own language.
		 */
		const wordCountType = _x(
			'words',
			'Word count type. Do not translate!'
		);

		const minutesToRead = Math.max(
			1,
			Math.round(
				count( postContent || '', wordCountType ) / averageReadingRate
			)
		);

		const content = sprintf(
			/* translators: %s: the number of minutes to read the post. */
			_n( '%s minute', '%s minutes', minutesToRead ),
			minutesToRead
		);

		return { content };
	}
} );