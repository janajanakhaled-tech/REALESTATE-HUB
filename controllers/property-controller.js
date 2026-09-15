const Property = require("../models/property-model");

const createProperty = async (req, res) => {
  try {
    const property = await Property.create({...req.body,
      image: req.file ? req.file.filename : null,
    }); 

    res.status(201).json({
      status: "success",
      data: {
        property
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json({
      status: "success",
      data: {
        properties
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        status: "error",
        message: "Property not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        property
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
    } 
        const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!property) {
      return res.status(404).json({
        status: "error",
        message: "Property not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        property
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        status: "error",
        message: "Property not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
}; 