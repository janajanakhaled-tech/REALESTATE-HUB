const express = require("express");
const router = express.Router();

const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/property-controller");

const upload = require("../middleware/multer-middleware");

router.post("/", upload.single("image"), createProperty);

router.get("/", getAllProperties);

router.get("/:id", getPropertyById);

router.patch("/:id", upload.single("image"), updateProperty);

router.delete("/:id", deleteProperty);

module.exports = router; 