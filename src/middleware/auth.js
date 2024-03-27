const jwt = require("jsonwebtoken");
const db = require("../database/prisma/index");
require("dotenv").config();

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      let auth = await db.user.findFirst({
        where: { email: user.email },
      });
      if (!auth) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
