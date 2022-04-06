"use strict";

import Popup from "./popup.js";
import Game from "./game.js";

const POPUP_REPLAY_MESSAGE = "REPLAY?";
const POPUP_CLEAR_MESSAGE = "SUCCESS";

const game = new Game(10, 10);
const gameBanner = new Popup();

game.setBannerHandler((reason) => {
  if (reason === "clear") {
    gameBanner.show(POPUP_CLEAR_MESSAGE);
  } else if (reason === "lose") {
    gameBanner.show(POPUP_REPLAY_MESSAGE);
  } else if (reason === "restart") {
    gameBanner.hide(POPUP_CLEAR_MESSAGE);
  }
});

gameBanner.setEventListener(game.onReStartGame);
