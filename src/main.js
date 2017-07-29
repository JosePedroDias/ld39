"use strict";

PIXI.utils.skipHello();

window.WebFontConfig = {
  // preload webfonts
  google: {
    families: ["Arvo:700"]
  },
  active: function() {
    // preload pixi assets
    PIXI.loaders.shared
      .add("assets/gfx/ship.png")
      .add("assets/gfx/ground/Grass/grassCenter.png")
      .add("assets/gfx/ground/Planet/planetCenter.png")
      .load(init);
  }
};

WebFont.load(window.WebFontConfig);

function init() {
  // game state
  let vy = 0;
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

  const countT = new PIXI.Text("---", {
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

  function onDown() {
    vy = -5;
  }
  window.addEventListener("touchstart", onDown);
  window.addEventListener("mousedown", onDown);

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
  // songs["8bit_detective"].play();

  const level = window.levels["1"];
  function addLevelItem(o) {
    const tx = PIXI.Texture.fromImage(`assets/gfx/${o.t}.png`);
    const spr = new PIXI.extras.TilingSprite(tx, o.d[0], o.d[1]);
    spr.cacheAsBitmap = true;
    spr.anchor.set(0.5);
    spr.position.x = o.p[0];
    spr.position.y = o.p[1];
    fg.addChild(spr);
  }
  level.forEach(addLevelItem);

  window.addEventListener("keydown", function(ev) {
    const o = {
      37: "coin",
      39: "explosion",
      38: "jump",
      40: "powerup"
    };

    if (ev.keyCode === 80) {
      // toggle pause with P
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
    } else if (ev.keyCode === 32) {
      addLevelItem({
        p: [ship.position.x, ship.position.y],
        d: [32, 32],
        t: "ground/Grass/grassCenter"
      });
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
    countT.text = `Gas: ${gas}  Coins: ${coins}  Time: ${time}`;

    ship.position.x += 4 * delta;
    fg.pivot.x += 4 * delta;
    ship.position.y += vy * delta;
    vy += 0.09 * delta;
  });
}
