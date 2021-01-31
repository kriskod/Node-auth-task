const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const isLoggedIn = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ message: "Couldn't find access token" });
  const bearer = token.split(" ")[1];

  if (bearer) {
    jwt.verify(bearer, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token may be wrong or expired" });
      } else {
        req.userId = decoded.userId;
        const user_role = decoded.role;
        console.log(user_role);
        return user_role;
      }
    });
  } else {
    res.status(401).json({ message: "No access token" });
  }
  next();
};

const getRole = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ message: "Couldn't find access token" });
  const bearer = token.split(" ")[1];
  const decoded = jwt.decode(bearer, JWT_SECRET);
  const user_role = decoded.role;
  console.log(user_role);
  return user_role;
};

module.exports = isLoggedIn;
module.exports = getRole;
