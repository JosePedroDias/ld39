"use strict";

const INITIAL_GAS = 10;

window.init = function init(app) {
  // game state
  let vy = 0;
  let coins = 0;
  let gas = INITIAL_GAS;
  let time = 0;
  let running = true;
  let aboutToPause = false;

  const fg = new PIXI.Container();
  app.stage.addChild(fg);
  fg.pivot.x = W / 2;
  fg.pivot.y = H / 2;

  const obstacles = [];

  // create a new Sprite from an image path
  const ship = PIXI.Sprite.fromImage("assets/gfx/ship.png");
  ship.anchor.set(0.5);
  ship.x = 0;
  ship.y = 0;
  ship.hitArea = new PIXI.Rectangle(0, 0, 128, 64);
  fg.addChild(ship);

  const countT = new PIXI.Text("---", {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Arvo",
    fill: "#FFF",
    stroke: "#444",
    align: "center",
    strokeThickness: 4
  });
  countT.x = W - 20;
  countT.y = 20;
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
  // songs["8bit_detective"].play();
  samples.jump.volume(0.05);

  const level = window.levels["1"];
  function addLevelItem(o) {
    const t2 = window.textureMap[o.t];
    if (!t2) {
      window.alert(`Haven't found "${o.t}" in the textureMap!`);
    }
    const img = `assets/gfx/${t2}.png`;
    const tx = PIXI.Texture.fromImage(img);
    const spr = new PIXI.extras.TilingSprite(tx, o.d[0], o.d[1]);
    spr.cacheAsBitmap = true;
    spr.anchor.set(0.5);
    spr.position.x = o.p[0];
    spr.position.y = o.p[1];
    spr._data = { k: o.k, t: o.t }; // kind and texture name
    obstacles.push(spr);
    fg.addChild(spr);
  }
  level.forEach(addLevelItem);

  function reset() {
    app.ticker.update(0); // TODO still doesn't reset game time
    app.ticker.lastTime = 0;

    obstacles.forEach(function(o) {
      o.visible = true;
    });

    time = 0;
    coins = 0;
    vy = 0;
    gas = INITIAL_GAS;
    ship.position.x = 0;
    ship.position.y = 0;
    fg.pivot.x = -W / 2;
    fg.pivot.y = -H / 2;
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
      --gas;
    }
    countT.text = `Gas: ${gas}  Coins: ${coins}  Time: ${time}`;

    if (ship.position.y > 250 || gas <= 0) {
      samples.explosion.play();
      return reset();
    }

    if (shipCollidesWithObstacle(ship, obstacles)) {
      const obs = getHitObstacle();
      const d = obs._data;
      // console.log(`t:${d.t} k:${d.k || "obstacle"}`);
      if (!d.k) {
        samples.explosion.play();
        return reset();
      } else {
        obs.visible = false;
        if (d.k === "coin") {
          ++coins;
        } else if (d.k === "gas") {
          gas += 10;
        }
      }
    }

    ship.position.x += 4 * delta;
    fg.pivot.x += 4 * delta;
    ship.position.y += vy * delta;
    vy += 0.09 * delta;
  });
};

window.run();
