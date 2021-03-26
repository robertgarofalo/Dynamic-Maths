// ROB TO DO
// - ability to send results or save somewhere

// <Selectors>

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

//OVERALL RESULTS VIEW
const quizResultsScreen = document.querySelector('.quiz-results-screen')
const quizResultsMessage = document.getElementById('quiz-results-message'); //message on times up
const totalQuestionsAnswers = document.getElementById('total-questions-answered'); // Total questions value
const totalCorrectAnswers = document.getElementById('total-correct-answers'); // Total correct answers
const totalAccuracy = document.getElementById('total-accuracy'); // Total accuracy
const restartQuizButton = document.getElementById('restart-quiz-button');
const seeDetailedResultsButton = document.getElementById('see-results'); //see results button

//DETAILED RESULTS VIEW
const detailedResultsScreen = document.querySelector('.detailed-results-container');
const backToResultsButton = document.getElementById('back-to-results');
const detailedResultsTable = document.getElementById('detailed-results-table');

// </SELECTORS>

//INITIALIZE ---- general functionality

let questions = [];
let numOfQuestions = 12;

const randomNum = () => Math.floor(Math.random() * questionDifficultyRandomNum );


// Difficulty level - NEED MIN MAX from Alex
let userAdditionSkillLevel = parseInt(php_data.user_addition_skill);
let questionDifficultyRandomNum;
switch(userAdditionSkillLevel){
  case 1 :
    questionDifficultyRandomNum = 10;
    break;

  case 2 :
    questionDifficultyRandomNum = 40;
    break;
    
    case 3 :
    questionDifficultyRandomNum = 75;
    break;
    
    case 4 :
    questionDifficultyRandomNum = 100;
    break;

    case 5 :
    questionDifficultyRandomNum = 140;
    break;
    
    case 6 :
    questionDifficultyRandomNum = 170;
    break;

    default:
      questionDifficultyRandomNum = 110;
      break;
}

//Create an array of objects with maths questions and methods
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


  // QUIZ SCREEN FUNCTIONALITY

  //Start quiz
  const startQuizQuestions = () => {
    userInput.value = '';
    userInput.placeholder = 'Your answer';
    userInput.classList.remove('answer-required');
    questionIndex = 1;
    quizQuestionsView.style.display = 'flex';
    startTimer();
    generateQuestions(numOfQuestions);
    displayQuestion();
    startQuizbutton.style.display = "none";
    quizResultsMessage.style.display = "none";
    quizResultsScreen.style.display = "none";
    userInput.focus();
  }

  //Next question
  const nextQuestion = () => {
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
      onTimesUp(true); // true means the user finished before the timer
    } else {
      questionIndex++
      displayQuestion();
    }
    }
    }


  // RESULTS SCREEN FUNCTIONALITY
  
const displayQuizResultsMessage = (message) => {

   // False means the user didn't finish in time
  if (message === false){
  quizResultsMessage.textContent = `Times up!`;

  // 'empty' means the user didnt' enter any results
  } else if (message === 'empty'){
    quizResultsMessage.textContent = 'No answers submitted!'
  } else {
    quizResultsMessage.textContent = 'Finished! Great Effort!';
  }
};

// See detailed quiz results button function
const seeDetailedQuizResults = () => {
  quizWelcomeView.style.display = "none"

  let answers = [];
  for (const result in questions) {
    answers.push(questions[result].userAnswer);
  }

  console.log(answers);
  if (answers.every(answer => answer === null)){
    displayQuizResultsMessage('empty');
    return;
  }

  // startQuizbutton.style.display = "none";
  quizResultsMessage.style.display = "none";
  quizResultsScreen.style.display = "none";
  detailedResultsScreen.style.display = "flex";

  
  detailedResultsTable.innerHTML = 
  `<tr>
  <th>Question</th>
  <th>Your Answer</th>
  <th>Correct Answer</th>
</tr>`;

  // functionality to display all the results in a table
  let i = 1;

  for (const result in questions) {
  if (questions[result].userAnswer !== null){
  
    let newRow = detailedResultsTable.insertRow(i);
    
    let questionCell = newRow.insertCell(0);
    let userAnswerCell = newRow.insertCell(1);
    let correctAnswerCell = newRow.insertCell(2);

    
    questionCell.innerHTML = questions[result].displayQuestion;
    userAnswerCell.innerHTML = questions[result].userAnswer;

    if (questions[result].userAnswer === questions[result].correctAnswer.toString()){
      // add green class list
      newRow.classList.add('quiz-correct-answer');
      // correctAnswerCell.innerHTML = 'correct brahh';
      correctAnswerCell.innerHTML = '<span class="dashicons dashicons-yes-alt quiz-correct-answer-tick"></span>';
    } else {
      //add red class list
      newRow.classList.add('quiz-incorrect-answer');
      correctAnswerCell.innerHTML = questions[result].correctAnswer;

    }

    i++
    }
  }

}


