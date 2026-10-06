const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cloudinaryConfig = require("./config/cloudinaryConfig");
const connectDB = require("./config/connectDB.js");
const userRouter = require("./routes/userRoutes.js");
const blogRouter = require("./routes/blogRoutes.js");
const cookieParser = require("cookie-parser");
const commentRouter = require("./routes/commentRoutes");
const cloudinary = require("cloudinary").v2;
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const url = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: url,
    credentials: true,
  }),
);

app.use("/api/v1", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/comments", commentRouter);

app.listen(PORT, () => {
  console.log(`sErVeR is running on port ${PORT}`);
  connectDB();
  cloudinaryConfig();
});
