(function() {
  "use strict";

  const a = [];

  // Y GOES DOWN (NEGATIVE IS HIGH)

  both(a, 600, 0, 100, 200, "earth");
  item(a, 300, 0, "coin");
  item(a, 600, 0, "coin");
  item(a, 900, 0, "coin");

  below(a, 1200, -100, 100, "earth");

  item(a, 1200, 85, "coin");

  above(a, 1600, 100, 100, "earth");

  item(a, 1600, -50, "coin");

  below(a, 2000, -100, 100, "earth");

  item(a, 2000, 85, "coin");

  above(a, 2400, 100, 100, "earth");

  item(a, 2400, -50, "coin");

  both(a, 2800, 0, 100, 200, "earth");
  item(a, 2800, 0, "gas");

  //down
  item(a, 3200, -85, "coin");
  item(a, 3300, 0, "coin");
  item(a, 3400, 85, "coin");
  //up
  item(a, 3500, 0, "coin");
  item(a, 3600, -85, "coin");
  item(a, 3700, -170, "coin");
  above(a, 3600, 120, 100, "earth");
  above(a, 3700, 70, 100, "earth");
  above(a, 3800, 20, 100, "earth");
  above(a, 3900, 70, 100, "earth");
  above(a, 4000, 120, 100, "earth");
  item(a, 3800, -170, "coin");
  item(a, 3900, -170, "coin");
  //down
  item(a, 4000, -85, "coin");
  item(a, 4100, 0, "coin");
  item(a, 4200, 85, "coin");
  item(a, 4300, 170, "coin");
  //item(a, 4400, 170, "coin");
  //up
  item(a, 4400, 85, "coin");
  item(a, 4500, 0, "coin");
  item(a, 4600, -85, "coin");
  above(a, 4500, 200, 100, "earth");
  above(a, 4600, 100, 100, "earth");
  above(a, 4700, 0, 100, "earth");
  above(a, 4800, -50, 100, "earth");
  above(a, 4900, -100, 100, "earth");
  item(a, 4700, -170, "coin");
  item(a, 4800, -170, "coin");
  item(a, 4900, -170, "coin");
  item(a, 5000, -170, "coin");

  item(a, 5400, 0, "gas");
  item(a, 5100, -170, "coin");
  item(a, 5200, -170, "coin");
  item(a, 5300, -170, "coin");

  //down
  item(a, 5400, -85, "coin");
  item(a, 5500, 0, "coin");
  item(a, 5600, 85, "coin");
  item(a, 5700, 170, "coin");
  item(a, 5800, 170, "coin");
  item(a, 5900, 85, "coin");
  item(a, 6000, 0, "coin");
  item(a, 6100, 0, "coin");
  item(a, 6200, 0, "coin");
  item(a, 6300, 0, "coin");

  // 7000
  both(a, 7000, 150, 100, 200, "earth");
  item(a, 7000, 150, "coin");

  both(a, 7400, 0, 100, 200, "earth");
  item(a, 7400, 0, "coin");

  both(a, 7800, -150, 100, 200, "earth");
  item(a, 7800, -150, "coin");

  both(a, 8200, 0, 100, 200, "earth");
  item(a, 8200, 0, "coin");

  both(a, 8800, 0, 100, 200, "earth");
  item(a, 8800, 0, "coin");

  both(a, 9400, 0, 100, 200, "earth");
  item(a, 9400, 0, "gas");

  both(a, 10000, -150, 100, 200, "earth");
  item(a, 10000, -150, "coin");

  both(a, 10600, -150, 100, 200, "earth");
  item(a, 10600, -150, "coin");

  final(a, 11000, 100);

  window.levels["3"] = a;
})();
