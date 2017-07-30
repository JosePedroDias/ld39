"use strict";

PIXI.utils.skipHello();

const AR = 1;

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
        const app = new PIXI.Application(800, 600, {
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
          } else {
          }
          app.renderer.resize(window.innerWidth, window.innerHeight);
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
