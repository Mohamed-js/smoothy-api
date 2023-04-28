const { Router } = require("express");
const router = Router();
const { create } = require("../controllers/sessions");

// Create
router.post("/sessions", create);

module.exports = router;
