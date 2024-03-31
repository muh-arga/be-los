const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const patientController = require("../controller/patientController");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello, this is LOS Prediction BE API" });
});

router.get("/users", userController.index);

router.post("/auth/login", authController.login);
router.get("/auth/me", auth, authController.getAuthUser);

router.post("/patients", auth, patientController.insert);
router.get("/patients", auth, patientController.getAll);
router.get("/patients/:id", auth, patientController.getById);
router.put("/patients/update/:id", auth, patientController.update);
router.delete("/patients/delete/:id", auth, patientController.delete);

module.exports = router;
