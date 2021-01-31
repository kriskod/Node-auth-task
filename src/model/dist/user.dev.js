"use strict";

var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  role: String
});
var User = mongoose.model("User", userSchema);
module.exports = User;