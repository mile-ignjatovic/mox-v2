var express = require("express");
const { redisClient } = require("../redis");
const { revertKey } = require("./mocks");
var router = express.Router();

router.get("/admin/mocks", async (req, res, next) => {
  try {
    const keys = await redisClient.keys("*");
    const mocks = await Promise.all(
      keys.map(async (key) => {
        const reponse = await redisClient.json.get(key);
        const [url, method, queryFilters] = revertKey(key);
        return {
          key,
          url,
          method,
          queryFilters,
          ...reponse,
        };
      })
    );
    return res.status(200).json(mocks);
  } catch (error) {
    next(error);
  }
});

router.put("/admin/mocks", async (req, res, next) => {
  try {
    const redisKey = req.body?.key;
    if (!redisKey) {
      return res.status(404).json({ result: "Key does not exists" });
    }
    const key = await redisClient.exists(redisKey);
    if (key === 0) {
      return res.status(404).json({ result: "Key does not exists" });
    }
    const enable = req.body?.enable;
    const response = req.body?.response;
    const status = req.body?.status;
    if (enable !== undefined) {
      await redisClient.json.set(redisKey, "isEnabled", enable);
    }
    if (response !== undefined) {
      await redisClient.json.set(redisKey, "response", response);
    }
    if (status !== undefined) {
      await redisClient.json.set(redisKey, "status", status);
    }
    const updatedValue = await redisClient.json.get(redisKey);
    return res.status(200).json(updatedValue);
  } catch (error) {
    next(error);
  }
});

exports.adminRoutes = router;
