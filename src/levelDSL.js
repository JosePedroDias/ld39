"use strict";

window.levels = {};

window.final = function final(a, x, y, w) {
  a.push({
    p: [x, 0],
    d: [w, H],
    t: "checkers",
    k: "end"
  });
};

window.both = function both(a, x, y, w, h, t) {
  a.push({
    p: [x, y - (h + H) / 2],
    d: [w, H],
    t: t
  });

  a.push({
    p: [x, y + (h + H) / 2],
    d: [w, H],
    t: t
  });
};

window.above = function above(a, x, y, w, t) {
  a.push({
    p: [x, y + H / 2],
    d: [w, H],
    t: t
  });
};

window.below = function below(a, x, y, w, t) {
  a.push({
    p: [x, y - H / 2],
    d: [w, H],
    t: t
  });
};

window.item = function item(a, x, y, k) {
  a.push({
    p: [x, y],
    t: k === "gas" ? "gold" : "silver",
    k: k
  });
};
