const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
} = require("../controllers/blogController.js");
// const verifyUser = require("../middlewares/auth.js");
const {
  addComment,
  deleteComment,
  editComment,
  likeComment,
} = require("../controllers/commentController.js");
const upload = require("../middlewares/multer.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

//get all blogs
router.get("/blogs", getAllBlogs);

// post a blog
router.post("/blogs", authMiddleware, upload.single("image"), createBlog);

// get a blog by blog id
router.get("/blogs/:blogId", getBlogById);

// update blog
router.patch("/blogs/:id", authMiddleware, updateBlog);

// like a blog
router.post("/blogs/like/:id", authMiddleware, likeBlog);

//delete blog
router.delete("/blogs/:id", authMiddleware, deleteBlog);

// _____________________________________________________________________
// comment using blog id
router.post("/blogs/comment/:id", authMiddleware, addComment);

// delete comment usign id
router.delete("/blogs/comment/:id", authMiddleware, deleteComment);

// edit comment
router.patch("/blogs/comment/:id", authMiddleware, editComment);

// like comment
router.patch("/blogs/comment/:id", authMiddleware, likeComment);

module.exports = router;
