const verifyUser = require("../middlewares/auth.js");
const blogModel = require("../models/blogModel.js");
const userModel = require("../models/userModel.js");
const CommentModel = require("../models/commentModel.js");
const upload = require("../middlewares/multer.js");
const uploadImage = require("../utils/uploadImage.js");
const fs = require("fs");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().populate({
      path: "creator",
      select: "name",
    });
    if (!blogs) {
      return res.status(200).json({ message: "No blogs available" });
    }
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(400).json({ message: "Please provide a Blog ID" });
    }
    // const requestedBlog = await blogModel.findById(blogId).populate("creator");
    const requestedBlog = await blogModel.findById(blogId).populate({
      path: "creator",
      select: "name",
    });
    return res.status(200).json({
      success: true,
      requestedBlog,
    });
  } catch (error) {
    console.log("Error in here", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const createBlog = async (req, res) => {
  const creator = req.user;
  const image = req.file;
  const { title, description, draft } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }
  try {
    const findUser = await userModel.findById(creator);
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { secure_url, public_id } = await uploadImage(image.path);

    fs.unlinkSync(image.path);

    const newBlog = await blogModel.create({
      title,
      description,
      draft,
      creator,
      image: secure_url,
      imageId: public_id,
    });

    await userModel.findByIdAndUpdate(creator, {
      $push: { blogs: newBlog._id },
    });
    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      newBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);

    const data = req.body;
    if (!blogId) {
      return res.status(400).json({ message: "Invalid blog update request" });
    }
    const requestedBlog = await blogModel.findByIdAndUpdate(blogId, data, {
      returnDocument: "after",
    });
    if (!requestedBlog) {
      return res.status(400).json({ message: "Requested blog dosen't exist." });
    }
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog: requestedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user;

    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const alreadyLiked = blog.like?.some(
      (id) => id.toString() === userId.toString(),
    );

    const updateQuery = alreadyLiked
      ? { $pull: { like: userId } }
      : { $push: { like: userId } };

    const updatedBlog = await blogModel.findByIdAndUpdate(blogId, updateQuery, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: alreadyLiked ? "Blog unliked" : "Blog liked",
      likesCount: updatedBlog.like.length,
      blog: updatedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    console.log("deleteBlog");

    const blogId = req.params.id;
    console.log(blogId);

    if (!blogId) {
      return res.status(400).json({ message: "Please provide a Blog ID" });
    }
    const deletedBlog = await blogModel.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(400).json({ message: "Requested blog dosen't exist." });
    }

    // await duploadImage.eleteImageFromCloudinary(blog.imageId);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
};
