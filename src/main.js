"use strict"; // @flow

PIXI.utils.skipHello();

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
  let running = true;
  let aboutToPause = false;

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

  const fg = new PIXI.Container();
  app.stage.addChild(fg);

  // create a new Sprite from an image path
  const ship = PIXI.Sprite.fromImage("assets/gfx/ship.png");
  ship.anchor.set(0.5);
  ship.x = app.renderer.width / 2;
  ship.y = app.renderer.height / 2;
  fg.addChild(ship);

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

  const level = window.levels["1"];
  level.forEach(function(o) {
    const spr = PIXI.Sprite.fromImage(`assets/gfx/${o.s}.png`);
    spr.anchor.set(0.5);
    spr.x = app.renderer.width / 2 + o.p[0];
    spr.y = app.renderer.height / 2 + o.p[1];
    fg.addChild(spr);
  });

  window.addEventListener("keydown", function(ev) {
    const o = {
      37: "coin",
      39: "explosion",
      38: "jump",
      40: "powerup"
    };

    if (ev.keyCode === 80) {
      running = !running;
      if (running) {
        fg.alpha = 1;
        songs["8bit_detective"].play();
        app.ticker.start();
      } else {
        fg.alpha = 0.5;
        songs["8bit_detective"].stop();
        app.ticker.update(0);
        aboutToPause = true;
      }
    }

    console.log(ev.keyCode);
    const n = o[ev.keyCode];
    if (n) {
      samples[n].play();
    }
  });

  app.ticker.add(function(delta) {
    if (aboutToPause) {
      countT.text = "paused";
      app.ticker.stop();
      aboutToPause = false;
      return;
    }

    const t = Math.floor(app.ticker.lastTime / 1000);
    if (t !== time) {
      time = t;
    }
    countT.text = `Gas:${gas}  Coins:${coins}  Time:${time}`;

    ship.position.x += 4 * delta;
    fg.pivot.x += 4 * delta;

    if (isDown) {
      ship.position.y += 1 * delta;
    }
  });
}
