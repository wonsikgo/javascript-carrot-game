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

let playInterval = null;

playBtn.addEventListener("click", onPlay);

function onPlay() {
  isPlaying = !isPlaying;
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
        onGameOver();
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

    carrot.addEventListener("click", onPlusScore);
    bug.addEventListener("click", onGameOver);

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

function onPlusScore(e) {
  e.target.remove();
  scoreCount += 1;
  score.innerHTML = scoreCount;

  if (scoreCount === COUNT) {
    popup.classList.remove("hide");
    popupMessage.innerHTML = POPUP_CLEAR_MESSAGE;
    clearInterval(playInterval);
  }
}

function onGameOver() {
  popup.classList.remove("hide");
  popupMessage.innerHTML = POPUP_REPLAY_MESSAGE;
  clearInterval(playInterval);
}
