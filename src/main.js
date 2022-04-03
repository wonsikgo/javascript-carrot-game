"use strict";

import Popup from "./popup.js";
import * as sound from "./sound.js";
import Item from "./item.js";

const COUNT = 10;
const POPUP_REPLAY_MESSAGE = "REPLAY?";
const POPUP_CLEAR_MESSAGE = "SUCCESS";

let isPlaying = false;
let isSetItem = false;
let playTime = 10;
let scoreCount = COUNT;

const playBtn = document.querySelector(".game-btn");
const playBtnIcon = document.querySelector(".play-icon");
const timer = document.querySelector(".game-timer");
const score = document.querySelector(".game-score");

const field = document.querySelector(".game-field");
const fieldWidth = field.getBoundingClientRect().width - 80;
const fieldHeight = field.getBoundingClientRect().height - 80;

let playInterval = null;

playBtn.addEventListener("click", onPlayGame);

const gameBanner = new Popup();
gameBanner.setEventListener(onReStartGame);

const item = new Item(COUNT, onClickCarrot, onClickBug);

function onPlayGame() {
  initItems();

  if (isPlaying) {
    stopGame();
  } else {
    startGame();
  }

  isPlaying = !isPlaying;
}

function startGame() {
  hidePlayBtnIcon();
  showField();
  sound.playBgm();
  setTimer();
}

function stopGame() {
  showPlayBtnIcon();
  hideField();
  sound.stopBgm();
  clearInterval(playInterval);
}

function showPlayBtnIcon() {
  playBtnIcon.classList.remove("fa-stop");
  playBtnIcon.classList.add("fa-play");
}

function hidePlayBtnIcon() {
  playBtnIcon.classList.remove("fa-play");
  playBtnIcon.classList.add("fa-stop");
}

function showField() {
  field.style.visibility = "visible";
}

function hideField() {
  field.style.visibility = "hidden";
}

function setTimer() {
  timer.innerHTML = `0:${playTime}`;

  playInterval = setInterval(() => {
    if (playTime !== 0) {
      playTime -= 1;
      timer.innerHTML = `0:${playTime}`;
    } else if (playTime === 0 && scoreCount !== 0) {
      loseGame();
    } else {
      clearInterval(playInterval);
    }
  }, 1000);
}

function initItems() {
  if (isSetItem) return;

  score.innerHTML = scoreCount;
  item.init();
  isSetItem = true;
}

function onClickCarrot(e) {
  e.target.remove();
  sound.playCarrotPull();
  updateScore();
}

function updateScore() {
  scoreCount -= 1;
  score.innerHTML = scoreCount;

  if (scoreCount === 0) {
    clearGame();
  }
}

function clearGame() {
  sound.playGameWin();
  clearInterval(playInterval);
  gameBanner.show(POPUP_CLEAR_MESSAGE);
}

function onClickBug() {
  sound.playBugPull();
  loseGame();
}

function loseGame() {
  sound.playGameLose();
  gameBanner.show(POPUP_REPLAY_MESSAGE);
  clearInterval(playInterval);
}

function onReStartGame() {
  gameBanner.hide(POPUP_CLEAR_MESSAGE);
  resetGame();
  initItems();
  hidePlayBtnIcon();
  setTimer();
}

function resetGame() {
  isPlaying = true;
  isSetItem = false;
  playTime = 10;
  scoreCount = COUNT;
  score.innerHTML = scoreCount;
  field.innerHTML = "";
}
