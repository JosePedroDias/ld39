"use strict"; // @flow

window.WebFontConfig = {
  google: {
    families: ["Arvo:700"]
  },

  active: function() {
    init();
  }
};

(function() {
  var wf = document.createElement("script");
  wf.src =
    ("https:" === document.location.protocol ? "https" : "http") +
    "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
  wf.type = "text/javascript";
  wf.async = "true";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(wf, s);
})();

function init() {
  let coins = 0;
  let gas = 20;
  let time = 0;

  const app = new PIXI.Application(800, 600, {
    backgroundColor: 0x1099bb,
    antialias: false,
    transparent: false,
    resolution: 1
  });
  app.renderer.autoResize = true;
  document.body.appendChild(app.view);

  function onResize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", onResize);
  onResize();

  // create a new Sprite from an image path
  const bunny = PIXI.Sprite.fromImage("assets/gfx/bunny.png");

  const countT = new PIXI.Text("Hello world", {
    fontWeight: "bold",
    // fontStyle: "italic",
    fontSize: 20,
    fontFamily: "Arvo",
    fill: "#FFF",
    stroke: "#444",
    align: "center",
    strokeThickness: 4
  });
  countT.x = app.renderer.width - 100;
  countT.y = 50;
  countT.anchor.x = 1;
  app.stage.addChild(countT);

  bunny.anchor.set(0.5);
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;
  app.stage.addChild(bunny);

  let isDown = false;
  function onDown(ev) {
    isDown = true;
  }
  function onUp() {
    isDown = false;
  }
  window.addEventListener("touchstart", onDown);
  window.addEventListener("touchend", onUp);
  window.addEventListener("mousedown", onDown);
  window.addEventListener("mouseup", onUp);
  //window.addEventListener("keydown", onDown);
  //window.addEventListener("keyup", onUp);

  const samples = {};
  const songs = {};
  function addSample(name) {
    samples[name] = new Howl({ src: [`assets/sfx/${name}.wav`] });
  }
  function addSong(name) {
    songs[name] = new Howl({ src: [`assets/music/${name}.wav`], loop: true });
  }
  addSample("coin");
  addSample("explosion");
  addSample("jump");
  addSample("powerup");
  addSong("8bit_detective");
  songs["8bit_detective"].play();

  window.addEventListener("keydown", function(ev) {
    const o = {
      37: "coin",
      39: "explosion",
      38: "jump",
      40: "powerup"
    };
    // console.log(ev.keyCode);
    const n = o[ev.keyCode];
    if (n) {
      samples[n].play();
    }
  });

  app.ticker.add(function(delta) {
    // console.log(app.ticker);
    const t = Math.floor(app.ticker.lastTime / 1000);
    if (t !== time) {
      time = t;
    }
    countT.text = `Gas:${gas}  Coins:${coins}  Time:${time}`;
    if (isDown) {
      bunny.position.x += 1 * delta;
    }
  });
}
