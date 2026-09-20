const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
} = require("../controllers/blogController.js");
const verifyUser = require("../middlewares/auth.js");
const {
  addComment,
  deleteComment,
  editComment,
  likeComment,
} = require("../controllers/commentController.js");
const upload = require("../middlewares/multer.js");

const router = express.Router();

//get all blogs
router.get("/blogs", getAllBlogs);

// post a blog
router.post("/blogs", verifyUser, upload.single("image"), createBlog);

// get a blog by blog id
router.get("/blogs/:id", getBlogById);

// update blog
router.patch("/blogs/:id", verifyUser, updateBlog);

// like a blog
router.post("/blogs/like/:id", verifyUser, likeBlog);

//delete blog
router.delete("/blogs/:id", verifyUser, deleteBlog);

// _____________________________________________________________________
// comment using blog id
router.post("/blogs/comment/:id", verifyUser, addComment);

// delete comment usign id
router.delete("/blogs/comment/:id", verifyUser, deleteComment);

// edit comment
router.patch("/blogs/comment/:id", verifyUser, editComment);

// like comment
router.patch("/blogs/comment/:id", verifyUser, likeComment);

module.exports = router;
