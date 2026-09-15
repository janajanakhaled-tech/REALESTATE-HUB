const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    const dest = "uploads/properties";

    fs.mkdirSync(
      dest,
      {
        recursive: true
      }
    );

    cb(null, dest);
  },

  filename: function (req, file, cb) {

    const extension =
      file.originalname.split(".").pop();

    const fileName =
      `property-${Date.now()}-${file.fieldname}.${extension}`;

    cb(
      null,
      fileName
    );
  },
});


const fileFilter = (req, file, cb) => {

  const allowedTypes = [

    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",

    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

  ];


  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {

    cb(
      null,
      true
    );

  } else {

    cb(
      new Error(
        "Only image, PDF, and Word document files are allowed"
      ),
      false
    );

  }

};


const upload = multer({
  storage,
  fileFilter,
});


module.exports = upload; 