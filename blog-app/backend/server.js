const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cloudinaryConfig = require("./config/cloudinaryConfig");
const connectDB = require("./config/connectDB.js");
const userRouter = require("./routes/userRoutes.js");
const blogRouter = require("./routes/blogRoutes.js");
const cloudinary = require("cloudinary").v2;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", userRouter);
app.use("/api/v1", blogRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000...");
  connectDB();
  cloudinaryConfig();
});
