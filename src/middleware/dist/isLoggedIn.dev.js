"use strict";

var jwt = require("jsonwebtoken");

require("dotenv").config();

var JWT_SECRET = process.env.JWT_SECRET;

var isLoggedIn = function isLoggedIn(req, res, next) {
  var token, bearer;
  return regeneratorRuntime.async(function isLoggedIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.headers["authorization"];

          if (token) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: "Couldn't find access token"
          }));

        case 3:
          bearer = token.split(" ")[1];

          if (bearer) {
            jwt.verify(bearer, JWT_SECRET, function (err, decoded) {
              if (err) {
                res.status(401).json({
                  message: "Token may be wrong or expired"
                });
              } else {
                req.userId = decoded.userId;
                var user_role = decoded.role;
                console.log(user_role);
                return user_role;
              }
            });
          } else {
            res.status(401).json({
              message: "No access token"
            });
          }

          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getRole = function getRole(req, res, next) {
  var token, bearer, decoded, user_role;
  return regeneratorRuntime.async(function getRole$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = req.headers["authorization"];

          if (token) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: "Couldn't find access token"
          }));

        case 3:
          bearer = token.split(" ")[1];
          decoded = jwt.decode(bearer, JWT_SECRET);
          user_role = decoded.role;
          console.log(user_role);
          return _context2.abrupt("return", user_role);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = isLoggedIn;
module.exports = getRole;