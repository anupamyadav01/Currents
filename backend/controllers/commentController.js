const blogModel = require("../models/blogModel");
const CommentModel = require("../models/commentModel");

const getAllComments = async (req, res) => {
  try {
    const blogId = req.params.id;
    const comments = await CommentModel.find({
      blogId: blogId,
    }).populate({
      path: "user",
    });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};

const addComment = async (req, res) => {
  const { comment } = req.body;
  const blogId = req.params.id;
  const user = req.user;

  if (!comment || comment.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Comment text cannot be empty",
    });
  }

  try {
    const blog = await blogModel.findOne({ blogId });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const newComment = await CommentModel.create({
      comment: comment.trim(),
      blog: blog._id,
      blogId,
      user: user._id,
    });

    // Populate user before sending response
    await newComment.populate("user", "name");

    return res.status(201).json({
      success: true,
      message: "Comment posted successfully",
      newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user;

  try {
    const comment = await CommentModel.findById(commentId).populate({
      path: "blog",
      select: "creator",
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // user must be comment author OR blog creator
    const isCommentAuthor = comment.user?.toString() === userId.toString();
    const isBlogCreator =
      comment.blog?.creator?.toString() === userId.toString();

    if (!isCommentAuthor && !isBlogCreator) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }

    await CommentModel.findByIdAndDelete(commentId);

    // Remove the comment reference from the parent blog's comment array
    if (comment.blog?._id) {
      await blogModel.findByIdAndUpdate(comment.blog._id, {
        $pull: { comment: commentId },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const likeComment = async (req, res) => {
  // const userId = req.user;
  const commentId = req.params.id;
  try {
    const comment = await CommentModel.findById(commentId);
    return res.status(200).json({
      success: true,
      message: "comment liked sucessfully",
      comment,
    });
  } catch (error) {}
};

const editComment = async (req, res) => {
  const userId = req.user;
  const commentId = req.params.id;
  const { newComment } = req.body;

  try {
    if (!newComment || newComment.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "New comment text cannot be empty",
      });
    }

    const oldComment = await CommentModel.findById(commentId);

    if (!oldComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Ownership verification
    if (oldComment.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this comment",
      });
    }
    const comment = await CommentModel.findByIdAndUpdate(
      commentId,
      { comment: newComment.trim() },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Comment edited successfully",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addComment,
  deleteComment,
  likeComment,
  editComment,
  getAllComments,
};

{
  // populate in simple terms-
  // populate()- ID ke badle us ID se related actual document ki information le aao.
  // blogModel
  //       .findByIdAndUpdate(
  //         blogId,
  //         { $push: { comment: newComment._id } },----->>>> This will give me a blog
  //         { new: true },
  //       )
  //.populate("comment") karte ho, Mongoose bolta hai:
  // "Blog ke comment field mein IDs hain. Un IDs ke corresponding Comment documents bhi fetch karo."
  // Ab comment ki ID ki jagah complete Comment document aa gaya.
  //     populate: {
  //   path: "user"
  // }
  // Comment ke user field ko bhi populate karo.
}
