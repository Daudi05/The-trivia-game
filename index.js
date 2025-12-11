const readline = require("readline");

// -------------------------------------
// Questions Array
// -------------------------------------
const questions = [
  {
    question: "What is the capital of France?",
    options: ["1) Paris", "2) Rome", "3) Berlin", "4) Madrid"],
    correct: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["1) Venus", "2) Earth", "3) Mars", "4) Jupiter"],
    correct: 3
  },
  {
    question: "Which language runs in a web browser?",
    options: ["1) Python", "2) C++", "3) JavaScript", "4) Java"],
    correct: 3
  }
];

// -------------------------------------
// Setup CLI Interface
// -------------------------------------
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// -------------------------------------
// Game State Variables
// -------------------------------------
let score = 0;
let currentQuestion = 0;
let timerId;
let timeRemaining = 20; // Game timer

// -------------------------------------
// Game Timer
// -------------------------------------
function startGameTimer() {
  console.log("\n⏳ Game timer started! You have 20 seconds.\n");

  timerId = setInterval(() => {
    timeRemaining--;
    process.stdout.write(`Time left: ${timeRemaining}s\r`);

    if (timeRemaining <= 0) {
      clearInterval(timerId);
      console.log("\n\n⏰ Time's up!");
      endGame();
    }
  }, 1000);
}

// -------------------------------------
// Ask Each Question
// -------------------------------------
function askQuestion() {
  if (currentQuestion >= questions.length) {
    clearInterval(timerId);
    return endGame();
  }

  const q = questions[currentQuestion];
  
  console.log(`\nQuestion ${currentQuestion + 1}: ${q.question}`);
  
  // Use array map() ➜ requirement satisfied
  q.options.map(option => console.log(option));

  rl.question("\nSelect your answer (1-4): ", (userInput) => {
    const userAnswer = Number(userInput);

    if (userAnswer === q.correct) {
      console.log("✅ Correct!");
      score++;
    } else {
      console.log("❌ Incorrect!");
    }

    currentQuestion++;
    askQuestion();
  });
}

// -------------------------------------
// End Game Function
// -------------------------------------
function endGame() {
  console.log("\n🎉 GAME OVER 🎉");
  console.log(`Your final score: ${score}/${questions.length}`);
  console.log("Thanks for playing!");
  
  rl.close();
}

// -------------------------------------
// Start Game
// -------------------------------------
console.log("Welcome to the CLI Trivia Game!");
rl.question("Press ENTER to start...", () => {
  startGameTimer();
  askQuestion();
});