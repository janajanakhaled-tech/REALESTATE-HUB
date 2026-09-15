const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = "uploads/properties";

    fs.mkdirSync(dest, { recursive: true });

    cb(null, dest);
  },

  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const fileName = `property-${Date.now()}.${extension}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const type = file.mimetype.split("/")[0];

  if (type === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;