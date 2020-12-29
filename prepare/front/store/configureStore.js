// configure store
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas'; // <== thunk 보다 추가됨

import reducer from '../reducers';

// const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
//   // console.log('loggerMiddleware : ', action, dispatch, getState)
//   return next(action)
// }

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware(); // <== thunk 보다 추가됨
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);

  store.sagaTask = sagaMiddleware.run(rootSaga); // <== thunk 보다 추가됨
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
