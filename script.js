let userAnswers = [];

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hash Tag Modern Language"
    ],
    answer: 0
  },
  {
    question: "Which keyword creates a variable?",
    options: ["return", "let", "loop", "print"],
    answer: 1
  },
  {
    question: "What is an array?",
    options: [
      "A single value",
      "A loop",
      "A list of values",
      "A function"
    ],
    answer: 2
  },
  {
    question: "What does === mean in JavaScript?",
    options: ["equal", "exactly equal", "true", "false"],
    answer: 1
  },
  {
    question: "Which condition checks if a number is divisible by both 3 and 5?",
    options: [
      "num % 3 === 0 || num % 5 === 0",
      "num % 3 === 0 && num % 5 === 0",
      "num / 3 === 5",
      "num === 15"
    ],
    answer: 1
  }
];

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const progressText = document.getElementById("progress-text");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const reviewContainer = document.getElementById("review-container");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  let currentQuestion = quizQuestions[currentQuestionIndex];

  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add("option-btn");

    optionButton.addEventListener("click", () => selectOption(index));

    optionsContainer.appendChild(optionButton);

    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    nextButton.style.display = "none";
  });
}

function selectOption(selectedIndex) {
    userAnswers[currentQuestionIndex] = selectedIndex;


  let currentQuestion = quizQuestions[currentQuestionIndex];
  let correctIndex = currentQuestion.answer;

  const allButtons = optionsContainer.children;

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].disabled = true;
  }

  if (selectedIndex === correctIndex) {
    allButtons[selectedIndex].classList.add("correct");
    score++;
  } else {
    allButtons[selectedIndex].classList.add("incorrect");
    allButtons[correctIndex].classList.add("correct");

    }
    nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", function () {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");

  let message = "";

  if (score === quizQuestions.length) {
    message = "Perfect run 🔥";
  } else if (score >= 3) {
    message = "Strong work 💪";
  } else {
    message = "Keep going — you’re building skill every rep.";
  }

  scoreText.textContent = `You scored ${score} out of ${quizQuestions.length}. ${message}`;
  reviewContainer.innerHTML = "";

  quizQuestions.forEach((q, index) => {
    const userAnswer = userAnswers[index];
    const correctAnswer = q.answer;

    const reviewItem = document.createElement("div");

    reviewItem.innerHTML = `
    <p><strong>Q${index + 1};</strong> ${q.question}</p>
    <p>Your Answer: ${
        userAnswer !== undefined ? q.options[userAnswer] : "No answer"
    }</p>
    <p>Correct answer: ${q.options[correctAnswer]}</p>
    <hr>
    `;

    reviewContainer.appendChild(reviewItem);
  });
}

startButton.addEventListener("click", function () {
    quizQuestions.sort(() => Math.random() - 0.5);

    startScreen.classList.add("hidden"),
    quizContainer.classList.remove("hidden");

    loadQuestion();
});

restartButton.addEventListener("click", function () {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];

  scoreContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  loadQuestion();
});


