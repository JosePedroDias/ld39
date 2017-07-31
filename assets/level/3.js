
(function() {
  "use strict";

  const a = [];

  item(a, 300, 0, "coin");
  item(a, 400, 75, "coin");
  item(a, 500, 150, "coin");
  item(a, 600, 75, "coin");
  item(a, 700, 0, "coin");
  item(a, 800, 75, "coin");
  item(a, 900, 150, "coin");
  item(a, 1000, 75, "coin");
  item(a, 1100, 0, "coin");
  item(a, 1200, -75, "coin");
  item(a, 1300, -150, "coin");


  item(a, 1600, 0, "coin");

  item(a, 1800, 200, "coin");

  item(a, 2200, -200, "coin");


  item(a, 2750, 100, "gas");


  both(a, 3500, 0, 400, 200, "stone");

  
  item(a, 3300, 0, "coin");
  item(a, 3400, 0, "coin");
  item(a, 3500, 0, "coin");
  item(a, 3600, 0, "coin");
  item(a, 3700, 0, "coin");

  item(a, 3800, 0, "coin");
  item(a, 4100, 200, "coin");

  item(a, 4450, -250, "coin");


  item(a, 4700, -250, "gas");

  // Y GOES DOWN (NEGATIVE IS HIGH)

  //both(a, 600, 0, 100, 200, "earth");
  item(a, 5300, 0, "coin");
  item(a, 5400, -75, "coin");
  item(a, 5500, -150, "coin");
  item(a, 5600, -75, "coin");
  item(a, 5700, 0, "coin");
  item(a, 5800, -75, "coin");
  item(a, 5900, -150, "coin");
  item(a, 6000, -75, "coin");
  item(a, 6100, 0, "coin");
  item(a, 6200, 75, "coin");
  item(a, 6300, 150, "coin");
  both(a, 6600, 0, 100, 200, "stone");
  item(a, 6600, 0, "coin");
  both(a, 6700, 0, 100, 400, "lava");
  both(a, 6800, 0, 100, 400, "lava");

  both(a, 6900, 0, 100, 200, "stone");
  item(a, 6900, 0, "coin");

  both(a, 7000, 0, 100, 400, "lava");
  both(a, 7100, 0, 100, 400, "lava");

  both(a, 7200, 0, 100, 200, "stone");
  item(a, 7200, 0, "coin");

  both(a, 7300, 0, 100, 400, "lava");
  both(a, 7400, 0, 100, 400, "lava");

  both(a, 7500, -50, 100, 200, "lava");
  item(a, 7500, -50, "coin");
  both(a, 7600, -50, 100, 400, "stone");
  both(a, 7700, -50, 100, 400, "lava");
  item(a, 7700, 0, "coin");
  both(a, 7800, -50, 100, 400, "lava");
  item(a, 7800, -50, "coin");
  both(a, 7900, -50, 100, 400, "stone");
  item(a, 7900, -50, "coin");
  item(a, 8000, -50, "coin");
  item(a, 8100, -50, "coin");
  item(a, 8200, 50, "coin");
  // both(a, 8000, -50, 100, 400, "earth");
  // both(a, 8100, 0, 100, 400, "earth");
  // both(a, 8200, 0, 100, 350, "earth");
  // both(a, 8300, 225, 100, 500, "earth");
  both(a, 8000, -50, 100, 400, "earth");
  both(a, 8100, 0, 100, 400, "earth");
  both(a, 8200, 100, 100, 300, "earth");
  both(a, 8300, 225, 100, 450, "stone");

  item(a, 8700, -100, "coin");
  item(a, 8800, -150, "coin");

  item(a, 9150, 200, "gas");

  item(a, 9400, -180, "coin");  

  final(a, 9700, 100);

  

  

  window.levels["3"] = a;
})();