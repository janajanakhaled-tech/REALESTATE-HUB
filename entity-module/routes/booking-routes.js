const express = require("express");
const bookingController = require("../controllers/booking-controller");
const protect = require("../middleware/auth-middleware");
const authorize = require("../middleware/authorize-middleware");
const router = express.Router();
 router.post(
  "/",
  protect,
  authorize("customer"),
  bookingController.createBooking
);
router.get(
  "/my-bookings",
  protect,
  bookingController.getMyBookings
);
router.get(
  "/",
  protect,
  authorize("admin"),
  bookingController.getAllBookings
);
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  bookingController.updateBookingStatus
);
router.patch(
  "/:id/cancel",
  protect,
  bookingController.cancelBooking
);
module.exports = router;