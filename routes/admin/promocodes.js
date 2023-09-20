const { Router } = require("express");
const {
  index,
  show,
  create,
  update,
  destroy,
} = require("../../controllers/admin/promocodes");

const router = Router();
router.get("/promocodes", index);
router.get("/promocodes/:id", show);
router.post("/promocodes", create);
router.patch("/promocodes/:id", update);
router.delete("/promocodes/:id", destroy);

module.exports = router;
