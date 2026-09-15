const express = require("express");
const authControllers = require("../controllers/auth-controller");
const protect = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.get("/me", protect, authControllers.getMe);

module.exports = router; 