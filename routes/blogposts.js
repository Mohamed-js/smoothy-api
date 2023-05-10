const { Router } = require("express");
const { index, show, create } = require("../controllers/blogposts");
const auth = require("../middlewares/auth");
const imageUploader = require("../middlewares/imageUploader");

const router = Router();
router.get("/blogposts", index);
router.get("/blogposts/:slug", show);
router.post("/blogposts", imageUploader.single("image"), create);

module.exports = router;
