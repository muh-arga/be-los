const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello, this is LOS Prediction BE API" });
});

router.get("/users", userController.index);

router.post("/auth/login", authController.login);
router.get("/auth/me", auth, authController.getAuthUser);

module.exports = router;