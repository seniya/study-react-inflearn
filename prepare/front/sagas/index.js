import { all, fork } from 'redux-saga/effects';

import userSaga from './user';
import postSaga from './post';

/*
call 은 동기 : 기다린다
fork 는 비동기 : 안기다린다 (논블록킹)
*/

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
  ]);
}
