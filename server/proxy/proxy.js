const {
  redisMockExists,
  saveResponse,
  redisMockEnabled,
} = require("../mocks/mocks");

const getProxyConf = () => {
  return {
    proxyReqPathResolver: (req) => {
      var parts = req.url.split("?");
      var queryString = parts[1];
      return `${req.path}${queryString ? "?" + queryString : ""}`;
    },
    filter: (req) => {
      return new Promise(async (resolve) => {
        try {
          const [mockExists, mockEnabled] = await Promise.all([
            redisMockExists(req),
            redisMockEnabled(req),
          ]);
          resolve(!(mockExists && mockEnabled));
        } catch (error) {
          resolve(true);
        }
      });
    },
    userResDecorator: async (_proxyRes, proxyResData, userReq, userRes) => {
      saveResponse(userReq, proxyResData, userRes);
      return proxyResData;
    },
  };
};

exports.getProxyConf = getProxyConf;
