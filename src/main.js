"use strict";

const INITIAL_GAS = 10;
const INITIAL_SHIP_Y = -220;
const TITLE_SONG = "TODO";
const GAME_SONG = "8bit_detective";

function fetchGfx(n) {
  return window.solveGfxName(window.textureMap[n]);
}

window.init = function init(app) {
  // game state
  let vy = 0;
  let coins = 0;
  let gas = INITIAL_GAS;
  let time = 0;
  let state = "title";
  let renderFn = titleScreenRender;

  // main sprites
  let _tx = PIXI.Texture.fromImage(fetchGfx("black"));
  const bg = new PIXI.extras.TilingSprite(_tx, W * 2 * Math.ceil(W / 256), H); // probably could be shorter but works
  app.stage.addChild(bg);

  const titleT = PIXI.Sprite.fromImage(fetchGfx("title"));
  titleT.anchor.set(0.5);
  titleT.x = W / 2;
  titleT.y = H / 2;
  app.stage.addChild(titleT);

  const countT = new PIXI.Text(" ", {
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

  const fg = new PIXI.Container();
  app.stage.addChild(fg);
  fg.pivot.x = W / 2;
  fg.pivot.y = H / 2;

  const obstacles = [];

  const ship = PIXI.Sprite.fromImage(fetchGfx("ship"));
  ship.anchor.set(0.5);
  ship.x = 0;
  ship.y = INITIAL_SHIP_Y;
  fg.addChild(ship);

  function onDown() {
    if (state === "title") {
      toState("playing");
    }
    if (state !== "playing") {
      return;
    }
    vy = -5;
    samples.jump.play();
  }
  window.addEventListener("touchstart", onDown);
  window.addEventListener("mousedown", onDown);

  addSample("coin");
  addSample("explosion");
  addSample("jump");
  addSample("powerup");
  addSong(GAME_SONG);
  samples.jump.volume(0.05);

  function addLevelItem(o) {
    const t2 = window.textureMap[o.t];
    if (!t2) {
      window.alert(`Haven't found "${o.t}" in the textureMap!`);
    }
    let img, imgs;

    if (t2 instanceof Array) {
      imgs = t2.map(function(n) {
        return solveGfxName(n);
      });
    } else {
      img = solveGfxName(t2);
    }

    let spr;
    if (imgs) {
      const txs = imgs.map(function(i) {
        return PIXI.Texture.fromImage(i);
      });
      spr = new PIXI.extras.AnimatedSprite(txs);
      spr.animationSpeed = 0.1;
      spr.gotoAndPlay(0);
    } else if ("d" in o) {
      const tx = PIXI.Texture.fromImage(img);
      spr = new PIXI.extras.TilingSprite(tx, o.d[0], o.d[1]);
      spr.cacheAsBitmap = true;
    } else {
      spr = PIXI.Sprite.fromImage(img);
    }

    if ("a" in o) {
      spr.alpha = o.a;
    }
    spr.anchor.set(0.5);
    spr.position.x = o.p[0];
    spr.position.y = o.p[1];
    spr._data = { k: o.k, t: o.t }; // kind and texture name
    obstacles.push(spr);
    fg.addChild(spr);
  }

  function loadLevel(name) {
    const level = window.levels[name];
    level.forEach(addLevelItem);
  }

  function reset() {
    app.ticker.update(0); // TODO still doesn't reset game time
    app.ticker.lastTime = 0;

    obstacles.forEach(function(o) {
      o.visible = true;
    });
  }

  window.addEventListener("keydown", function(ev) {
    if (ev.keyCode === 80) {
      // toggle pause with P
      if (state === "playing") {
        toState("paused");
      } else if (state === "paused") {
        toState("playing");
      }
    } else if (ev.keyCode === 32) {
      // space adds item at ship position (dev time stuff)
      addLevelItem({
        p: [ship.position.x, ship.position.y],
        t: "gold",
        k: "gas",
        a: 0.5
      });
    }

    //console.log(ev.keyCode);
  });

  /*
                       +------------+
                       |            |
+-------------+   +----v----+   +---+----+
| titleScreen +---> playing +---> paused |
+-------------+   +----^----+   +----+---+
                       |             |
                  +----+-----+       |
                  | gameOver <-------+
                  +----------+                     */

  function toState(newState) {
    const trans = `${state} -> ${newState}`;
    // console.warn(trans);
    if (newState === "playing") {
      if (state === "paused") {
        // paused -> playing
        fg.alpha = 1;
      } else if (state === "title" || state === "gameOver") {
        // title -> playing or gameOver -> playing
        time = 0;
        coins = 0;
        vy = 0;
        gas = INITIAL_GAS;
        ship.position.x = 0;
        ship.position.y = INITIAL_SHIP_Y;
        fg.pivot.x = -W / 2;
        fg.pivot.y = -H / 2;
        titleT.visible = false;
        loadLevel("1");
      } else {
        throw trans;
      }
      songs[GAME_SONG].play();
      app.ticker.start();
      state = newState;
      renderFn = playingRender;
    } else if (newState === "paused") {
      countT.text = "paused";
      fg.alpha = 0.5;
      songs[GAME_SONG].stop();
      state = newState;
      renderFn = pausedRender;
    } else if (newState === "gameOver") {
      countT.text = "game over!";
      songs[GAME_SONG].stop();
      samples.explosion.play();
      state = newState;
      renderFn = gameOverRender;
      setTimeout(function() {
        toState("playing");
      }, 1000);
    }
  }

  function titleScreenRender() {
    app.ticker.stop();
    app.ticker.update(0);
  }

  function gameOverRender() {
    app.ticker.stop();
    app.ticker.update(0);
  }

  function pausedRender() {
    app.ticker.stop();
    app.ticker.update(0);
  }

  function playingRender(delta) {
    const t = Math.floor(app.ticker.lastTime / 1000);
    if (t !== time) {
      time = t;
      --gas;
    }
    countT.text = `Gas: ${gas}  Coins: ${coins}  Time: ${time}`;

    if (ship.position.y > 250 || gas <= 0) {
      return toState("gameOver");
    }

    if (shipCollidesWithObstacle(ship, obstacles)) {
      const obs = getHitObstacle();
      const d = obs._data;
      // console.log(`t:${d.t} k:${d.k || "obstacle"}`);
      if (!d.k) {
        return toState("gameOver");
      } else {
        obs.visible = false;
        if (d.k === "coin") {
          ++coins;
          samples.coin.play();
        } else if (d.k === "gas") {
          gas += 10;
          samples.powerup.play();
        }
      }
    }

    ship.position.x += 4 * delta;
    fg.pivot.x += 4 * delta;
    ship.position.y += vy * delta;
    vy += 0.09 * delta;

    bg.pivot.x += 2 * delta;
    if (bg.pivot.x > bg._width / 2) {
      bg.pivot.x -= 256;
    }
  }

  app.ticker.add(function(delta) {
    renderFn(delta);
  });
};

window.run();
