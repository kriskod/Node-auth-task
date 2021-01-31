"use strict";

var express = require("express");

var _require = require("../controller/movies"),
    getMovies = _require.getMovies,
    createMovie = _require.createMovie;

var _require2 = require("../middleware/isLoggedIn"),
    isLoggedIn = _require2.isLoggedIn,
    getRole = _require2.getRole;

var router = express.Router();
router.get("/", getMovies);
router.post("/", isLoggedIn, getRole, createMovie);
module.exports = router;