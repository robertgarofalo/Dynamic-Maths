<?php

//Load JS on all admin pages

function dynamic_maths_admin_scripts() {

    wp_enqueue_script(
        'dynamic-maths-admin',
        DYNAMIC_MATHS_URL . 'includes/admin/js/dynamic-maths-admin.js',
        ['jquery'],
        time()
    );
}

add_action( 'admin_enqueue_scripts', 'dynamic_maths_admin_scripts', 100 );


function dynamic_maths_frontend_scripts() {

    wp_enqueue_script(
        'dynamic-maths-frontend',
        DYNAMIC_MATHS_URL . 'includes/frontend/js/dynamic-maths-frontend.js',
        ['jquery'],
        time()
    );
}

add_action( 'wp_enqueue_scripts', 'dynamic_maths_frontend_scripts', 100 );