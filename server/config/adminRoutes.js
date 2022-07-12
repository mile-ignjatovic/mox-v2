var express = require("express");
var router = express.Router();
const { conf } = require("./config");

router.post("/admin/conf", (req, res) => {
  const requestMode = req.body?.recordMode;
  conf.set("recordMode", requestMode ? requestMode : false);
  return res.status(200).json({ status: "ok" });
});

router.get("/admin/conf", (req, res) => {
  return res.status(200).json({ status: "ok", result: conf.getAll() });
});

exports.confRoutes = router;
