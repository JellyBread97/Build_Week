// function to move to benchmark quiz from welcome
//comment
const welcomePage = document.querySelector(".welcome-page")
const benchmarkPage = document.querySelector(".benchmark-page")

function showWelcomePage() {
  welcomePage.classList.remove("hidden")
  benchmarkPage.classList.add("hidden")
}

showWelcomePage()

function hideWelcomePage() {
  welcomePage.classList.add("hidden")
  benchmarkPage.classList.remove("hidden")
}

function proceed() {
  scoreUpElement.textContent = 0
  let checkbox = document.getElementById("checkbox")
  let proceed = document.getElementById("button")
  proceed.addEventListener("click", function () {
    if (checkbox.checked === false) {
      alert("You have to promise first!")
    } else if (checkbox.checked === true) {
      hideWelcomePage()
    }
  })
}

window.onload = function () {
  proceed()
}

// javascript for the benchmark quiz

const questions = [
  {
    question: "How can I create a checkbox in HTML?",
    answers: [
      { text: '<input type = "check">', correct: false },
      { text: '<input type = "checkbox">', correct: true },
      { text: '<checkbox">', correct: false },
      { text: '<input type = "button">', correct: false }
    ]
  },
  {
    question:
      "Which built-in method returns the calling string value converted to lower case?",
    answers: [
      { text: "toLowerCase()", correct: true },
      { text: "toLower()", correct: false },
      { text: "changeCase(case)", correct: false },
      { text: "None of the above.", correct: false }
    ]
  },
  {
    question: "The DOM presents an HTML document as a ...",
    answers: [
      { text: "Dynamic Object Model", correct: false },
      { text: "Document Object Model", correct: true },
      { text: "Distributed Object Model", correct: false },
      { text: "Document Oriented Model", correct: false }
    ]
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    answers: [
      { text: "<br>", correct: true },
      { text: "<lb>", correct: false },
      { text: "<break>", correct: false },
      { text: "<div>", correct: false }
    ]
  },
  {
    question: "JavaScript is open-source and cross platform",
    answers: [
      { text: " True", correct: true },
      { text: "False", correct: false }
    ]
  },
  {
    question: "CSS is short for ...",
    answers: [
      { text: "Color and Style Sheets", correct: false },
      { text: "Cascading Special Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Color Style Sheet", correct: false }
    ]
  },
  {
    question: "How can we select an element with a specific ID in CSS?",
    answers: [
      { text: "//", correct: false },
      { text: "=", correct: false },
      { text: ".", correct: false },

      { text: "#", correct: true }
    ]
  }
]

const questionContainer = document.getElementById("benchmarkContainer")
const questionElement = document.getElementById("question")
const questionNumberElement = document.getElementById("questionNumber")
const answerButton = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-button")
const finishButton = document.querySelector("#finish-button")
const scores = document.getElementById("scores")
const scoreUpElement = document.getElementById("score-up")
const scoreUp = parseInt(scoreUpElement.textContent, 0)
const percentageDiv = document.getElementById("percentage-score")
const percentageWrongElement = document.getElementById("wrong-percentage-score")
const wrongScoreElement = document.getElementById("wrong-score")
const reviewButton = document.getElementById("review-button")
const reviewPageElement = document.querySelector(".review-page")

let randomQuestion, currentQuestionIndex, selectedButton

nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  setNextQuestion()
  changeQuestionNumber()
})

function startBenchmark() {
  randomQuestion = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  scoreUpElement.textContent = 0 // score starts from zero
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(randomQuestion[currentQuestionIndex])
  changeQuestionNumber()
}
// shows the next question
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach((answer) => {
    // for each option in the answer array
    const button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    answerButton.appendChild(button) // adds button to parent
  })
}
// removes previous answer buttons
function resetState() {
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  selectedButton.classList.add("selected-answer")
  const userAnswer = selectedButton.value
  const correct = selectedButton.dataset.correct
  processResults(correct)
  // console.log(processResults(correct))
  // console.log(selectedButton)
  const answerOptions = answerButton.children
  // const answerOptionsArray = Array.from(answerOptions).forEach((button) => {
  //   checks if the answer is correct or wrong
  //   setStatusClass(button, button.dataset.correct)
  // })
  if (randomQuestion.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hidden")
  } else {
    const scoreUp = parseInt(scoreUpElement.textContent, 0)
    finishButton.classList.remove("hidden") // shows the finish button when we run out of questions
    nextButton.classList.add("hidden")
  }

  console.log(answerOptionsArray)
}

function processResults(isCorrect) {
  if (!isCorrect) {
    return
  }
  const scoreUp = parseInt(scoreUpElement.textContent, 0)
  scoreUpElement.textContent =
    scoreUp + 1 + " / " + questions.length + " questions "
}

