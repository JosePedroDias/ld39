"use strict";

PIXI.utils.skipHello();

const W = 800;
const H = 600;
const AR = W / H;

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
      .load(function() {
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
