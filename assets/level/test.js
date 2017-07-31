(function() {
  "use strict";

  const a = [];

  // Y GOES DOWN (NEGATIVE IS HIGH)

  single(a, 500, 60, 40, 60, "sand"); // a, x, y, w, h, t

  item(a, 700, -60, "", "pill1"); // a, x, y, k, t (where t is optional)

  final(a, 1000, 100);

  window.levels["test"] = a;
})();
