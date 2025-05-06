const { createBlog, getBlogs, getSingleBlog, deleteBlog } = require("../controller/blogController");

const router = require("express").Router();

router.route("/blog")
.post(createBlog)
.get(getBlogs);

router.route("/blog/:id").get(getSingleBlog).delete(deleteBlog)

module.exports = router;