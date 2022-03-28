"use strict";

export default class Popup {
  constructor() {
    this.popup = document.querySelector(".pop-up");
    this.popupMessage = document.querySelector(".pop-up-message");
    this.refreshBtn = document.querySelector(".pop-up-refresh");
  }

  setEventListener(clickEvent) {
    this.refreshBtn.addEventListener("click", clickEvent);
  }

  show(message) {
    this.popup.classList.remove("hide");
    this.popupMessage.innerHTML = message;
  }

  hide() {
    this.popup.classList.add("hide");
  }
}
