const { Router } = require("express");
const { index } = require("../../controllers/admin/orders");

const router = Router();
router.get("/orders", index);

module.exports = router;
