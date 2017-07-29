"use strict";

function noop() {}

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

const INITIAL_GAS = 20;

const NO_MUSIC = 0;
const NO_SFX = 0;

const samples = {};
const songs = {};

let addSample;
if (NO_SFX) {
  addSample = function(name) {
    samples[name] = {
      play: noop,
      volume: noop
    };
  };
} else {
  addSample = function(name) {
    samples[name] = new Howl({ src: [`assets/sfx/${name}.wav`] });
  };
}

let addSong;
if (NO_MUSIC) {
  addSong = function(name) {
    songs[name] = { play: noop };
  };
} else {
  addSong = function(name) {
    songs[name] = new Howl({ src: [`assets/music/${name}.wav`], loop: true });
  };
}

function init() {
  // game state
  let vy = 0;
  let coins = 0;
  let gas = INITIAL_GAS;
  let time = 0;
  let running = true;
  let aboutToPause = false;

  const b = new Bump(PIXI);

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
  fg.pivot.x = -app.renderer.width / 2;
  fg.pivot.y = -app.renderer.height / 2;

  const obstacles = [];

  // create a new Sprite from an image path
  const ship = PIXI.Sprite.fromImage("assets/gfx/ship.png");
  ship.anchor.set(0.5);
  ship.x = 0; // app.renderer.width / 2;
  ship.y = 0; // app.renderer.height / 2;
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
    samples.jump.play();
  }
  window.addEventListener("touchstart", onDown);
  window.addEventListener("mousedown", onDown);

  addSample("coin");
  addSample("explosion");
  addSample("jump");
  addSample("powerup");
  addSong("8bit_detective");
  songs["8bit_detective"].play();
  samples.jump.volume(0.05);

  const level = window.levels["1"];
  function addLevelItem(o) {
    const tx = PIXI.Texture.fromImage(`assets/gfx/${o.t}.png`);
    const spr = new PIXI.extras.TilingSprite(tx, o.d[0], o.d[1]);
    spr.cacheAsBitmap = true;
    spr.anchor.set(0.5);
    spr.position.x = o.p[0];
    spr.position.y = o.p[1];
    obstacles.push(spr);
    fg.addChild(spr);
  }
  level.forEach(addLevelItem);

  function reset() {
    app.ticker.update(0); // TODO still doesn't reset game time
    app.ticker.lastTime = 0;
    time = 0;
    coins = 0;
    vy = 0;
    gas = INITIAL_GAS;
    ship.position.x = 0;
    ship.position.y = 0;
    fg.pivot.x = -app.renderer.width / 2;
    fg.pivot.y = -app.renderer.height / 2;
  }

  window.addEventListener("keydown", function(ev) {
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
      // space adds item at ship position (dev time stuff)
      addLevelItem({
        p: [ship.position.x, ship.position.y],
        d: [32, 32],
        t: "ground/Grass/grassCenter"
      });
    }

    //console.log(ev.keyCode);
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

    if (ship.position.y > 250) {
      samples.explosion.play();
      return reset();
    }

    const collision = b.hit(ship, obstacles); // sprite or {x,y}, sprite or Array<Sprite>, dont intersect, bounce, w/ global coords
    if (collision) {
      samples.explosion.play();
      return reset();
    }

    ship.position.x += 4 * delta;
    fg.pivot.x += 4 * delta;
    ship.position.y += vy * delta;
    vy += 0.09 * delta;
  });
}
