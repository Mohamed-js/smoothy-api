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

module.exports = { formatErrorFor, imageUrlFormatter, slugify };
