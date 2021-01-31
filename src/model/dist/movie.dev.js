"use strict";

var mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Title: {
    type: String
  },
  Released: {
    type: Date,
    "default": Date.now
  },
  Genre: {
    type: String
  },
  Directory: {
    type: String
  }
});
var Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;