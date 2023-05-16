const { Router } = require("express");
const { index, show, create, update } = require("../controllers/products");
const viewsCounter = require("../middlewares/viewsCounter");
const imageUploader = require("../middlewares/imageUploader");

const router = Router();
router.get("/products", index);
router.get("/products/:slug", viewsCounter, show);
router.post("/products", imageUploader.single("image"), create);
router.patch("/products/:id", update);

module.exports = router;
