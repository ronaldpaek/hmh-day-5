let name = null;

while (name === null || name.trim() === "") {
  name = prompt(`What's your name? ( ͡👁️ ͜ʖ ͡👁️)`);
  if (name === null || name.trim() === "") {
    alert("Please enter your name!");
  } else {
    break; // Exit the loop if a valid name is entered
  }
}

name = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
const h1 = (document.getElementById(
  "h1"
).textContent = `${name}, are you a human or a robot?`);
const captchaContainer = document.getElementById("captcha-container");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const countdownSound = document.getElementById("countdown-sound");

const captchaPrompts = [
  "Type the number five: ",
  "Type the word 'cat' in any casing: ",
  "What's the first letter of 'apple'?",
  "What's 7 + 3?",
  "How many fish are there?: 𓆝 𓆟 𓆞 𓆝",
];

const correctAnswers = ["5", "cat", "a", "10", "4"];

let currentQuestion = 0;
let challengeInterval;

const startChallenge = () => {
  countdownSound.currentTime = 0;
  countdownSound.play();
  let timer = 9;
  yesButton.style.display = "none";
  noButton.style.display = "none";

  const questionElement = document.createElement("h2");
  captchaContainer.appendChild(questionElement);

  const inputElement = document.createElement("input");
  captchaContainer.appendChild(inputElement);

  const timerElement = document.createElement("p");
  timerElement.className = "timer-text";
  captchaContainer.appendChild(timerElement);

  const nextQuestion = () => {
    if (currentQuestion >= captchaPrompts.length) {
      captchaContainer.innerHTML = "<h1>You passed the challenge!</h1>";
      const loginButton = document.createElement("button");
      loginButton.className = "login-button";
      loginButton.textContent = "Login";
      loginButton.onclick = () => {
        location.reload();
      };
      captchaContainer.appendChild(loginButton);
      clearInterval(challengeInterval);

      return;
    }

    questionElement.textContent = captchaPrompts[currentQuestion];
    inputElement.value = "";
    inputElement.focus();
  };

  inputElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (
        inputElement.value.toLowerCase() === correctAnswers[currentQuestion]
      ) {
        currentQuestion++;
        nextQuestion();
      } else {
        captchaContainer.innerHTML = "<h1>Try again, robot!</h1>";
        setTimeout(redirectRobotPage, 1000);
      }
    }
  });

  nextQuestion();

  challengeInterval = setInterval(() => {
    timerElement.textContent = `Time remaining: ${timer} seconds`;

    setTimeout(() => {
      timer--;
    }, 1000);

    if (timer <= 0) {
      captchaContainer.innerHTML = "<h1>Time is up! Try again!</h1>";
      clearInterval(challengeInterval);
      redirectRobotPage();
    }
  }, 900);
};

const redirectRobotPage = () => {
  window.location.href = "robot-jail.html";
};

yesButton.addEventListener("click", startChallenge);
noButton.addEventListener("click", redirectRobotPage);
