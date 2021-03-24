<?php 
// Load CSS on all admin pages

function dynamic_maths_admin_style() {

    wp_enqueue_style(
        'dynamic-maths-admin',
        DYNAMIC_MATHS_URL . 'includes/admin/css/dynamic-maths-admin-style.css',
        [],
        time()
    );
}

add_action( 'admin_enqueue_scripts', 'dynamic_maths_admin_style' );


// Load CSS on the frontend

function dynamic_maths_frontend_styles() {
    
    wp_enqueue_style(
        'dynamic-maths-admin',
        DYNAMIC_MATHS_URL . 'includes/frontend/css/dynamic-maths-frontend-style.css',
        [],
        time()
    );
}

add_action( 'wp_enqueue_scripts', 'dynamic_maths_frontend_styles' );