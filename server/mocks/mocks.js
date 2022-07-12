const { redisClient } = require("../redis");
const { conf } = require("../config/config");

const buildRedisKey = (userReq) => {
  const redisKey =
    `${userReq.url}£${userReq.method}£` +
    Object.entries(userReq.headers)
      .filter(
        ([key]) => key.startsWith("x-vyg-query") || key.startsWith("x-vyg-xdm")
      )
      .reduce((prev, current) => {
        return `${current[0]}${current[1]}${prev}`;
      }, "");

  return redisKey.replace(/:/g, "").replace(/\*/g, "");
};

const revertKey = (key) => {
  return key.split("£");
};

const redisMockExists = async (req) => {
  try {
    const res = await keyExists(req);
    return res === 1 ? true : false;
  } catch (error) {
    console.log("Error in redisMockExists method", error);
  }
};

const keyExists = (req) => {
  const redisKey = buildRedisKey(req);
  return redisClient.exists(redisKey);
};

const redisMockEnabled = async (req) => {
  try {
    const redisKey = buildRedisKey(req);
    const res = await redisClient.json.get(redisKey, {
      path: ["isEnabled"],
    });
    return res === null || res === false ? false : true;
  } catch (error) {
    console.log("Error in redisMockEnabled method", error);
  }
};

const getRedisMock = async (req) => {
  const redisKey = buildRedisKey(req, "enabled");
  return redisClient.json.get(redisKey);
};

const saveResponse = async (userReq, proxyResData, userRes) => {
  try {
    const recordModeEnabled = conf.get("recordMode");
    if (recordModeEnabled === false) {
      return;
    }
    if (userRes.statusCode !== 200) {
      return;
    }
    const data = JSON.parse(proxyResData.toString("utf8"));
    const redisKey = buildRedisKey(userReq);
    const key = await redisClient.exists(redisKey);
    if (key === 1) {
      console.log("Mock already stored");
      return;
    }
    const dataToStore = {
      response: data,
      status: userRes.statusCode,
      isEnabled: false,
    };
    await redisClient.json.set(redisKey, "$", dataToStore);
  } catch (error) {
    console.log("storage broke up in record mode crashed", error);
  }
};

exports.saveResponse = saveResponse;
exports.getRedisMock = getRedisMock;
exports.redisMockExists = redisMockExists;
exports.revertKey = revertKey;
exports.redisMockEnabled = redisMockEnabled;
exports.keyExists = keyExists;
