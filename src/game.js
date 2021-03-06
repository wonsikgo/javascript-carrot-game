"use strict";

import * as sound from "./sound.js";
import Item from "./item.js";

const LEVEL = "Level";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  restart: "restart",
});

export class GameBuilder {
  gamePlayTime(playTime) {
    this.playTime = playTime;
    return this;
  }

  gameItemCount(count) {
    this.count = count;
    return this;
  }

  gameLevel(level) {
    this.level = level;
    return this;
  }

  build() {
    return new Game(this.count, this.playTime, this.level);
  }
}

class Game {
  constructor(count, playTime, level) {
    this.initCount = count;
    this.initPlayTime = playTime;
    this.count = count;
    this.playTime = playTime;
    this.level = level;

    this.isPlaying = false;
    this.isSetItem = false;
    this.scoreCount = count;
    this.totalScore = 0;
    this.playInterval = null;

    this.playBtn = document.querySelector(".game-btn");
    this.playBtnIcon = document.querySelector(".play-icon");
    this.timer = document.querySelector(".game-timer");
    this.score = document.querySelector(".game-score");
    this.levelField = document.querySelector(".game-level");

    this.playBtn.addEventListener("click", this.onPlay);

    this.item = new Item(this.onClickCarrot, this.onClickBug);
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
    this.changeLevelField();
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

  changeLevelField() {
    this.levelField.innerHTML = `${LEVEL} ${this.level}`;
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
    this.item.init(this.count);
    this.isSetItem = true;
  }

  onClickCarrot = (e) => {
    e.target.remove();
    sound.playCarrotPull();
    this.updateScore();
  };

  updateScore() {
    this.scoreCount -= 1;
    this.totalScore++;
    this.score.innerHTML = this.scoreCount;

    if (this.scoreCount === 0) {
      this.clearGame();
    }
  }

  clearGame() {
    const message = `${LEVEL} ${this.level} Clear ????`;
    this.bannerHandler(Reason.win, message);
    sound.playGameWin();
    clearInterval(this.playInterval);
    this.item.stopMove();
    this.level++;
  }

  onClickBug = () => {
    sound.playBugPull();
    this.loseGame();
  };

  loseGame() {
    const message = `Total : ${this.totalScore} ????`;
    this.bannerHandler(Reason.lose, message);
    sound.playGameLose();
    clearInterval(this.playInterval);
    this.item.stopMove();
    this.level = 1;
  }

  onRestart = () => {
    this.bannerHandler(Reason.restart);
    this.reset();
    this.onPlay();
  };

  reset() {
    if (this.level === 1) {
      this.totalScore = 0;
      this.count = this.initCount;
    } else {
      this.count += this.level;
    }

    this.playTime = this.initPlayTime;
    this.scoreCount = this.count;
    this.score.innerHTML = this.scoreCount;

    this.isPlaying = false;
    this.isSetItem = false;

    this.item.reset();
  }
}
