"use strict";

const ITEM_SIZE = 80;

export default class Item {
  constructor(handleCarrot, handleBug) {
    this.field = document.querySelector(".game-field");
    this.fieldWidth = this.field.getBoundingClientRect().width - ITEM_SIZE;
    this.fieldHeigth = this.field.getBoundingClientRect().height - ITEM_SIZE;

    this.handleCarrot = handleCarrot;
    this.handleBug = handleBug;
    this.intervals = [];
  }

  init(count) {
    for (let i = 0; i < count; i++) {
      const carrot = this.create("./static/img/carrot.png");
      const bug = this.create("./static/img/bug.png");

      carrot.addEventListener("click", this.handleCarrot);
      bug.addEventListener("click", this.handleBug);

      this.field.appendChild(carrot);
      this.field.appendChild(bug);

      this.move(bug);
    }
  }

  create(src) {
    const item = document.createElement("img");
    item.src = src;
    return this.setPosition(item);
  }

  setPosition(item) {
    const positionX = Math.random() * this.fieldWidth;
    const positionY = Math.random() * this.fieldHeigth;

    item.style.left = `${positionX}px`;
    item.style.top = `${positionY}px`;

    return item;
  }

  move(item) {
    const interval = setInterval(() => {
      const direction = this.getRandomNumber(4, 1);
      const distance = this.getRandomNumber(30, 10);
      const top = parseInt(item.style.top || 0, 10);
      const left = parseInt(item.style.left || 0, 10);
      let positionX = 0;
      let positionY = 0;

      if (direction === 1) {
        positionX = left + distance > this.fieldWidth ? left : left + distance;
        positionY = top + distance > this.fieldHeigth ? top : top + distance;
      } else if (direction === 2) {
        positionX = left + distance > this.fieldWidth ? left : left + distance;
        positionY = top - distance < 0 ? top : top - distance;
      } else if (direction === 3) {
        positionX = left - distance < 0 ? left : left - distance;
        positionY = top - distance < 0 ? top : top - distance;
      } else if (direction === 4) {
        positionX = left - distance < 0 ? left : left - distance;
        positionY = top + distance > this.fieldHeigth ? top : top + distance;
      }
      item.style.left = `${positionX}px`;
      item.style.top = `${positionY}px`;
    }, 500);

    this.intervals.push(interval);
  }

  getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  show() {
    this.field.style.visibility = "visible";
  }

  hide() {
    this.field.style.visibility = "hidden";
  }
  reset() {
    this.stopInterval();
    this.field.innerHTML = "";
  }

  stopMove() {
    if (this.intervals?.length < 1) return;

    this.intervals.forEach((item) => {
      clearInterval(item);
    });

    this.intervals = [];
  }
}
