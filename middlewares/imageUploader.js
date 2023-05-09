const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const imageUploader = multer({ storage: storageEngine });

module.exports = imageUploader;
