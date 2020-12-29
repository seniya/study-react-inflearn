import { HYDRATE } from 'next-redux-wrapper';

import { combineReducers } from 'redux';
import user from './user';
import post from './post';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE : ', action);
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  },
  user,
  post,
});

// changeNickname('hello !!')

// (이전상태, 액션) => 다음상태
/*
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE : ', action)
      return {
        ...state,
        ...action.payload
      }
    case 'CHANGE_NICKNAME':
      return {
        ...state,
        name: action.data
      }

    default:
      return state
    }
}
*/

export default rootReducer;
