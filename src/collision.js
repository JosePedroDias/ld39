"use strict";

const b = new Bump(PIXI);

//const collision = b.hit(ship, obstacles); // sprite or {x,y}, sprite or Array<Sprite>, dont intersect, bounce, w/ global coords

let _hit;

window.getHitObstacle = function getHitObstacle() {
  return _hit;
};

window.genCollisionPoints = function genCollisionPoints(ship) {
  const x = ship.position.x;
  const y = ship.position.y;
  const w = 64;
  const h = 32;
  return [
    { x: x + w * 0.7, y: y - h },
    { x: x + w, y: y },
    { x: x + w * 0.7, y: y + h },
    { x: x - w, y: y - h },
    { x: x - w, y: y + h }
  ];
};

window.shipCollidesWithObstacle = function shipCollidesWithObstacle(
  points,
  obstacles
) {
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
