const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeElement = document.querySelector("#time");
const board = document.querySelector("#board");
const circle = document.querySelector(".circle");

//Variables
const colors = ["#72E2E6", "#68E840", "#E8E840", "#F13918", "#E718F1", "#A0A297"];
let time = 20;
let score = 0;

startBtn.addEventListener("click", (e) => {
  e.preventDefault(); //Отключим поведения по умолчанию
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.getAttribute("data-time"));
    startGame();
    screens[1].classList.add("up");
  }
});
board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let currentTime = --time;
    setTime(currentTime);
  }
}
function setTime(timeValue) {
  if (timeValue < 10) timeValue = `0${timeValue}`;
  timeElement.innerHTML = `00:${timeValue}`;
}
function finishGame() {
  timeElement.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;
}
function createRandomCircle() {
  const color = setRandomColor();
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.bottom = `${y}px`;
  circle.style.right = `${y}px`;
  circle.style.backgroundColor = color;
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function setRandomColor(){
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}