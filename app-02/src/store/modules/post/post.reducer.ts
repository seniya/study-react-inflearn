import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostState, IPostResponse } from './post.interface';

const initialState: IPostState = {
  isLoading: false,
  isDone: false,
  error: null,
  posts: [],
};

const postSlice = createSlice({
  name: 'postSlice',
  initialState: initialState as IPostState,
  reducers: {
    GET_POSTS_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
    },
    GET_POSTS_SUCCESS(state, action: PayloadAction<IPostResponse>) {
      state.isLoading = false;
      state.isDone = true;
      state.error = null;
      state.posts = action.payload.data;
    },
    GET_POSTS_FAILURE(state, action: PayloadAction<{ message: string }>) {
      state.isLoading = false;
      state.isDone = false;
      state.error = action.payload.message;
      state.posts = [];
    },
  },
});

const combineReducer = combineReducers({
  postReducer: postSlice.reducer,
});

export const actions = postSlice.actions;
export default combineReducer;
