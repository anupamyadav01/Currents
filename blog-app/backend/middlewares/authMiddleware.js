const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const privateKey = "something-private-key";
const authMiddleware = async (req, res, next) => {
  // const token = req?.headers?.authorization?.split(" ")[1];
  const token = req.cookies.token;
  console.log("token from cookes", token);

  if (!token) {
    return res.status(401).json({ message: "Not authenticated, no token" });
  }
  try {
    const decoded = jwt.verify(token, privateKey);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(decoded, user);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
