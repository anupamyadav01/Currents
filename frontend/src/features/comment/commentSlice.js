import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",

  initialState,
  reducers: {
    setComments: (state, action) => {
      // console.log(action.payload.comments);

      state.comments = action.payload.comments;
    },

    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },

    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload,
      );
    },
  },
});

export const { setComments, addComment, removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
