"use strict";

const b = new Bump(PIXI);

//const collision = b.hit(ship, obstacles); // sprite or {x,y}, sprite or Array<Sprite>, dont intersect, bounce, w/ global coords

let _hit;

window.getHitObstacle = function getHitObstacle() {
  return _hit;
};

const _points = (function() {
  const r = 26;
  const n = 16;
  const PI2 = Math.PI * 2;
  const arr = [];
  for (let i = 0; i < n; ++i) {
    const a = i / n * PI2;
    arr.push({
      x: r * Math.cos(a),
      y: r * Math.sin(a)
    });
  }
  return arr;
})();

function getTranslatedPoints(x, y) {
  return _points.map(function(p) {
    return { x: p.x + x, y: p.y + y };
  });
}

window.shipCollidesWithObstacle = function shipCollidesWithObstacle(
  ship,
  obstacles
) {
  const points = getTranslatedPoints(ship.position.x, ship.position.y);
  function pointHitsObstacle(p) {
    return obstacles.some(function(obs) {
      if (!obs.visible || obs.alpha < 1) {
        return false;
      }
      const didHit = b.hit(p, obs);
      if (didHit) {
        _hit = obs;
      }
      return didHit;
    });
  }
  return points.some(pointHitsObstacle);
};
