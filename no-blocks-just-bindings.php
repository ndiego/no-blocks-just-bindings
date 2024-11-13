<?php
/**
 * Plugin Name:         No Blocks, Just Bindings
 * Plugin URI:          https://www.nickdiego.com/
 * Description:         A collection of useful block bindings.
 * Version:             0.1.0
 * Requires at least:   6.6
 * Requires PHP:        7.4
 * Author:              Nick Diego
 * Author URI:          https://www.nickdiego.com
 * License:             GPL-2.0-or-later
 * License URI:         https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:         no-blocks-just-bindings
 * Domain Path:         /languages
 *
 * @package no-blocks-just-bindings
 */

namespace ReadMoreButton;

defined( 'ABSPATH' ) || exit;

/**
 * Register the block and block bindings.
 */
function register_bindings() {

	register_block_bindings_source(
		'read-more-button/post-url',
		array(
			'label'              => __( 'Post URL', 'no-blocks-just-bindings' ),
            'uses_context'       => array( 'postId' ),
			'get_value_callback' => function( $source_args, $block_instance ) {
                if ( ! isset( $block_instance->context['postId'] ) ) {
                    return '';
                }

				return get_the_permalink( $block_instance->context['postId'] );
			},
		)
	);

    register_block_bindings_source(
		'time-to-read/time',
		array(
			'label'              => __( 'Time To Read', 'no-blocks-just-bindings' ),
            'uses_context'       => array( 'postId', 'postType' ),
			'get_value_callback' => function( $source_args, $block_instance ) {
                if ( ! isset( $block_instance->context['postId'] ) ) {
                    return '';
                }
            
                $content = get_the_content();
            
                /*
                 * Average reading rate - based on average taken from
                 * https://irisreading.com/average-reading-speed-in-various-languages/
                 * (Characters/minute used for Chinese rather than words).
                 */
                $average_reading_rate = 189;
            
                $word_count      = str_word_count( strip_tags( $content ) );
                $minutes_to_read = ceil( $word_count / $average_reading_rate );

                $minutes_to_read_string = sprintf(
                    /* translators: %s: the number of minutes to read the post. */
                    _n( '%s minute', '%s minutes', $minutes_to_read ),
                    //__( '%s min read', $minutes_to_read ),
                    $minutes_to_read
                );

                return $minutes_to_read_string;
			},
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_bindings' );

/**
 * Enqueue the Editor scripts and styles.
 */
function enqueue_editor_scripts_styles() {

	$assets = include plugin_dir_path( __FILE__ ) . '/build/index.asset.php';
	
	wp_enqueue_script(
		'read_more_button_editor_scripts',
		plugin_dir_url( __FILE__ ) . '/build/index.js',
		$assets['dependencies'],
		$assets['version'],
		true
	);

}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_editor_scripts_styles' );