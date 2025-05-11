const { createBlog, getBlogs, getSingleBlog, deleteBlog, updateBlog } = require("../controller/blogController");
const { storage, multer } = require("../middleware/multerConfig");

const router = require("express").Router();

const upload = multer({storage : storage})

router.route("/blog")
.post(upload.single('image'), createBlog)
.get(getBlogs);

router.route("/blog/:id")
.get(getSingleBlog)
.delete(deleteBlog)
.patch(upload.single("image"),updateBlog)

module.exports = router;