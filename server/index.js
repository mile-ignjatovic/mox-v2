const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const BACKEND_API_URL = "https://journey-private-dev.adobe.io";
const proxy = require("express-http-proxy");
const mocks = require("./mocks/mocks");
const { confRoutes: adminConfRoutes } = require("./config/adminRoutes");
const { mocksRoute } = require("./mocks/routes");
const { getProxyConf } = require("./proxy/proxy");
const { adminRoutes: adminMocksRoute } = require("./mocks/adminRoutes");
const { errorResponse } = require("./errors/errors");

app.use(cors());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(adminMocksRoute);
app.use(adminConfRoutes);
app.use(`/`, proxy(BACKEND_API_URL, getProxyConf()));
app.use(mocksRoute);
app.use(errorResponse);
app.listen(port, () => {
  console.log(`Mox app listening on port ${port}`);
});
