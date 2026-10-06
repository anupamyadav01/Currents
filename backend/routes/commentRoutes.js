const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  addComment,
  deleteComment,
  editComment,
  likeComment,
  getAllComments,
} = require("../controllers/commentController");

const commentRouter = express.Router();

commentRouter.get("/:id", getAllComments);

// comment using blog id
commentRouter.post("/:id", authMiddleware, addComment);

// delete comment usign id
commentRouter.delete("/comment/:id", authMiddleware, deleteComment);

// edit comment
commentRouter.patch("/comment/:id", authMiddleware, editComment);

// like comment
commentRouter.patch("/comment/:id", authMiddleware, likeComment);

module.exports = commentRouter;
