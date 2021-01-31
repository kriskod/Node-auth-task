"use strict";

var express = require("express");

var _require = require("../controller/user"),
    login = _require.login,
    register = _require.register;

var router = express.Router(); // router.post("/login", login);

router.post("/register", register);
module.exports = router;