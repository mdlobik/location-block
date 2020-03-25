<?php
/**
 * Plugin Name: Location Block
 * Description: The best location gutenberg block!
 * Author: Matt Dlobik
 * Version: 1.0.0
 * License: GPL2+
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
