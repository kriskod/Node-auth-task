"use strict";

var Movie = require("../model/movie");

var mongoose = require("mongoose");

var isLoggedIn = require("../middleware/isLoggedIn");

exports.getMovies = function _callee(req, res) {
  var movies;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Movie.find());

        case 3:
          movies = _context.sent;
          res.status(200).json({
            movies: movies
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(404).json({
            message: "NO entries found"
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createMovie = function _callee2(req, res) {
  var newMovie;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          newMovie = new Movie({
            _id: new mongoose.Types.ObjectId(),
            Title: req.body.Title,
            Released: req.body.Released,
            Genre: req.body.Genre,
            Directory: req.body.Directory
          });
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(newMovie.save());

        case 4:
          res.status(201).json(newMovie);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          res.status(409).json({
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 7]]);
};