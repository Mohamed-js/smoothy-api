const { Router } = require("express");
const { index, show } = require("../controllers/products");
const viewsCounter = require("../middlewares/viewsCounter");

const router = Router();
router.get("/products", index);
router.get("/products/:slug", viewsCounter, show);

module.exports = router;
