const express = require("express");

const router = express.Router();

const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/property-controller");

const upload =
  require("../middleware/multer-middleware");

const protect =
  require("../middleware/auth-middleware");

const authorize =
  require("../middleware/authorize-middleware");


// Create Property
// Agent + Admin only

router.post(
  "/",
  protect,
  authorize("agent", "admin"),
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "document",
      maxCount: 1,
    },
  ]),
  createProperty
);


// Get All Properties
// Everyone can view

router.get(
  "/",
  getAllProperties
);


// Get Property By ID
// Everyone can view

router.get(
  "/:id",
  getPropertyById
);


// Update Property
// Agent + Admin only

router.patch(
  "/:id",
  protect,
  authorize("agent", "admin"),
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "document",
      maxCount: 1,
    },
  ]),
  updateProperty
);


// Delete Property
// Agent + Admin only

router.delete(
  "/:id",
  protect,
  authorize("agent", "admin"),
  deleteProperty
);


module.exports = router; 