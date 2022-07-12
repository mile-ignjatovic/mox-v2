const { createClient } = require("redis");
const { conf } = require("./config/config");

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", function () {
  console.log("Connected to redis db!");
});

const connect = async () => {
  await client.connect();
  console.log("RecordMode:", conf.get("recordMode"));
};

connect();

exports.redisClient = client;
