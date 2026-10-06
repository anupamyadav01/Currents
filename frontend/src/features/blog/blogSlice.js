import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,

  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },

    removeBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
    },

    likeBlog: (state, action) => {
      const { blogId, userId } = action.payload;
      const blog = state.blogs.find((b) => b.blogId === blogId);
      if (blog) {
        const isLiked = blog.like.includes(userId);

        if (isLiked) {
          blog.like = blog.like.filter((id) => id !== userId);
        } else {
          blog.like.push(userId);
        }
      }
    },

    // commentBlog: (state, action) => {},

    // Comment actions
    // deleteComment: (state, action) => {},

    // editComment: (state, action) => {},

    // likeComment: (state, action) => {},
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
