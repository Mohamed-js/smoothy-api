const { User } = require("../models/schema");
const jwt = require("jsonwebtoken");

const index = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ errors: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findByPk(decoded.userId);
    if (user) {
      return res.json({ message: "exists" });
    }
    res.json({ message: "does not exists" });
  } catch (e) {
    res.status(401).json({ errors: "Access denied" });
  }
};

module.exports = { index };
