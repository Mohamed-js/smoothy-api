const { Router } = require("express");
const {
  index,
  create,
  destroy,
  patch,
} = require("../controllers/userproducts");
const auth = require("../middlewares/auth");

const router = Router();
router.get("/cart-items", auth, index);
router.post("/cart-items", auth, create);
router.delete("/cart-items/:id", auth, destroy);
router.patch("/cart-items/:id", auth, patch);

module.exports = router;
