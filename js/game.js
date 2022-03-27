class Game {
  constructor(count, playTime) {
    this.count = count;
    this.playTime = playTime;
    this.isPlaying = false;
    this.isSetItem = false;
    this.scoreCound = count;
    this.playInterval = null;
    createGameField();
    addEvent();
  }

  createGameField() {
    this.playBtn = document.querySelector(".game-btn");
    this.playBtnIcon = document.querySelector(".play-icon");
    this.timer = document.querySelector(".game-timer");
    this.score = document.querySelector(".game-score");
    this.field = document.querySelector(".game-field");
    this.fieldWidth = field.getBoundingClientRect().width - 80;
    this.fieldHeight = field.getBoundingClientRect().height - 80;
  }

  addEvent() {
    this.playBtn.addEventListener("click", onPlay);
  }

  onPlay() {
    initItems();
    if (this.isPlaying) {
      stop();
    } else {
      start();
    }

    this.isPlaying = !this.isPlaying;
  }

  start() {
    hidePlayButton();
    showField();
    setTimer();
  }

  stop() {
    showPlayButton();
    hideField();
    clearInterval(this.playInterval);
  }

  showPlayButton() {
    this.playBtnIcon.classList.remove("fa-stop");
    this.playBtnIcon.classList.add("fa-play");
  }

  hidePlayButton() {
    this.playBtnIcon.classList.remove("fa-play");
    this.playBtnIcon.classList.add("fa-stop");
  }

  showField() {
    this.field.style.visibility = "visible";
  }

  hideField() {
    this.field.style.visibility = "hidden";
  }

  setTimer() {
    this.timer.innerHTML = `0:${playTime}`;

    this.playInterval = setInterval(() => {
      if (this.playTime !== 0) {
        this.playTime -= 1;
        this.timer.innerHTML = `0:${playTime}`;
      } else if (this.playTime === 0 && this.scoreCount !== 0) {
        loseGame();
      } else {
        clearInterval(this.playInterval);
      }
    }, 1000);
  }
}
