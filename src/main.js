"use strict";

import Popup from "./popup.js";
import { Reason, GameBuilder } from "./game.js";

const game = new GameBuilder()
  .gamePlayTime(10) //
  .gameItemCount(2)
  .gameLevel(1)
  .build();
const gameBanner = new Popup();

game.setBannerHandler((reason) => {
  if (reason === Reason.win) {
    gameBanner.show(Reason.win);
  } else if (reason === Reason.lose) {
    gameBanner.show(Reason.lose);
  } else if (reason === Reason.restart) {
    gameBanner.hide();
  }
});

gameBanner.setEventListener(game.onReStartGame);
