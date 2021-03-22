<?php
/**
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


 **/
 
#Dynamic Maths Maths is free software: you can redistribute it and/or modify
#it under the terms of the GNU General Public License as published by
#the Free Software Foundation, either version 2 of the License, or
#any later version.
 
#Dynamic Maths Maths is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
#GNU General Public License for more details.


function dynamic_maths_usermeta_form_field_skill_level( $user )
{
    
    if ( ! current_user_can( 'activate_plugins', $user_id ) ) :
        return false;
     else : ?>

    <h3>User Skill Level</h3>
    <table class="form-table">
        <tr>
            <th>
                <label for="birthday">Skill Level</label>
            </th>
            <td>
            <input type="number"
                   
                    id="skill-level"
                    name="skill-level"
                    value="<?= esc_attr( get_user_meta( $user->ID, 'skill-level', true ) ) ?>"
                    placeholder="Level"
                    min="1"
                    max="30" 
                    required 
            >
                <p class="description">
                   Skill Level
                </p>
            </td>
        </tr>
    </table>

    

    <?php endif; ?>

    <?php
}
  
/**
 * The save action.
 *
 * @param $user_id int the ID of the current user.
 *
 * @return bool Meta ID if the key didn't exist, true on successful update, false on failure.
 */
function dynamic_maths_usermeta_form_field_skill_level_update( $user_id )
{
    // check that the current user have the capability to edit the $user_id
    // if ( ! current_user_can( 'edit_user', $user_id ) ) {
    //     return false;
    // }
    if ( ! current_user_can( 'activate_plugins', $user_id ) ) {
        return false;
    }
  
    // create/update user meta for the $user_id
    return update_user_meta(
        $user_id,
        'skill-level',
        $_POST['skill-level']
    );
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
