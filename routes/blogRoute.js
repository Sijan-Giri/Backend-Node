const { createBlog } = require("../controller/blogController");

const router = require("express").Router();

router.route("/createBlog").post(createBlog);

module.exports = router;