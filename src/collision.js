"use strict";

const b = new Bump(PIXI);

//const collision = b.hit(ship, obstacles); // sprite or {x,y}, sprite or Array<Sprite>, dont intersect, bounce, w/ global coords

window.shipCollidesWithObstacle = function shipCollidesWithObstacle(
  ship,
  obstacles
) {
  const x = ship.position.x;
  const y = ship.position.y;
  const w = 64;
  const h = 32;
  const points = [
    { x: x + w * 0.7, y: y - h },
    { x: x + w, y: y },
    { x: x + w * 0.7, y: y + h },
    { x: x - w, y: y - h },
    { x: x - w, y: y + h }
  ];
  function pointHitsObstacle(p) {
    return obstacles.some(function(obs) {
      return b.hit(p, obs);
    });
  }
  return points.some(pointHitsObstacle);
};
