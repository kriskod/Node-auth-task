"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var morgan = require("morgan");

var fetch = require("node-fetch");

require("dotenv").config();

var _require = require("./auth"),
    authFactory = _require.authFactory,
    AuthError = _require.AuthError;

var moviesRoutes = require("./routes/movies");

var _process$env = process.env,
    JWT_SECRET = _process$env.JWT_SECRET,
    MONGO_USER = _process$env.MONGO_USER,
    MONGO_PASSWORD = _process$env.MONGO_PASSWORD,
    PORT = _process$env.PORT,
    API_KEY = _process$env.API_KEY;
var port = PORT || 3000;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

var auth = authFactory(JWT_SECRET);
var app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));
app.post("/auth", function (req, res, next) {
  if (!req.body) {
    return res.status(400).json({
      error: "invalid payload"
    });
  }

  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  if (!username || !password) {
    return res.status(400).json({
      error: "invalid payload"
    });
  }

  try {
    var token = auth(username, password);
    return res.status(200).json({
      token: token
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({
        error: error.message
      });
    }

    next(error);
  }
});
app.use("/movies", moviesRoutes);
app.use(function (error, _, res, __) {
  console.error("Error processing request ".concat(error, ". See next message for details"));
  console.error(error);
  return res.status(500).json({
    error: "internal server error"
  });
});
mongoose.connect("mongodb+srv://".concat(MONGO_USER, ":").concat(MONGO_PASSWORD, "@moviesdb.w5jju.mongodb.net/<dbname>?retryWrites=true&w=majority"), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  app.listen(port, function () {
    console.log("auth svc running at port ".concat(port));
  });
})["catch"](function (err) {
  console.log(err.message);
});