// DISPLAY DETAILED RESULTS FUNCTIONALITY

const displayResults = () => {

  // Loop through objects and pull out data
  let correctAnswers = [];
  let userAnswers = [];
  for (const result in questions) {
  if (questions[result].userAnswer !== null){
  correctAnswers.push(questions[result].correctAnswer);
  userAnswers.push(parseInt(questions[result].userAnswer));
  }
  }
  // Display total number of questions answered
  totalQuestionsAnswers.textContent = userAnswers.length.toString();


  // Check to see if user's answers are correct 
  let correctAnswersCounter = 0;
  for (let i=0; i < userAnswers.length; i++){
    if (userAnswers[i] === correctAnswers[i]){
      correctAnswersCounter++
    }
  }
 // Display total number of correct answers
  totalCorrectAnswers.textContent = correctAnswersCounter.toString();


  // Calculate accuracy percentage
  let accuracyPercentage = 0;
  accuracyPercentage = (correctAnswersCounter / userAnswers.length) * 100;
  // Display accuracy percentage. If no answers, display 0%.
  if (!accuracyPercentage){
    totalAccuracy.textContent = '0%';
  } else {
  totalAccuracy.textContent = `${accuracyPercentage.toFixed(0)}%`;
  }
}

// BACK TO OVERALL RESULTS BUTTON FUNCTIONALITY
const backToResultsView = () => {
  quizWelcomeView.style.display = "flex";
  quizResultsMessage.style.display = "flex";
  quizResultsScreen.style.display = "flex";
  detailedResultsScreen.style.display = "none";
}

  // VIEWS 
  //Display maths question on screen 
  let questionIndex = 1;

  const displayQuestion = () => {
    // quizQuestionsCount.textContent = `Question ${questionIndex} / ${Object.keys(questions).length}`;
    quizQuestion.textContent = questions[`q${questionIndex.toString()}`].displayQuestion;
  }


  //RESULTS VIEWS

//////// Event Listeners ////////

// WELCOME SCREEN - Initialize
startQuizbutton.addEventListener('click', startQuizQuestions);

// QUIZ SCREEN - submit next button
//click mouse
answerButton.addEventListener('click', nextQuestion);
//press enter
window.addEventListener('keyup', function(e){
if (quizQuestionsView.style.display === 'flex'){
  if (e.key === 'Enter'){
  nextQuestion();
  }
}}
);

// OVERALL RESULTS SCREEN
//restart quiz button
restartQuizButton.addEventListener('click', startQuizQuestions);

//See detailed results 
seeDetailedResultsButton.addEventListener('click', seeDetailedQuizResults);


// Back to RESULTS SCREEN - back button
backToResultsButton.addEventListener('click', backToResultsView)



// =================== TIMER FUNCTIONALITY AND DISPLAY =======================

let FULL_DASH_ARRAY = 283;
let WARNING_THRESHOLD = 10;
let ALERT_THRESHOLD = 5;

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

const TIME_LIMIT = 3; //  <================================= CHANGE TIMER HERE

let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

const displayTime = () => {
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

  }


// Timer hits 0
function onTimesUp(message) {
  quizResultsMessage.style.display = 'block';
  clearInterval(timerInterval);
  quizResultsScreen.style.display = "flex";
  quizQuestionsView.style.display = "none";
  displayQuizResultsMessage(message);
  displayResults();

  //Reset variables
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  timerInterval = null;
  remainingPathColor = COLOR_CODES.info.color;
}

function startTimer() {
  displayTime();
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp(false);
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
