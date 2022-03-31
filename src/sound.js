const bgm = new Audio("../static/sound/bg.mp3");
const gameLoseSound = new Audio("../static/sound/alert.wav");
const gameWinSound = new Audio("../static/sound/game_win.mp3");
const carrotPullSound = new Audio("../static/sound/carrot_pull.mp3");
const bugPullSound = new Audio("../static/sound/bug_pull.mp3");

export function playBgm() {
  playSound(bgm);
}

export function playGameLose() {
  playSound(gameLoseSound);
}

export function playGameWin() {
  playSound(gameWinSound);
}

export function playCarrotPull() {
  playSound(carrotPullSound);
}

export function playBugPull() {
  playSound(bugPullSound);
}

export function stopBgm() {
  stopSound(bgm);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
