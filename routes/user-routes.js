const express = require("express");
const userController = require("../controllers/user-controller");
const protect = require("../middleware/auth-middleware");
const authorize = require("../middleware/authorize-middleware");
const router = express.Router();
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Welcome Admin",
    });
  }
);



router.get("/profile", protect, userController.getProfile);

module.exports = router;