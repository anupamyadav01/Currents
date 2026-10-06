const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
} = require("../controllers/blogController.js");

const upload = require("../middlewares/multer.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

//get all blogs
router.get("/", getAllBlogs);

// post a blog
router.post("/", authMiddleware, upload.single("image"), createBlog);

// get a blog by blog id
router.get("/:blogId", getBlogById);

// update blog
router.patch("/:id", authMiddleware, upload.single("image"), updateBlog);

// like a blog
router.post("/like/:id", authMiddleware, likeBlog);

//delete blog
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
