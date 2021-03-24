<?php 

// Addition Quiz Shortcode
function addition_quiz() {
    ob_start();
    ?>
    <div class='quiz-container'>

        <div class="quiz-welcome-screen">
            <h1>Addition Quiz</h1>
            <!-- <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                Voluptatem veniam esse eveniet nesciunt. Harum laborum sit 
                accusantium eveniet cupiditate debitis. -->
            <button id="start-addition-quiz">Start</button>
        </div>
     
         <!-- <h1><?php #echo get_bloginfo( 'name' ); ?></h1> -->
         
         <div class="quiz-screen">
    
            <div id="timer"></div>
         
            <div id="addition-questions" class="questions-container">
                <p id="question-count"></p>
                <p id="quiz-question"></p>
            </div>

            <div class="quiz-input-submit">
                <input id="quiz-answer" type="number" placeholder="Your answer">
                <button class='class-button' id="answer-button">Next</button>
            </div>
            <!-- <p class="answer-required">*REQUIRED</p> -->
        </div>


        <div class="quiz-results-screen">
            <p>here are the results</p>
            <div class="result-buttons-container">
            <button id="see-results">See Results</button>
            <button id="restart">Again</button>

            </div>
        </div>

</div>
            
     
     <?php


     return ob_get_clean();
}

add_shortcode('addition_quiz', 'addition_quiz');



// Load Addition.js script 
function addition_js_script() {
   
    wp_enqueue_script(
        'dynamic-maths-addition-js',
        DYNAMIC_MATHS_URL . 'includes/shortcodes/addition/addition.js',
        ['jquery'],
        time(),
        true //bool $in_footer ---- this is what helps it load last
    );

    wp_localize_script( 'dynamic-maths-addition-js', 'php_data', array(
        'message' => __('A message that can be translated!'),
        'user_addition_skill' => get_user_meta( wp_get_current_user()->ID, 'addition-skill-level', true )
        // 'user_subtraction_skill' => get_user_meta( wp_get_current_user()->ID, 'subtraction-skill-level', true ),
        // 'user_multiplication_skill' => get_user_meta( wp_get_current_user()->ID, 'multiplication-skill-level', true ),
        // 'user_decimals_skill' => get_user_meta( wp_get_current_user()->ID, 'decimals-skill-level', true ),
        // 'user_fractions_skill' => get_user_meta( wp_get_current_user()->ID, 'fractions-skill-level', true )
    ));

}

// Load Addition.css script

function addition_css_script() {
   
    wp_enqueue_style(
        'dynamic-maths-addition-css',
        DYNAMIC_MATHS_URL . 'includes/shortcodes/addition/addition.css',
        [],
        time() 
    );

}

// Load scripts if shortcode is used
if (shortcode_exists( 'addition_quiz' ) ){
    add_action( 'wp_enqueue_scripts', 'addition_js_script', 100 );
    add_action( 'wp_enqueue_scripts', 'addition_css_script', 100 );
}