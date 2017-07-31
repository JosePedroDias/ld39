(function() {
  "use strict";

  const a = [];

  // Y GOES DOWN (NEGATIVE IS HIGH)

  item(a, 400, 0, "coin");
  item(a, 600, -100, "coin");
  item(a, 800, -200, "coin");
  item(a, 1000, -100, "coin");
  item(a, 1200, 0, "coin");

  above(a, 1300, 50, 100, "sand");
  above(a, 2000, 50, 100, "sand");

  below(a, 2500, 50, 100, "sand");
  below(a, 3600, 50, 100, "sand");

  item(a, 3900, 100, "gas");

  both(a, 4300, -50, 100, 300, "earth");
  both(a, 5000, -50, 600, 300, "earth");

  both(a, 6000, -50, 100, 300, "sand");
  both(a, 6300, 0, 100, 300, "sand");
  both(a, 6500, 50, 100, 300, "sand");

  item(a, 7000, 0, "coin");
  item(a, 7200, -100, "coin");
  item(a, 7400, -200, "coin");
  item(a, 7600, -100, "coin");
  item(a, 7800, 0, "coin");

  both(a, 8300, -50, 100, 300, "earth");
  item(a, 7600, 0, "gas");
  both(a, 8800, 0, 100, 300, "earth");
  both(a, 9100, 50, 100, 300, "earth");

  item(a, 9600, 0, "coin");
  item(a, 9800, -100, "coin");
  item(a, 10000, -150, "coin");
  item(a, 10200, -300, "coin");
  item(a, 10400, 0, "coin");
  item(a, 10600, 0, "gas");
  item(a, 10800, 100, "coin");
  item(a, 11000, 150, "coin");
  item(a, 11200, 300, "coin");
  item(a, 11400, 0, "coin");

  item(a, 11700, 50, "coin");
  above(a, 12000, 50, 100, "sand");
  below(a, 12400, 50, 100, "sand");
  above(a, 13100, 50, 100, "sand");

  item(a, 13500, 200, "gas");

  below(a, 13800, 50, 100, "earth");
  above(a, 14200, 50, 100, "earth");
  below(a, 14900, 50, 100, "earth");

  final(a, 15600, 100);

  window.levels["4"] = a;
})();