// changes colour based on whether answer is correct or wrong
// function setStatusClass(element, correct) {
//   clearStatusClass(element)
//   if (correct) {
//     element.classList.add("correct")
//   } else {
//     element.classList.add("wrong")
//   }
// }
// function clearStatusClass(element) {
//   element.classList.remove("wrong")
//   element.classList.remove("correct")
// }
function changeQuestionNumber() {
  let numberOfQuestions = questions.length
  let currentQuestionNumber = currentQuestionIndex + 1
  questionNumberElement.innerHTML = `Question ${currentQuestionNumber} / ${numberOfQuestions}`
}

nextButton.addEventListener("click", hideNextButton)
function hideNextButton() {
  nextButton.classList.add("hidden")
}

startBenchmark()

// calculate result

// code for timer

const FULL_DASH_ARRAY = 283
const WARNING_THRESHOLD = 10
const ALERT_THRESHOLD = 5
const TIME_UP = 0

const COLOR_CODES = {
  info: {
    color: "purple"
  },
  warning: {
    color: "turquoise",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
}

const TIME_LIMIT = 15
let timePassed = 0
let timeLeft = TIME_LIMIT
let timerInterval = null
let remainingPathColor = COLOR_CODES.info.color

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
  <span id="base-timer-label" class="base-timer__label">
  <span>TIME</span>
  ${formatTime(timeLeft)}
  <span>REMAINING</span>
  </span>
</div>
`

startTimer()

function onTimesUp() {
  clearInterval(timerInterval)
}

function nextQuestionTimerFinished() {}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1
    timeLeft = TIME_LIMIT - timePassed
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft)
    setCircleDasharray()
    setRemainingPathColor(timeLeft)

    if (timeLeft === 0) {
      onTimesUp()
    }
  }, 1000)
}

function formatTime(time) {
  const minutes = Math.floor(time / 60)
  let seconds = time % 60

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${seconds}`
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color)
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color)
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color)
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color)
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction)
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray)
}

// function timeIsUp() {
//   if (timeLeft === alert.threshold)
// }
// onTimesUp()
function stopTimer() {}

// show review page

const showReview = document.querySelector(".review-page")
const showResults = document.querySelector(".results-page")
const timerElement = document.querySelector(".timer-container")
const chartContainerElement = document.querySelector(".chart-container")
const passStatus = document.getElementById("congrats")
const passStatusText = document.getElementById("passed")
const passStatusParagraph = document.getElementById("email-notif")
const failStatus = document.getElementById("benchmark-failed")

// finishButton.addEventListener("click", finishBenchmark)
// makes finish button appear
// function to make results page show

finishButton.onclick = function () {
  console.log("finished")
  benchmarkPage.classList.add("hidden")
  showResults.classList.remove("hidden")
  reviewButton.classList.remove("hidden")
  chartContainerElement.classList.remove("hidden")

  let finalPercentageCorrect =
    (parseInt(scoreUpElement.textContent, 0) / questions.length) * 100
  percentageDiv.innerHTML = finalPercentageCorrect.toFixed(1) + "%"

  let finalPercentageWrong = 100 - finalPercentageCorrect
  percentageWrongElement.innerHTML = finalPercentageWrong.toFixed(1) + "%"
  let correctScore = parseInt(scoreUpElement.textContent, 0)
  scoreUp.innerHTML = correctScore + " / " + questions.length + " questions "
  let wrongScore = questions.length - correctScore

  wrongScoreElement.innerHTML =
    wrongScore + " / " + questions.length + " questions "

  //chart inner text
  if (finalPercentageCorrect > finalPercentageWrong) {
    passStatus.innerText = "Congratulations!"
    passStatusText.innerText = " You passed the exam."
    passStatusParagraph.innerText =
      "We'll send you the certificate in a few minutes. Check your email (including promotions / spam folder)"
  } else {
    failStatus.innerText = "Oh no! Unfortunately you didn't pass this one."
  }

  // results chart
  let resultsChart = document.getElementById("scoreChart").getContext("2d")

  let finalResultsChart = new Chart(resultsChart, {
    type: "doughnut",
    data: {
      // labels: ["wrong", "correct"],
      datasets: [
        {
          label: "The summary of your answers",
          data: [wrongScore, correctScore],

          backgroundColor: [" #c2128d", "#41ffff"]
        }
      ]
    },
    options: {
      cutoutPercentage: 70,
      tooltips: { enabled: false },
      hover: { mode: null },
      elements: {
        arc: {
          borderWidth: 0 // <-- Set this to derired value
        }
      },
      centerText: {
        display: true,
        text: "280"
      }
    }
  })
}

// let finishBenchmark = function () {
// questionContainer.classList.add("hidden")
// questionNumberElement.classList.add("hidden")
// }

// results page

// functionality for review page

