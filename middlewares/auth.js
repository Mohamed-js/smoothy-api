const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ errors: "Access denied" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;

    next();
  } catch (e) {
    res.status(401).json({ errors: "Access denied" });
  }
};

module.exports = auth;
