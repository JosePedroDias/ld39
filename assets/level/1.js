(function() {
  "use strict";

  const a = [];

  // Y GOES DOWN (NEGATIVE IS HIGH)

  item(a, 400, 0, "coin");
  item(a, 500, 50, "coin");
  item(a, 600, -50, "coin");
  item(a, 700, 0, "coin");
  item(a, 800, 50, "coin");


  item(a, 1600, -100, "coin");
  item(a, 1700, -50, "coin");
  item(a, 1800, -150, "coin");
  item(a, 1900, -100, "coin");
  item(a, 2000, -150, "coin");


  item(a, 2800, 100, "coin");
  item(a, 2900, 150, "coin");
  item(a, 3000, 50, "coin");
  item(a, 3100, 100, "coin");
  item(a, 3200, 150, "coin");


  item(a, 3500, 0, "gas");


  item(a, 3800, 0, "coin");
  item(a, 3900, 0, "coin");
  item(a, 4000, 0, "coin");

  below(a, 4300, 0, 100, "earth");
  item(a, 4300, 100, "coin");

  below(a, 4600, 0, 100, "stone");
  item(a, 4600, 100, "coin");
  item(a, 4750, 25, "coin");

  item(a, 4900, 100, "coin");
  item(a, 5050, 25, "coin");
  item(a, 5200, 100, "coin");
  below(a, 4900, 0, 100, "stone");

  below(a, 5200, 0, 100, "stone");

  item(a, 5500, -100, "coin");
  item(a, 5600, -100, "coin");
  item(a, 5700, -100, "coin");


  above(a, 6000, -150, 100, "earth");
  item(a, 6000, -200, "coin");

  above(a, 6300, -150, 100, "stone");
  item(a, 6300, -200, "coin");
  item(a, 6650, -180, "coin");
  item(a, 6800, -150, "coin");
  item(a, 6950, -180, "coin");
  item(a, 7100, -150, "coin");
  above(a, 6800, -200, 100, "stone");

  item(a, 7200, 0, "gas");

  item(a, 7500, 200, "coin");
  item(a, 7600, 200, "coin");
  item(a, 7700, 200, "coin");

  both(a, 8000, 0, 100, 200, "earth");
  item(a, 8000, 0, "coin");

  both(a, 8300, 0, 100, 200, "stone");
  item(a, 8300, 0, "coin");
  item(a, 8400, 0, "coin");
  item(a, 8500, 0, "coin");
  item(a, 8600, 0, "coin");
  item(a, 8700, 0, "coin");
  item(a, 8800, 0, "coin");
  item(a, 8900, 0, "coin");
  both(a, 8600, 0, 100, 200, "stone");

  both(a, 8900, 0, 100, 200, "stone");

  item(a, 9200, 100, "coin");
  item(a, 9300, 100, "coin");
  item(a, 9400, 100, "coin");

  single(a, 9900, -200, 100, 100, "lava");
  item(a, 9800, -200, "", "pill1");
  item(a, 9700, -200, "", "pill1");
  
  single(a, 9900, 200, 100, 100, "lava");
  item(a, 9800, 200, "", "pill1");
  item(a, 9700, 200, "", "pill1");

  item(a, 9700, 0, "coin");
  item(a, 9800, 0, "coin");
  item(a, 9900, 0, "coin");

  final(a, 10000, 100);

  window.levels["1"] = a;
})();
