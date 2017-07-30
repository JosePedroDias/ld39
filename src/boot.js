"use strict";

PIXI.utils.skipHello();

const W = 800;
const H = 600;
const AR = W / H;

function solveGfxName(n) {
  return `assets/gfx/${n}.png`;
}

window.WebFontConfig = {
  // preload webfonts
  google: {
    families: ["Arvo:700"]
  },
  active: function() {
    // preload pixi assets
    const loader = PIXI.loaders.shared;
    const keys = Object.keys(window.textureMap);
    keys.forEach(function(k) {
      const v = window.textureMap[k];
      if (v instanceof Array) {
        v.forEach(function(v2) {
          loader.add(solveGfxName(v2));
        });
      } else {
        loader.add(solveGfxName(v));
      }
    });
    loader.load(function() {
      const app = new PIXI.Application(W, H, {
        backgroundColor: 0x1099bb,
        antialias: false,
        transparent: false,
        resolution: 1
      });

      app.renderer.autoResize = true;
      document.body.appendChild(app.view);

      function onResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        let x = 0;
        let y = 0;
        let s;
        const ar = w / h;
        if (ar > AR) {
          s = h / H;
          x = ~~((w - W * s) / 2);
        } else {
          s = w / W;
          y = ~~((h - H * s) / 2);
        }
        document.body.style.paddingLeft = x + "px";
        document.body.style.paddingTop = y + "px";
        app.renderer.resize(W * s, H * s);
        app.stage.scale.set(s);
      }

      window.addEventListener("resize", onResize);
      onResize();

      init(app);
    });
  }
};

window.run = function() {
  WebFont.load(window.WebFontConfig);
};
