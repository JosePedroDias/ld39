"use strict";

const samples = {};
const songs = {};

window.addSample = function addSample(name) {
  samples[name] = new Howl({ src: [`assets/sfx/${name}.wav`] });
};

window.addSong = function addSong(name) {
  songs[name] = new Howl({ src: [`assets/music/${name}.wav`], loop: true });
};
