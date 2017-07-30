(function() {
  "use strict";

  const a = [];

  // Y GOES DOWN (NEGATIVE IS HIGH)

  item(a, 400, 0, "coin");
  both(a, 500, 0, 100, 300, "sand");
  both(a, 800, -50, 100, 300, "sand");
  item(a, 1000, -150, "gas");
  above(a, 1000, 50, 100, "sand");
  both(a, 1300, 50, 100, 250, "sand");
  item(a, 1600, -100, "coin");
  below(a, 2000, 50, 100, "earth");
  final(a, 2800, 100);

  window.levels["1"] = a;
})();
