import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { apiGetPosts } from './post.api';
import { actions } from './post.reducer';

const { GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } = actions;

function* getPosts() {
  try {
    const responseData = yield call(apiGetPosts);
    yield put({ type: GET_POSTS_SUCCESS, payload: responseData });
  } catch (e) {
    yield put({ type: GET_POSTS_FAILURE, payload: e.message });
  }
}

function* watchFetch() {
  yield takeLatest(GET_POSTS_REQUEST, getPosts);
}

export default function* saga() {
  yield all([fork(watchFetch)]);
}
