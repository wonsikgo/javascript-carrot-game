"use strict";

export default class Item {
  constructor(count, handleCarrot, handleBug) {
    this.field = document.querySelector(".game-field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.count = count;
    this.handleCarrot = handleCarrot;
    this.handleBug = handleBug;
  }

  init() {
    for (let i = 0; i < this.count; i++) {
      const carrot = this.create("./static/img/carrot.png");
      const bug = this.create("./static/img/bug.png");

      carrot.addEventListener("click", this.handleCarrot);
      bug.addEventListener("click", this.handleBug);

      this.field.appendChild(carrot);
      this.field.appendChild(bug);
    }
  }

  create(src) {
    const item = document.createElement("img");
    item.src = src;
    return this.setPosition(item);
  }

  setPosition(item) {
    const positionX = Math.random() * this.fieldRect.width - 80;
    const positionY = Math.random() * this.fieldRect.height - 80;

    item.style.left = `${positionX}px`;
    item.style.top = `${positionY}px`;

    return item;
  }

  show() {
    this.field.style.visibility = "visible";
  }

  hide() {
    this.field.style.visibility = "hidden";
  }
  reset() {
    this.field.innerHTML = "";
  }
}
