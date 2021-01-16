import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { apiEmployees } from './post.api';
import { FETCH_POSTS } from './post.reducer';

function* fetch() {
  try {
    const posts = yield call(apiEmployees);
    yield put({ type: FETCH_POSTS.SUCCESS, payload: { posts: posts.data } });
  } catch (e) {
    yield put({ type: FETCH_POSTS.FAILURE, payload: { message: e.message } });
  }
}

function* watchFetch() {
  yield takeLatest(FETCH_POSTS.REQUEST, fetch);
}

// export default [takeEvery(FETCH_POSTS.REQUEST, fetch)];

export default function* saga() {
  yield all([fork(watchFetch)]);
}
