"use strict";

let isPlaying = false;
let isSetItem = false;
let playTime = 10;
let scoreCount = 0;

const COUNT = 5;
const POPUP_REPLAY_MESSAGE = "REPLAY?";
const POPUP_CLEAR_MESSAGE = "SUCCESS";

const playBtn = document.querySelector(".game-btn");
const playBtnIcon = document.querySelector(".play-icon");
const timer = document.querySelector(".game-timer");
const score = document.querySelector(".game-score");

const field = document.querySelector(".game-field");
const fieldWidth = field.getBoundingClientRect().width - 80;
const fieldHeight = field.getBoundingClientRect().height - 80;

const popup = document.querySelector(".pop-up");
const popupMessage = document.querySelector(".pop-up-message");
const refreshBtn = document.querySelector(".pop-up-refresh");

let playInterval = null;

playBtn.addEventListener("click", onPlayGame);
refreshBtn.addEventListener("click", onReStartGame);

const bgm = new Audio("./static/sound/bg.mp3");
const alertSound = new Audio("./static/sound/alert.wav");
const gameWinSound = new Audio("./static/sound/game_win.mp3");
const carrotPullSound = new Audio("./static/sound/carrot_pull.mp3");
const bugPullSound = new Audio("./static/sound/bug_pull.mp3");

function playBgmSound() {
  if (bgm.paused) {
    bgm.loop = false;
    bgm.currentTime = 0;
    bgm.play();
  }
}

function onPlayGame() {
  isPlaying = !isPlaying;

  playBgmSound();

  // 1. 플레이버튼 설정
  togglePlayBtnIcon();

  // 2. 타이머 설정
  setTimer();

  // 3. 당근, 벌레위치 설정
  setItems();
}

function togglePlayBtnIcon() {
  if (isPlaying) {
    playBtnIcon.classList.remove("fa-play");
    playBtnIcon.classList.add("fa-stop");
  } else {
    playBtnIcon.classList.remove("fa-stop");
    playBtnIcon.classList.add("fa-play");
  }
}

function setTimer() {
  timer.innerHTML = `0:${playTime}`;

  if (isPlaying) {
    playInterval = setInterval(() => {
      if (playTime !== 0) {
        playTime -= 1;
        timer.innerHTML = `0:${playTime}`;
      } else if (playTime === 0 && scoreCount !== COUNT) {
        gameOver();
      } else {
        clearInterval(playInterval);
      }
    }, 1000);
  } else {
    clearInterval(playInterval);
  }
}

function setItems() {
  if (isSetItem) return;

  for (let i = 0; i < COUNT; i++) {
    const carrot = createItem("./static/img/carrot.png");
    const bug = createItem("./static/img/bug.png");

    carrot.addEventListener("click", onClickCarrot);
    bug.addEventListener("click", onClickBug);

    field.appendChild(carrot);
    field.appendChild(bug);
  }

  isSetItem = true;
}

function createItem(src) {
  const item = document.createElement("img");
  item.src = src;
  return setPosition(item);
}

function setPosition(item) {
  const positionX = Math.random() * fieldWidth;
  const positionY = Math.random() * fieldHeight;

  item.style.left = `${positionX}px`;
  item.style.top = `${positionY}px`;

  return item;
}

function onClickCarrot(e) {
  playCarrotPullSound();
  plusScore(e);
}

function plusScore(e) {
  e.target.remove();

  scoreCount += 1;
  score.innerHTML = scoreCount;

  if (scoreCount === COUNT) {
    clearGame();
  }
}

function clearGame() {
  playGameWinSound();
  popup.classList.remove("hide");
  popupMessage.innerHTML = POPUP_CLEAR_MESSAGE;
  clearInterval(playInterval);
}

function onClickBug() {
  playBugPullSound();
  gameOver();
}

function gameOver() {
  playAlertSound();
  popup.classList.remove("hide");
  popupMessage.innerHTML = POPUP_REPLAY_MESSAGE;
  clearInterval(playInterval);
}

function onReStartGame() {
  popup.classList.add("hide");
  resetGame();
  togglePlayBtnIcon();
  setTimer();
  setItems();
}

function resetGame() {
  isPlaying = true;
  isSetItem = false;
  playTime = 10;
  scoreCount = 0;
  score.innerHTML = scoreCount;
  field.innerHTML = "";
}

function playAlertSound() {
  alertSound.currentTime = 0;
  alertSound.play();
}

function playGameWinSound() {
  gameWinSound.currentTime = 0;
  gameWinSound.play();
}

function playCarrotPullSound() {
  carrotPullSound.currentTime = 0;
  carrotPullSound.play();
}
function playBugPullSound() {
  bugPullSound.currentTime = 0;
  bugPullSound.play();
}
