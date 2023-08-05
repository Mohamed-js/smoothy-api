const { Router } = require("express");
const router = Router();
const { index } = require("../controllers/auth");

// Index
router.get("/auth", index);

module.exports = router;
