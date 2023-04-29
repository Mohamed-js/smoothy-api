const { formatErrorFor } = require("../helpers");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).send({ error: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.json({ message: "Signed up successfully.", token: token });
  } catch (err) {
    res.status(500).json({ errors: formatErrorFor(err, "user") });
  }
};

module.exports = { create };
