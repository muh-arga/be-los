const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello, this is LOS Prediction BE API" });
});

module.exports = router;