<?php
/*
 * Plugin Name:       Dynamic Maths
 * Plugin URI:        '#'
 * Description:       Dynamic Maths questions for learning Arithmetic
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Creative Crew Studios
 * Author URI:        https://www.creativecrewstudios.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamic-maths
 * Domain Path:       /languages
 */

 // 


// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

// CONSTANT PATHS
define( 'DYNAMIC_MATHS_URL', plugin_dir_url( __FILE__ ) );
define( 'DYNAMIC_MATHS_DIR', plugin_dir_path( __FILE__ ) );

//Enqueue CSS 
include( plugin_dir_path( __FILE__ ) . 'includes/dynamic-maths-styles.php');

//Enqueue Javascript 
include( plugin_dir_path( __FILE__ ) . 'includes/dynamic-maths-scripts.php');

// Create Plugin Admin Menus and Setting Pages
include( plugin_dir_path( __FILE__ ) . 'includes/dynamic-maths-menus.php');

// Include shortcodes main file
include( plugin_dir_path( __FILE__ ) . 'includes/shortcodes/shortcodes-main.php');