reviewButton.onclick = function () {
  showResults.classList.add("hidden")
  reviewPageElement.classList.remove("hidden")
  showReview.classList.remove("hidden")
}

const star1 = document.querySelector(".star1")
const star2 = document.querySelector(".star2")
const star3 = document.querySelector(".star3")
const star4 = document.querySelector(".star4")
const star5 = document.querySelector(".star5")
const star6 = document.querySelector(".star6")
const star7 = document.querySelector(".star7")
const star8 = document.querySelector(".star8")
const star9 = document.querySelector(".star9")
const star10 = document.querySelector(".star10")

function stars1() {
  star1.style.color = "#41ffff"
  star2.style.color = "#561E6E"
  star3.style.color = "#561E6E"
  star4.style.color = "#561E6E"
  star5.style.color = "#561E6E"
  star6.style.color = "#561E6E"
  star7.style.color = "#561E6E"
  star8.style.color = "#561E6E"
  star9.style.color = "#561E6E"
  star10.style.color = "#561E6E"
}
function stars2() {
  star1.style.color = "#41ffff"
  star2.style.color = "#41ffff"
  star3.style.color = "#561E6E"
  star4.style.color = "#561E6E"
  star5.style.color = "#561E6E"
  star6.style.color = "#561E6E"
  star7.style.color = "#561E6E"
  star8.style.color = "#561E6E"
  star9.style.color = "#561E6E"
  star10.style.color = "#561E6E"
}
function stars3() {
  star1.style.color = "#41ffff"
  star2.style.color = "#41ffff"
  star3.style.color = "#41ffff"
  star4.style.color = "#561E6E"
  star5.style.color = "#561E6E"
  star6.style.color = "#561E6E"
  star7.style.color = "#561E6E"
  star8.style.color = "#561E6E"
  star9.style.color = "#561E6E"
  star10.style.color = "#561E6E"
}
function stars4() {
  star1.style.color = "#41ffff"
  star2.style.color = "#41ffff"
  star3.style.color = "#41ffff"
  star4.style.color = "#41ffff"
  star5.style.color = "#561E6E"
  star6.style.color = "#561E6E"
  star7.style.color = "#561E6E"
  star8.style.color = "#561E6E"
  star9.style.color = "#561E6E"
  star10.style.color = "#561E6E"
}
function stars5() {
  star1.style.color = "#41ffff"
  star2.style.color = "#41ffff"
  star3.style.color = "#41ffff"
  star4.style.color = "#41ffff"
  star5.style.color = "#41ffff"
  star6.style.color = "#561E6E"
  star7.style.color = "#561E6E"
  star8.style.color = "#561E6E"
  star9.style.color = "#561E6E"
  star10.style.color = "#561E6E"
}
function stars6() {
  star1.style.color = "#41ffff"
  star2.style.color = "#41ffff"
  star3.style.color = "#41ffff"
  star4.style.color = "#41ffff"
  star5.style.color = "#41ffff"
  star6.style.color = "#41ffff"
  star7.style.color = "#561E6E"
  star8.style.color = "#561E6E"
  star9.style.color = "#561E6E"
  star10.style.color = "#561E6E"
}
function stars7() {
  star1.style.color = "#41ffff"
  star2.style.color = "#41ffff"
  star3.style.color = "#41ffff"
  star4.style.color = "#41ffff"
  star5.style.color = "#41ffff"
  star6.style.color = "#41ffff"
  star7.style.color = "#41ffff"
  star8.style.color = "#561E6E"
  star9.style.color = "#561E6E"
  star10.style.color = "#561E6E"
}
function stars8() {
  star1.style.color = "#41ffff"
  star2.style.color = "#41ffff"
  star3.style.color = "#41ffff"
  star4.style.color = "#41ffff"
  star5.style.color = "#41ffff"
  star6.style.color = "#41ffff"
  star7.style.color = "#41ffff"
  star8.style.color = "#41ffff"
  star9.style.color = "#561E6E"
  star10.style.color = "#561E6E"
}
function stars9() {
  star1.style.color = "#41ffff"
  star2.style.color = "#41ffff"
  star3.style.color = "#41ffff"
  star4.style.color = "#41ffff"
  star5.style.color = "#41ffff"
  star6.style.color = "#41ffff"
  star7.style.color = "#41ffff"
  star8.style.color = "#41ffff"
  star9.style.color = "#41ffff"
  star10.style.color = "#561E6E"
}
function stars10() {
  star1.style.color = "#41ffff"
  star2.style.color = "#41ffff"
  star3.style.color = "#41ffff"
  star4.style.color = "#41ffff"
  star5.style.color = "#41ffff"
  star6.style.color = "#41ffff"
  star7.style.color = "#41ffff"
  star8.style.color = "#41ffff"
  star9.style.color = "#41ffff"
  star10.style.color = "#41ffff"
}
