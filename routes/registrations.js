const { Router } = require("express");
const router = Router();
const { create } = require("../controllers/registrations");

// Create
router.post("/registrations", create);

module.exports = router;
