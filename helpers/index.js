const imageUrlFormatter = (req) =>
  `${req.protocol}://${req.get("host")}/uploads/products/${req.file.filename}`;

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

module.exports = { formatErrorFor, imageUrlFormatter };
