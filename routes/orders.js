const { Router } = require("express");
const { index, create } = require("../controllers/orders");
const auth = require("../middlewares/auth");

const router = Router();
router.get("/orders", auth, index);
router.post("/orders", auth, create);

module.exports = router;
