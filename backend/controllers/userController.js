const userModel = require("../models/userModel.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMe = async (req, res) => {
  // console.log("we are here in get me");

  res.json({
    success: true,
    user: req.user,
  });
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, blogs } = req.body;
    console.log(name, email, password, blogs);

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please enter name",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter email",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter password",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      blogs,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser: {
        name: newUser.name,
        email: newUser.name,
        blogs: newUser.blogs,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: { error: error.message, actual: "error during creating user" },
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter email",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter password",
      });
    }

    const user = await userModel.findOne({ email });

    await bcrypt.compare(password, user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign(
      { email: user.email, name: user.name, id: user._id },
      privateKey,
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).send({
      sucess: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {};

const logoutUser = async (req, res) => {
  try {
    // Cookie ko clear karo
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  getUserById,
  updateUser,
  getMe,
  logoutUser,
};
