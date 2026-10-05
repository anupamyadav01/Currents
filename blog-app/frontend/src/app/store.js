import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import blogsReducer from "../features/blog/blogSlice";
import commentReducer from "../features/comment/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogsReducer,
    comments: commentReducer,
  },
});
