const express = require("express");

const userController =
  require("../controllers/user-controller");

const protect =
  require("../middleware/auth-middleware");

const authorize =
  require("../middleware/authorize-middleware");

const router = express.Router();


router.get(
  "/profile",
  protect,
  userController.getProfile
);


router.get(
  "/",
  protect,
  authorize("admin"),
  userController.getAllUsers
);


router.patch(
  "/:id/role",
  protect,
  authorize("admin"),
  userController.updateUserRole
);


module.exports = router; 