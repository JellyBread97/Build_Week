// function to move to benchmark quiz from welcome page
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
      { text: "<br>", correct: false },
      { text: "<lb>", correct: false },
      { text: "<break>", correct: true },
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
const finishButton = document.getElementById("finish-button")

let randomQuestion, currentQuestionIndex

nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  setNextQuestion()
  changeQuestionNumber()
})

function startBenchmark() {
  randomQuestion = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
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
  const correct = selectedButton.dataset.correct
  Array.from(answerButton.children).forEach((button) => {
    // checks if the answer is correct or wrond
    setStatusClass(button, button.dataset.correct)
  })
  if (randomQuestion.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hidden")
  } else {
    finishButton.classList.remove("hidden") // shows the finish button when we run out of questions
    nextButton.classList.add("hidden")
  }
}
// changes colour based on whether answer is correct or wrong
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
  }
}
function clearStatusClass(element) {
  element.classList.remove("wrong")
  element.classList.remove("correct")
}
function changeQuestionNumber() {
  let numberOfQuestions = questions.length
  let currentQuestionNumber = currentQuestionIndex + 1
  questionNumberElement.innerHTML = `Question ${currentQuestionNumber} of ${numberOfQuestions}`
}

nextButton.addEventListener("click", hideNextButton)
function hideNextButton() {
  nextButton.classList.add("hidden")
}

startBenchmark()

// code for timer
const semicircles = document.querySelectorAll(".semicircle")
const timer = document.querySelector(".timer")
const secondsDisplay = document.querySelector("#secondsRemaining")
//input

const hr = 0
const min = 0
const sec = 10

const hours = hr * 3600000
const minutes = min * 60000
const seconds = sec * 1000
const setTime = hours + minutes + seconds
const startTime = Date.now()
const futureTime = startTime + setTime

const timerLoop = setInterval(countDownTimer)
countDownTimer()

function countDownTimer() {
  const currrentTime = Date.now()
  const remainingTime = futureTime - currrentTime
  const angle = (remainingTime / setTime) * 360
  // progress indicator
  if (angle > 180) {
    semicircles[2].style.display = "none"
    semicircles[0].style.transform = "rotate(-180deg)"
    semicircles[1].style.transform = `rotate(${angle}deg)`
  } else {
    {
      semicircles[2].style.display = "block"
      semicircles[0].style.transform = `rotate(${angle}deg)`
      semicircles[1].style.transform = `rotate(${angle}deg)`
    }
  }

  // 5 sec condition

  if (remainingTime <= 6000) {
    semicircles[0].style.backgroundColor = "red"
    semicircles[1].style.backgroundColor = "red"
    // semicircles[2].style.display = "block"
    secondsDisplay.style.color = "red"
  }

  //timer

  const hrs = Math.floor(
    (remainingTime / (1000 * 60 * 60)) % 24
  ).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
  const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString(
    "en-US",
    { minimumIntegerDigits: 2, useGrouping: false }
  )
  const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  })

  secondsDisplay.innerHTML = `
      <div>${secs}</div>
   `
  //end
  if (remainingTime < 0) {
    clearInterval(timerLoop)
    semicircles[0].style.display = "none"
    semicircles[1].style.display = "none"
    semicircles[2].style.display = "none"

    secondsDisplay.innerHTML = `
    <div>00</div>`
    secondsDisplay.style.color = "lightgray"
  }
}

function stopTimer() {}

finishButton.addEventListener("click", finishBenchmark)
// makes finish button appear
function finishBenchmark() {
  questionContainer.classList.add("hidden")
  questionNumberElement.classList.add("hidden")
  finishButton.classList.add("hidden")
}

// functionality for review page

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
  star2.style.color = "##41ffff"
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
  star5.style.color = "##561E6E"
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
