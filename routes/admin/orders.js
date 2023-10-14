const { Router } = require("express");
const { index, update, destroy } = require("../../controllers/admin/orders");

const router = Router();
router.get("/orders", index);
router.patch("/orders/:id", update);
router.delete("/orders/:id", destroy);

module.exports = router;
