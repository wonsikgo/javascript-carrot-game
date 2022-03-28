"use strict";

class Item {
  constructor(count) {
    this.field = document.querySelector(".game-field");
    this.fieldRect = field.getBoundingClientRect();
    this.count = count;
  }

  init() {
    score.innerHTML = scoreCount;

    for (let i = 0; i < this.count; i++) {
      const carrot = create("./static/img/carrot.png");
      const bug = create("./static/img/bug.png");

      carrot.addEventListener("click", onClickCarrot);
      bug.addEventListener("click", onClickBug);

      this.field.appendChild(carrot);
      this.field.appendChild(bug);
    }
  }

  create() {
    const item = document.createElement("img");
    item.src = src;
    return setPosition(item);
  }

  setPosition(item) {
    const positionX = Math.random() * this.fieldRect.width - 80;
    const positionY = Math.random() * this.fieldRect.height - 80;

    item.style.left = `${positionX}px`;
    item.style.top = `${positionY}px`;

    return item;
  }

  onClickCarrot(e) {
    e.target.remove();
    // playSound(carrotPullSound);
    updateScore();
  }

  updateScore() {
    scoreCount -= 1;
    score.innerHTML = scoreCount;

    if (scoreCount === 0) {
      clearGame();
    }
  }

  clearGame() {
    // playSound(gameWinSound);
    clearInterval(playInterval);
    // gameBanner.show(POPUP_CLEAR_MESSAGE);
  }

  onClickBug() {
    // playSound(bugPullSound);
    loseGame();
  }

  loseGame() {
    // playSound(gameLoseSound);
    // gameBanner.show(POPUP_REPLAY_MESSAGE);
    clearInterval(playInterval);
  }
}
