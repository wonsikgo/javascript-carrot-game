"use strict";

import Popup from "./popup.js";
import { Reason, GameBuilder } from "./game.js";

// const POPUP_REPLAY_MESSAGE = "REPLAY?";
// const POPUP_CLEAR_MESSAGE = "SUCCESS";

const game = new GameBuilder()
  .gamePlayTime(10) //
  .gameItemCount(10)
  .build();
const gameBanner = new Popup();

game.setBannerHandler((reason) => {
  if (reason === Reason.clear) {
    gameBanner.show(Reason.clear);
  } else if (reason === Reason.lose) {
    gameBanner.show(Reason.lose);
  } else if (reason === Reason.restart) {
    gameBanner.hide();
  }
});

gameBanner.setEventListener(game.onReStartGame);
