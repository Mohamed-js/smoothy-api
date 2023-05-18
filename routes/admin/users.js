const { Router } = require("express");
const { index } = require("../../controllers/admin/users");

const router = Router();
router.get("/users", index);

module.exports = router;
