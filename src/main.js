"use strict";

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
  let W, H;

  W = window.innerWidth;
  H = window.innerHeight;

  const app = new PIXI.Application(W, H, { backgroundColor: 0x1099bb });
  document.body.appendChild(app.view);

  // create a new Sprite from an image path
  const bunny = PIXI.Sprite.fromImage("assets/gfx/bunny.png");

  const countingText = new PIXI.Text("Hello world", {
    fontWeight: "bold",
    // fontStyle: "italic",
    fontSize: 40,
    fontFamily: "Arvo",
    fill: "#FFF",
    stroke: "#444",
    align: "center",
    strokeThickness: 4
  });
  countingText.x = app.renderer.width / 2;
  countingText.y = 500;
  countingText.anchor.x = 0.5;
  app.stage.addChild(countingText);

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
  window.addEventListener("keydown", onDown);
  window.addEventListener("keyup", onUp);

  app.ticker.add(function(delta) {
    bunny.rotation += 0.01 * delta;
    if (isDown) {
      bunny.position.x += 1 * delta;
    }
  });
}
