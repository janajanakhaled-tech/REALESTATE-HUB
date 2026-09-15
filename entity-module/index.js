const userRouter = require("./routes/user-routes");
const authRouter = require("./routes/auth-routes");
const path = require("path");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const propertyRouter = require("./routes/property-routes.js");
const bookingRouter = require("./routes/booking-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/properties", propertyRouter);
app.use("/bookings", bookingRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    family: 4
  })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  }); 