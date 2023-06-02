const { Router } = require("express");
const { index, update } = require("../../controllers/admin/orders");

const router = Router();
router.get("/orders", index);
router.patch("/orders/:id", update);

module.exports = router;
