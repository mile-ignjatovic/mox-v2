function errorResponse(err, req, res, next) {
  console.error("Error mock server for this route =>", err.stack);
  res.status(500).send("Something broke :(");
}

exports.errorResponse = errorResponse;
