require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/user-model");

mongoose
  .connect(process.env.MONGO_URI, {
    family: 4
  })
  .then(async () => {

    console.log("Connected to MongoDB");

    const user = await User.findOne({
      email: "jana999@gmail.com"
    });

    if (!user) {
      console.log("User not found");
      process.exit();
    }

    user.role = "admin";

    await user.save();

    console.log("User is now ADMIN!");
    console.log(user);

    process.exit();

  })
  .catch((error) => {

    console.log(
      "ERROR:",
      error
    );

    process.exit(1);

  });