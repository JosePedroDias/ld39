"use strict";

const INITIAL_GAS = 10;
const INITIAL_SHIP_Y = -220;
const DEATH_Y = 340;
const IMPULSE_VY = -4;
const GRAVITY_Y = 0.07;
const BG_TILE_W = 256;

let useSfx = loadLS("useSfx", true);
let useMusic = loadLS("useMusic", true);
let useFS = loadLS("useFS", true);
//console.log("sfx", useSfx);
//console.log("music", useMusic);
//console.log("fs", useFS);

if (!useSfx) {
  setSfx(false);
}

if (!useMusic) {
  setMusic(false);
}

const isMobile = (function() {
  const ua = navigator.userAgent;
  return (
    /android/i.test(ua) || (/iPad|iPhone|iPod/.test(ua) && !window.MSStream)
  );
})();
let needsFS = useFS;

function reqFS() {
  needsFS = false;
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}

function times(n) {
  return new Array(n).fill(0);
}

function fetchGfx(n) {
  return window.solveGfxName(window.textureMap[n]);
}

window.init = function init(app) {
  // game state
  let levelName = window.levelMap[0];
  let nextLevelName = levelName;
  let vy = 0;
  let coins = 0;
  let allCoins = 0;
  let gas = INITIAL_GAS;
  let time = 0;
  let state = "title";
  let renderFn = titleScreenRender;

  music.title.play();

  // main sprites
  let _tx = PIXI.Texture.fromImage(fetchGfx("black"));
  const bg = new PIXI.extras.TilingSprite(_tx, W + BG_TILE_W, H);
  app.stage.addChild(bg);

  const titleT = PIXI.Sprite.fromImage(fetchGfx("title"));
  titleT.anchor.set(0.5);
  titleT.x = W / 2;
  titleT.y = H / 2;
  app.stage.addChild(titleT);

  const scoresT = new PIXI.Text(" ", {
    fontWeight: "bold",
    fontSize: 26,
    fontFamily: "Arvo",
    fill: "#FFF",
    stroke: "#444",
    align: "center",
    strokeThickness: 4
  });
  scoresT.x = W / 2;
  scoresT.y = H / 2;
  scoresT.anchor.set(0.5);
  scoresT.visible = false;
  app.stage.addChild(scoresT);

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

  app.stage.swapChildren(fg, countT);
  app.stage.swapChildren(fg, scoresT);

  const obstacles = [];

  const ship = PIXI.Sprite.fromImage(fetchGfx("ship"));
  ship.anchor.set(0.5);
  ship.x = 0;
  ship.y = INITIAL_SHIP_Y;
  fg.addChild(ship);

  const dots = times(5).map(function() {
    const spr = PIXI.Sprite.fromImage(fetchGfx("redDot"));
    spr.anchor.set(0.5);
    fg.addChild(spr);
    return spr;
  });

  function onDown() {
    if (needsFS) {
      reqFS();
    }

    if (state === "title" || state === "gameOver") {
      return toState("playing");
    }
    if (state !== "playing") {
      return;
    }
    if (gas > 0) {
      vy = IMPULSE_VY;
      sfx.thrust.play();
      --gas;
    } else {
      sfx.thrustEmpty.play();
    }
  }

  if (isMobile) {
    window.addEventListener("touchstart", onDown);
  } else {
    window.addEventListener("mousedown", onDown);
  }

  function addLevelItem(o) {
    let t2 = window.textureMap[o.t];
    if (!t2) {
      window.alert(`Haven't found "${o.t}" in the textureMap!`);
    }
    let img, imgs, speed;

    if (t2 instanceof Array) {
      t2 = t2.slice();
      speed = t2.shift();
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
      spr.animationSpeed = speed;
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

    if (o.k === "coin") {
      ++allCoins;
    }
  }

  function loadLevel(name) {
    // clears them too
    obstacles.splice(0, obstacles.length).forEach(function(obs) {
      fg.removeChild(obs);
      obs.destroy();
    });

    const level = window.levels[name];
    allCoins = 0;
    level.forEach(addLevelItem);
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
      const p = [~~ship.position.x, ~~ship.position.y];
      window.console.log(p);
      addLevelItem({
        p: p,
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
        scoresT.visible = false;
        music.title.stop();
        music.gameOver.stop();
        music.transition.stop();
        time = 0;
        coins = 0;
        vy = 0;
        gas = INITIAL_GAS;
        ship.position.x = 0;
        ship.position.y = INITIAL_SHIP_Y;
        fg.pivot.x = -W / 2;
        fg.pivot.y = -H / 2;
        titleT.visible = false;
        levelName = nextLevelName;
        loadLevel(levelName);
      } else {
        throw trans;
      }
      music.main.play();
      app.ticker.start();
      state = newState;
      renderFn = playingRender;
    } else if (newState === "paused") {
      countT.text = "paused";
      fg.alpha = 0.5;
      music.main.stop();
      state = newState;
      renderFn = pausedRender;
    } else if (newState === "gameOver") {
      const score = { c: coins, t: ~~time, f: gas };
      saveScore(levelName, score);
      scoresT.text = "HIGH SCORES:\n" + getScores(levelName);
      scoresT.visible = true;

      const obs = getHitObstacle();
      const madeIt = obs && obs._data && obs._data.k === "end";

      if (madeIt) {
        nextLevelName = window.levelMap[window.levelMap.indexOf(levelName) + 1];
        if (!nextLevelName) {
          nextLevelName = window.levelMap[0];
        }
      }

      countT.text = madeIt ? "won!" : "game over!";
      music.main.stop();

      if (madeIt) {
        sfx.win.play();
        music.transition.play();
      } else {
        sfx.crash.play();
        music.gameOver.play();
      }
      state = newState;
      renderFn = gameOverRender;
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
    time += delta / 60;
    countT.text = `Level: ${levelName}  Thrusts: ${gas}  Coins: ${coins}/${allCoins}  Time: ${time.toFixed(
      0
    )}`;

    if (ship.position.y > DEATH_Y) {
      return toState("gameOver");
    }

    const points = genCollisionPoints(ship);
    points.forEach(function(p, i) {
      const s = dots[i];
      s.position.x = p[0];
      s.position.y = p[1];
    });

    if (shipCollidesWithObstacle(points, obstacles)) {
      const obs = getHitObstacle();
      const d = obs._data;
      // console.log(`t:${d.t} k:${d.k || "obstacle"}`);
      if (!d.k) {
        return toState("gameOver");
      } else {
        if (d.k === "end") {
          return toState("gameOver");
        }
        obs.visible = false;
        if (d.k === "coin") {
          ++coins;
          sfx.coin.play();
        } else if (d.k === "gas") {
          gas += 10;
          sfx.fuel.play();
        }
      }
    }

    const dx = 4 * delta;
    const dy = vy * delta;
    fg.pivot.x += dx;
    ship.position.x += dx;
    ship.position.y += dy;
    vy += GRAVITY_Y * delta;
    bg.pivot.x += 2 * delta;
    if (bg.pivot.x > BG_TILE_W) {
      bg.pivot.x -= BG_TILE_W;
    }

    const angle = Math.atan2(dy, dx);
    ship.rotation = angle;
  }

  app.ticker.add(function(delta) {
    renderFn(delta);
  });
};

window.run();
