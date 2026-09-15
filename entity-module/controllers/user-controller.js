const User = require("../models/user-model");

const getProfile = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName,
        lastName,
        phone,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });

  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });

  } catch (error) {

    res.status(400).json({
      status: "fail",
      message: error.message,
    });

  }
};


const updateUserRole = async (req, res) => {
  try {

    const { role } = req.body;

    if (!["admin", "customer", "agent"].includes(role)) {

      return res.status(400).json({
        status: "fail",
        message: "Invalid role.",
      });

    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        role,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {

      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });

    }

    res.status(200).json({
      status: "success",
      data: {
        user,
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
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserRole,
}; 