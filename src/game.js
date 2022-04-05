"use strict";

import * as sound from "./sound.js";
import Item from "./item.js";

export default class Game {
  constructor(count, playTime) {
    this.count = count;
    this.playTime = playTime;
    this.isPlaying = false;
    this.isSetItem = false;
    this.scoreCount = count;
    this.playInterval = null;
    this.playBtn = document.querySelector(".game-btn");
    this.playBtnIcon = document.querySelector(".play-icon");
    this.timer = document.querySelector(".game-timer");
    this.score = document.querySelector(".game-score");
    this.playBtn.addEventListener("click", this.onPlay);
    this.item = new Item(10, this.onClickCarrot, this.onClickBug);
  }

  onPlay() {
    this.initItems();
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }

    this.isPlaying = !this.isPlaying;
  }

  start() {
    this.hidePlayButton();
    this.setTimer();
    this.item.show();
  }

  stop() {
    this.showPlayButton();
    this.item.hide();
    clearInterval(this.playInterval);
  }

  setBannerHandler(bannerHandler) {
    this.bannerHandler = bannerHandler;
  }

  showPlayButton() {
    this.playBtnIcon.classList.remove("fa-stop");
    this.playBtnIcon.classList.add("fa-play");
  }

  hidePlayButton() {
    this.playBtnIcon.classList.remove("fa-play");
    this.playBtnIcon.classList.add("fa-stop");
  }

  setTimer() {
    this.timer.innerHTML = `0:${this.playTime}`;

    this.playInterval = setInterval(() => {
      if (this.playTime !== 0) {
        this.playTime -= 1;
        this.timer.innerHTML = `0:${this.playTime}`;
      } else if (this.playTime === 0 && this.scoreCount !== 0) {
        loseGame();
      } else {
        clearInterval(this.playInterval);
      }
    }, 1000);
  }

  initItems() {
    if (this.isSetItem) return;

    this.score.innerHTML = this.scoreCount;
    this.item.init();
    this.isSetItem = true;
  }

  onClickCarrot(e) {
    e.target.remove();
    sound.playCarrotPull();
    this.updateScore();
  }

  updateScore() {
    this.scoreCount -= 1;
    this.score.innerHTML = this.scoreCount;

    if (this.scoreCount === 0) {
      this.clearGame();
    }
  }

  clearGame() {
    sound.playGameWin();
    clearInterval(playInterval);
    // gameBanner.show(POPUP_CLEAR_MESSAGE);
    this.bannerHandler("clear");
  }

  onClickBug() {
    sound.playBugPull();
    this.loseGame();
  }

  loseGame() {
    sound.playGameLose();
    // gameBanner.show(POPUP_REPLAY_MESSAGE);
    this.bannerHandler("lose");
    clearInterval(playInterval);
  }

  onReStartGame() {
    // gameBanner.hide(POPUP_CLEAR_MESSAGE);
    this.bannerHandler("restart");
    this.resetGame();
    this.initItems();
    this.hidePlayBtnIcon();
    this.setTimer();
  }

  resetGame() {
    this.isPlaying = true;
    this.isSetItem = false;
    this.playTime = 10;
    this.scoreCount = COUNT;
    this.score.innerHTML = this.scoreCount;
    this.item.reset();
  }
}
