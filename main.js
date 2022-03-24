"use strict";

let isPlaying = false;
let playTime = 10;

const COUNT = 5;

const playBtn = document.querySelector(".game-btn");
const playBtnIcon = document.querySelector(".play-icon");
const timer = document.querySelector(".game-timer");

const field = document.querySelector(".game-field");
const fieldWidth = field.getBoundingClientRect().width - 80;
const fieldHeight = field.getBoundingClientRect().height - 80;

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
  const playInterval = setInterval(() => {
    if (playTime !== 0 && isPlaying) {
      playTime -= 1;
      timer.innerHTML = `0:${playTime}`;
    } else {
      clearInterval(playInterval);
    }
  }, 1000);
}

function setItems() {
  for (let i = 0; i < COUNT; i++) {
    const carrot = createItem("./static/img/carrot.png");
    const bug = createBug("./static/img/bug.png");

    field.appendChild(carrot);
    field.appendChild(bug);
  }
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
