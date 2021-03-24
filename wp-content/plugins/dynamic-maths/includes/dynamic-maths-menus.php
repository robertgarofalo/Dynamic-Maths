<?php

// Add Main Settings Page function 
function dynamic_maths_settings_page()
{
    add_menu_page(
        __( 'Dynamic Maths', 'dynamic-maths' ),
        __( 'Dynamic Maths', 'dynamic-maths' ),
        'manage_options', // roles and capabilities codex - https://wordpress.org/support/article/roles-and-capabilities/
        'dynamicmaths',
        'dynamic_maths_settings_page_markup',
        'dashicons-welcome-learn-more',
        100
    );
}

//call back functioin for add_menu_page in dynamic maths settings page function
function dynamic_maths_settings_page_markup()
{
    // Double check user capabiilties
    if ( !current_user_can('manage_options') ) {
        return;
    }

    // include settings-page.php markup
    include( DYNAMIC_MATHS_DIR . 'templates/admin/settings-page.php');

}


add_action ( 'admin_menu', 'dynamic_maths_settings_page' );


//Add a link to settings page from plugin page
function dynamic_maths_add_settings_link( $links ) {
    $settings_link = '<a href="admin.php?page=dynamicmaths">' . __( 'Settings', 'dynamic-maths' ) . '</a>';
    array_push( $links, $settings_link );
    return $links;
}
$filter_name = "plugin_action_links_" . plugin_basename( __FILE__ );

add_filter( $filter_name, 'dynamic_maths_add_settings_link' );


// Add user skill level meta data function in user settings page

function dynamic_maths_usermeta_form_field_skill_level( $user )
{
    
    // Checks if a user is not admin
    if ( ! current_user_can( 'activate_plugins', $user_id ) ) :
        return false;
     else : ?>

    <h3>User Skill Levels</h3>
    <table class="form-table">
    
    <!-- Addition skill level -->
        <tr>
            <th>
                <label for="addition-skill-level">Addition Skill Level</label>
            </th>
            <td>
            <input type="number"
                    id="addition-skill-level"
                    name="addition-skill-level"
                    value="<?= esc_attr( get_user_meta( $user->ID, 'addition-skill-level', true ) ) ?>"
                    placeholder="Level"
                    min="1"
                    max="30" 
                    required 
            >
                <p class="description">
                   Addition Skill Level
                </p>
            </td>
        </tr>

         <!-- Subtraction skill level -->
         <tr>
            <th>
                <label for="subtraction-skill-level">Subtraction Skill Level</label>
            </th>
            <td>
            <input type="number"
                    id="subtraction-skill-level"
                    name="subtraction-skill-level"
                    value="<?= esc_attr( get_user_meta( $user->ID, 'subtraction-skill-level', true ) ) ?>"
                    placeholder="Level"
                    min="1"
                    max="30" 
                    required 
            >
                <p class="description">
                   Subtraction Skill Level
                </p>
            </td>
        </tr>

        <!-- Multiplication skill level -->
        <tr>
            <th>
                <label for="multiplication-skill-level">Multiplication Skill Level</label>
            </th>
            <td>
            <input type="number"
                    id="multiplication-skill-level"
                    name="multiplication-skill-level"
                    value="<?= esc_attr( get_user_meta( $user->ID, 'multiplication-skill-level', true ) ) ?>"
                    placeholder="Level"
                    min="1"
                    max="30" 
                    required 
            >
                <p class="description">
                   Multiplication Skill Level
                </p>
            </td>
        </tr>

        <!-- Decimals skill level -->
        <tr>
            <th>
                <label for="decimals-skill-level">Decimals Skill Level</label>
            </th>
            <td>
            <input type="number"
                    id="decimals-skill-level"
                    name="decimals-skill-level"
                    value="<?= esc_attr( get_user_meta( $user->ID, 'decimals-skill-level', true ) ) ?>"
                    placeholder="Level"
                    min="1"
                    max="30" 
                    required 
            >
                <p class="description">
                   Decimals Skill Level
                </p>
            </td>
        </tr>

        <!-- Fractions skill level -->
        <tr>
            <th>
                <label for="fractions-skill-level">Fractions Skill Level</label>
            </th>
            <td>
            <input type="number"
                    id="fractions-skill-level"
                    name="fractions-skill-level"
                    value="<?= esc_attr( get_user_meta( $user->ID, 'fractions-skill-level', true ) ) ?>"
                    placeholder="Level"
                    min="1"
                    max="30" 
                    required 
            >
                <p class="description">
                   Fractions Skill Level
                </p>
            </td>
        </tr>

    </table>


    <?php endif; ?>

    <?php
}

// Add the field to user's own profile editing screen.
add_action(
    'show_user_profile',
    'dynamic_maths_usermeta_form_field_skill_level'
);
  
// Add the field to user profile editing screen.
add_action(
    'edit_user_profile',
    'dynamic_maths_usermeta_form_field_skill_level'
);


  
/**
 * The save action.
 *
 * @param $user_id int the ID of the current user.
 *
 * @return bool Meta ID if the key didn't exist, true on successful update, false on failure.
 */
function dynamic_maths_usermeta_form_field_skill_level_update( $user_id )
{
    
    if ( ! current_user_can( 'activate_plugins', $user_id ) ) {
        return false;
    }
  
//old
    // create/update user meta for the $user_id
    // return update_user_meta(
    //     $user_id,
    //     'addition-skill-level',
    //     $_POST['addition-skill-level']
    // );


    $metas = array(
        'addition-skill-level' => $_POST['addition-skill-level'],
        'subtraction-skill-level' => $_POST['subtraction-skill-level'],
        'multiplication-skill-level' => $_POST['multiplication-skill-level'],
        'decimals-skill-level' => $_POST['decimals-skill-level'],
        'fractions-skill-level' => $_POST['fractions-skill-level'],
    );

    foreach($metas as $key => $value) {
        update_user_meta( $user_id, $key, $value ); 
    }


}
  
// Add the save action to user's own profile editing screen update.
add_action(
    'personal_options_update',
    'dynamic_maths_usermeta_form_field_skill_level_update'
);
  
// Add the save action to user profile editing screen update.
add_action(
    'edit_user_profile_update',
    'dynamic_maths_usermeta_form_field_skill_level_update'
);
