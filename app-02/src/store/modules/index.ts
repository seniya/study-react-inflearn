import { combineReducers } from 'redux';
import { ForkEffect } from 'redux-saga/effects';

import employee from './employee';
import post from './post';

const combineSagas = (param: { [key: string]: ForkEffect<never>[] }) =>
  function* () {
    const targetSagas = Object.values(param).flat();

    for (let i = 0; i < targetSagas.length; i++) {
      yield targetSagas[i];
    }
  };

export default {
  rootReducer: combineReducers({ employee: employee.reducer, post: post.reducer }),
  rootSagas: combineSagas({ employee: employee.saga, post: post.saga }),
};
