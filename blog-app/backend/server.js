const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cloudinaryConfig = require("./config/cloudinaryConfig");
const connectDB = require("./config/connectDB.js");
const userRouter = require("./routes/userRoutes.js");
const blogRouter = require("./routes/blogRoutes.js");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/v1", userRouter);
app.use("/api/v1", blogRouter);

app.listen(PORT, () => {
  console.log(`sErVeR is running on port ${PORT}`);
  connectDB();
  cloudinaryConfig();
});
