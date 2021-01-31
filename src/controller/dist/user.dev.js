"use strict";

var mongoose = require("mongoose");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

require("dotenv").config();

var User = require("../model/user");

var users = require("../auth");

exports.register = function _callee(req, res) {
  var _req$body, username, password, isUser, hash, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 4:
          isUser = _context.sent;

          if (!isUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: "User already exist"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

        case 9:
          hash = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(User.create({
            username: username,
            password: hash
          }));

        case 12:
          user = _context.sent;
          res.status(201).json({
            message: "User created",
            user: user
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          res.stat(500).json({
            message: "Something went wrong"
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 16]]);
}; // exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const isUser = await User.findOne({ username });
//     if (!isUser) {
//       return res.status(404).json({ message: "User doesn't exist" });
//     }
//     const isMatch = await bcrypt.compare(password, isUser.password);
//     if (isMatch) {
//       const jwt_token = jwt.sign(
//         {
//           userId: isUser.id,
//           name: isUser.username,
//           role: isUser.role,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: 30 * 60 }
//       );
//       res.status(200).json({ message: "User logged in", jwt_token });
//     } else {
//       res.status(400).json({ message: "Passwords don't match" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };