const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const isLoggedIn = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  const bearer = token.split(" ")[1];
  let user_role;
  if (bearer) {
    jwt.verify(bearer, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token may be wrong or expired" });
      } else {
        req.userId = decoded.userId;
        user_role = decoded.role;
        res.cookie("user_role", user_role);
      }
    });
  } else {
    res.status(401).json({ message: "No access token" });
  }
  next();
};

module.exports = isLoggedIn;
