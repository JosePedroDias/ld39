"use strict";

const sfx = {};
const music = {};

function addSfx(name) {
  sfx[name] = new Howl({ src: [`assets/sfx/${name}.wav`] });
}

function addMusic(name) {
  music[name] = new Howl({
    src: [`assets/music/${name}.wav`],
    loop: name !== "gameOver"
  });
}

window.audioMap.sfx.forEach(addSfx);
window.audioMap.music.forEach(addMusic);
