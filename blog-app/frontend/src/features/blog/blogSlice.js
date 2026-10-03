import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,

  reducers: {
    // Set / replace all blogs
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },

    // Remove one blog
    removeBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
    },

    // Blog actions
    likeBlog: (state, action) => {
      const updatedBlog = action.payload.blog || action.payload;
      const blog = state.blogs.find((b) => b._id === updatedBlog._id);

      if (blog) {
        // Only update what changed — leaves everything else intact
        blog.like = updatedBlog.like;
        blog.updatedAt = updatedBlog.updatedAt;
      }
    },

    commentBlog: (state, action) => {},

    // Comment actions
    deleteComment: (state, action) => {},

    editComment: (state, action) => {},

    likeComment: (state, action) => {},
  },
});

export const {
  setBlogs,
  removeBlog,
  likeBlog,
  commentBlog,
  deleteComment,
  editComment,
  likeComment,
} = blogsSlice.actions;

export default blogsSlice.reducer;
