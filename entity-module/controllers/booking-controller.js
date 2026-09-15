const Booking = require("../models/booking-model");
const createBooking = async (req, res) => {
  try {
    const { property, date, notes } = req.body;
    const booking = await Booking.create({
      property,
      customer: req.user._id,
      date,
      notes,
    });
    const populatedBooking = await Booking.findById(
      booking._id
    )
      .populate("property")
      .populate("customer", "firstName lastName email phone");
    res.status(201).json({
      status: "success",
      data: {
        booking: populatedBooking,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.user._id,
    })
      .populate("property")
      .sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("property")
      .populate(
        "customer",
        "firstName lastName email phone"
      )
      .sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("property")
      .populate(
        "customer",
        "firstName lastName email phone"
      );
    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "Booking not found.",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        customer: req.user._id,
      },
      {
        status: "cancelled",
      },
      {
        new: true,
      }
    );
    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "Booking not found.",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
};