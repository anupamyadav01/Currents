const verifyUser = require("../middlewares/auth.js");
const blogModel = require("../models/blogModel.js");
const userModel = require("../models/userModel.js");
const CommentModel = require("../models/commentModel.js");
const { uploadImage } = require("../utils/uploadImage.js");
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require("uuid");

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
  const { blogId } = req.params;

  // Validate blogId
  if (!blogId) {
    return res.status(400).json({
      success: false,
      message: "Please provide a Blog ID",
    });
  }

  try {
    const requestedBlog = await blogModel.findOne({ blogId }).populate({
      path: "creator",
      select: "name avatar",
      populate: {
        path: "blogs",
        select: "blogId title description image createdAt",
      },
    });

    if (!requestedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      requestedBlog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const createBlog = async (req, res) => {
  const creator = req.user;
  const image = req.file;
  console.log("from create blog", creator);

  const { title, description, content, draft } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }
  try {
    const blogId =
      title.toLowerCase().replace(/\s+/g, "-") +
      "-" +
      uuidv4().substring(0, 10);

    const findUser = await userModel.findById(creator._id);
    console.log("this is find user", findUser);

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { secure_url, public_id } = await uploadImage(image?.path);

    fs.unlinkSync(image.path);

    const newBlog = await blogModel.create({
      title,
      description,
      blogId,
      content,
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
      message1: "error in create blog",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const existingBlog = await blogModel.findOne({ blogId });
    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Requested blog doesn't exist.",
      });
    }

    const { title, description, content, draft } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    const updateData = {
      title,
      description,
      content,
    };

    if (draft !== undefined) {
      updateData.draft = draft;
    }

    if (req.file) {
      const { secure_url, public_id } = await uploadImage(req.file.path);

      fs.unlinkSync(req.file.path);

      updateData.image = secure_url;
      updateData.imageId = public_id;
      if (existingBlog.imageId) {
        try {
          await deleteImage(existingBlog.imageId);
        } catch (cloudinaryError) {
          console.error("Failed to delete old image:", cloudinaryError.message);
        }
      }
    }
    const updatedBlog = await blogModel.findOneAndUpdate(
      { blogId },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    if (req.file?.path) {
      try {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (fileError) {
        console.error("Failed to cleanup temp file:", fileError.message);
      }
    }

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
  const blogId = req.params.id;
  // console.log(blogId);
  if (!blogId) {
    return res.status(400).json({ message: "Please provide a Blog ID" });
  }
  try {
    const deletedBlog = await blogModel.deleteOne({ blogId });
    console.log(deleteBlog);

    if (deletedBlog.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
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
