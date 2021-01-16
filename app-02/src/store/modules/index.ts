import { History } from 'history';
import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router';

import employee from './employee';
import post from './post';
import user from './user';

const rootReducer = (history: History) =>
  combineReducers({
    user: user.reducer,
    post: post.reducer,
    employee: employee.reducer,
    router: connectRouter(history),
  });

function* rootSaga() {
  yield all([fork(user.saga), fork(post.saga), fork(employee.saga)]);
}

export default {
  rootReducer,
  rootSaga,
};
