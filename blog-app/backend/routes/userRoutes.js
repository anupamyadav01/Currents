const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  loginUser,
  getMe,
  logoutUser,
} = require("../controllers/userController.js");
const verifyUser = require("../middlewares/auth.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.post("/users/login", loginUser);
router.post("/users/logout", logoutUser);
router.get("/users/:id", getUserById);
router.get("/me", authMiddleware, getMe);
router.patch("/users/:id", updateUser);

module.exports = router;
