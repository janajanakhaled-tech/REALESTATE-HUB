const path = require("path");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const propertyRouter = require("./routes/property-routes.js");

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/properties", propertyRouter);

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