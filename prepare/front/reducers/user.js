const initialState = {
  isLoggedIn: false,
  user: null,
  singUpData: {},
  loginData: {}  
}

// thunkMiddleware 
export const loginAction = (data) => {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(loginRequestAction())
    axios.get('/api/login')
    .then((res)=> {
      dispatch(loginSuccessAction(res.data))
    })
    .catch((err) => {
      dispatch(loginFailureAction(err))
    })
  }
}

export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data
  }
}

export const loginSuccessAction = (data) => {
  return {
    type: 'LOG_IN_SUCCESS',
    data
  }
}

export const loginFailureAction = (data) => {
  return {
    type: 'LOG_IN_FAILURE',
    data
  }
}

export const logoutRequestAction = (data) => {
  return {
    type: 'LOG_OUT_REQUEST',
    data
  }
}

export const logoutSuccessAction = (data) => {
  return {
    type: 'LOG_OUT_SUCCESS',
    data
  }
}

export const logoutFailureAction = (data) => {
  return {
    type: 'LOG_OUT_FAILURE',
    data
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.data
      }
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    default:
      return state
  }
}

export default reducer