"use strict";

import * as sound from "./sound.js";
import Item from "./item.js";

export default class GameBuilder {
  gamePlayTime(playTime) {
    this.playTime = playTime;
    return this;
  }

  gameItemCount(count) {
    this.count = count;
    return this;
  }

  build() {
    return new Game(this.count, this.playTime);
  }
}

class Game {
  constructor(count, playTime) {
    this.initCount = count;
    this.initPlayTime = playTime;
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

  onPlay = () => {
    this.initItems();
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }

    this.isPlaying = !this.isPlaying;
  };

  start() {
    this.item.show();
    sound.playBgm();
    this.hidePlayButton();
    this.setTimer();
  }

  stop() {
    this.item.hide();
    sound.stopBgm();
    this.showPlayButton();
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
        this.loseGame();
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

  onClickCarrot = (e) => {
    e.target.remove();
    sound.playCarrotPull();
    this.updateScore();
  };

  updateScore() {
    this.scoreCount -= 1;
    this.score.innerHTML = this.scoreCount;

    if (this.scoreCount === 0) {
      this.clearGame();
    }
  }

  clearGame() {
    sound.playGameWin();
    clearInterval(this.playInterval);
    this.bannerHandler("clear");
  }

  onClickBug = () => {
    sound.playBugPull();
    this.loseGame();
  };

  loseGame() {
    sound.playGameLose();
    this.bannerHandler("lose");
    clearInterval(this.playInterval);
  }

  onReStartGame = () => {
    this.resetGame();
    this.initItems();
    this.hidePlayButton();
    this.setTimer();
    this.bannerHandler("restart");
  };

  resetGame() {
    this.isPlaying = true;
    this.isSetItem = false;
    this.playTime = this.initPlayTime;
    this.scoreCount = this.initCount;
    this.item.reset();
  }
}
