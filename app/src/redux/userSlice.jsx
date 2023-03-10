import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
    postList: [],
    commentList: [],
    likeList: [],
    dislikeList: [],
    messageList: [],
  },
  reducers: {
    setUserList(state, action) {
      state.userList = action.payload;
    },
    setPostList(state, action) {
      state.postList = action.payload;
    },
    setCommentList(state, action) {
      state.commentList = action.payload;
    },
    setLikeList(state, action) {
      state.likeList = action.payload;
    },
    setDislikeList(state, action) {
      state.dislikeList = action.payload;
    },
    setMessageList(state, action) {
      state.messageList = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
