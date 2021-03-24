//Selectors
//FIRST VIEW
const startQuizbutton = document.getElementById('start-addition-quiz'); //welcome screen - start button
const quizWelcomeView = document.querySelector('.quiz-welcome-screen'); //quiz container

//SECOND VIEW
const quizQuestionsView = document.querySelector('.quiz-screen') //quiz questions container 
const questionContainer = document.getElementById('addition-questions');
const quizQuestionsCount = document.getElementById('question-count'); //questions counter
const quizQuestion = document.getElementById('quiz-question'); // quiz question
const answerButton = document.getElementById('answer-button'); //answer question button
const userInput = document.getElementById('quiz-answer');
const answerRequired = document.querySelector('.answer-required');

//RESULTS VIEW


//INIT
let questions = [];
let numOfQuestions = 5;

const randomNum = () => Math.floor(Math.random() * 15);

//Create array object of questions and methods
const generateQuestions = (numOfQuestions) => {
    for (let i = 1; i <= numOfQuestions; i++){
    questions[`q${i}`] = {

      _num1: randomNum(),
      _num2: randomNum(),
      _userAnswer: null,
    
    get displayQuestion(){
      return `${this._num1} + ${this._num2}`
    },

    get userAnswer(){
      return this._userAnswer;
    },

    set userAnswer(val){
      this._userAnswer = val;
    },

    get correctAnswer(){
      return this._num1 + this._num2;
      
    }
    }
  }
  }


  //Display an individual question 
  let questionIndex = 1;

  const displayQuestion = () => {
    quizQuestionsCount.textContent = `Question ${questionIndex} / ${Object.keys(questions).length}`;
    quizQuestion.textContent = questions[`q${questionIndex.toString()}`].displayQuestion;
  }

// VIEWS 
// quizQuestionsCount.textContent = `hi there`;
// quizQuestion.textContent = `1 + 1`;

//////// Event Listeners ////////

// WELCOME SCREEN - Initialize
startQuizbutton.addEventListener('click', function(){
  quizQuestionsView.style.display = 'flex';
    startTimer();
    generateQuestions(numOfQuestions);
    displayQuestion();
    startQuizbutton.style.display = "none";

});

// QUIZ SCREEN - submit next button
answerButton.addEventListener('click', function(){
  // save user value and push to questions array
    if(userInput.value === ''){
      userInput.placeholder = '*Required';
      userInput.classList.add('answer-required');
      return;
    } else {
      userInput.placeholder = 'Your answer';
      userInput.classList.remove('answer-required');

    questions[`q${questionIndex.toString()}`].userAnswer = userInput.value;
    userInput.value = '';
    // if questionIndex is not = questions.length, questionIndex++
    if (questionIndex >= Object.keys(questions).length){
      onTimesUp();
    } else {
      questionIndex++
      displayQuestion();
    }
  }
});


    // alert(php_data.user_addition_skill);
    // alert(php_data.user_subtraction_skill);
    // alert(php_data.user_multiplication_skill);
    // alert(php_data.user_decimals_skill);
    // alert(php_data.user_fractions_skill);


// ================================ TIMER =============================
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 132;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;


// Timer hits 0
function onTimesUp() {
  clearInterval(timerInterval);
  document.querySelector('.quiz-results-screen').style.display = "block";
  document.querySelector('.quiz-screen').style.display = "none";
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (minutes === 0){
      return `${seconds}s`
  } else {
  return `${minutes}:${seconds}`;
  }
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
