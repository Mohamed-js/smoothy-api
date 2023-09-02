const { Router } = require("express");
const {
  index,
  show,
  create,
  update,
  destroy,
} = require("../../controllers/admin/products");
const { seederIndex } = require("../../seeders/products");
const imageUploader = require("../../middlewares/imageUploader");

const router = Router();
router.get("/products", index);
router.get("/products/:id", show);
router.post("/products", imageUploader.single("image"), create);
router.patch("/products/:id", update);
router.delete("/products/:id", destroy);

// SEED PRODUCTS
router.get("/seeders/products", seederIndex);

module.exports = router;
