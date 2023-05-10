const cloudinary = require("cloudinary").v2;

const imageUrlFormatter = (req) =>
  `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

const formatErrorFor = (err, model) => {
  let errMessage = {};
  if (err.code === 11000) {
    errMessage.email = "Email already exists.";
  }
  if (err.message.includes(`${model} validation failed`)) {
    Object.values(err.errors).forEach(({ properties }) => {
      errMessage[properties.path] = properties.message;
    });
  }
  return errMessage;
};

const slugify = (title) => {
  return title.toLowerCase().split(" ").join("-");
};

const initCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  return cloudinary;
};

module.exports = { formatErrorFor, imageUrlFormatter, slugify, initCloudinary };
