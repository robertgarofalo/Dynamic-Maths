<?php 
// This file includes 


// Include addition-shortcode
include( plugin_dir_path( __FILE__ ) . 'addition/addition-shortcode.php');

// Add MAIN shortcodes CSS script

function dynamic_maths_shortcodes_styles() {
    
    wp_enqueue_style(
        'shortcodes-style',
        DYNAMIC_MATHS_URL . 'includes/shortcodes/shortcodes.css',
        [],
        time(),
        
    );
}

add_action( 'wp_enqueue_scripts', 'dynamic_maths_shortcodes_styles' );


