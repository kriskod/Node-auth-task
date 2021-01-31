const express = require("express");
const { getMovies, createMovie } = require("../controller/movies");
const { isLoggedIn, getRole } = require("../middleware/isLoggedIn");
const router = express.Router();

router.get("/", getMovies);
router.post("/", isLoggedIn, getRole, createMovie);

module.exports = router;
