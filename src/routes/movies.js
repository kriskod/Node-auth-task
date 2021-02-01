const express = require("express");
const { getMovies, getMovie, createMovie } = require("../controller/movies");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();

router.get("/", getMovies);
router.get("/:title", getMovie);
router.post("/", isLoggedIn, createMovie);

module.exports = router;
