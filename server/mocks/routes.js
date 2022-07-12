var express = require("express");
const { getRedisMock } = require("./mocks");
var router = express.Router();

router.all("*", async (req, res, next) => {
  try {
    console.log("mock in use", req.url);
    const { status, response } = await getRedisMock(req);
    return res.status(status).json(response);
  } catch (error) {
    console.log("impossible to retreive the mock value");
    next(error);
  }
});

exports.mocksRoute = router;
