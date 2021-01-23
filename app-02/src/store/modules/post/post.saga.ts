import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiAddPost, apiGetPosts } from './post.api';
import { IPostRequest } from './post.interface';
import { actions } from './post.reducer';

const {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} = actions;

function* getPosts() {
  try {
    const responseData = yield call(apiGetPosts);
    yield put({ type: GET_POSTS_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: GET_POSTS_FAILURE.type, payload: e.message });
  }
}

function* watchGetPosts() {
  yield takeLatest(GET_POSTS_REQUEST.type, getPosts);
}

function* addPost(action: PayloadAction<IPostRequest>) {
  try {
    const responseData = yield call(apiAddPost, action.payload);
    yield put({ type: ADD_POST_SUCCESS.type, payload: responseData });
  } catch (e) {
    yield put({ type: ADD_POST_FAILURE.type, payload: e.message });
  }
}

function* watchAddPosts() {
  yield takeLatest(ADD_POST_REQUEST.type, addPost);
}

export default function* saga() {
  yield all([fork(watchGetPosts), fork(watchAddPosts)]);
}
