const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  propertyType: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: null,
  },

  bedrooms: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Property", propertySchema); 