import * as actionType from './actionType';

const defaultState = {
  isSending: false,
  isLogin: false,
  error: "",
  list: []
}


export const users = (state= defaultState, action) => {
  switch(action.type) {
    case actionType.REQUEST_USERS: {
      return {...state, isSending: true}
    }
    case actionType.REQUEST_USERS_SUCCESS: {
      const {data} = action.payload;
      return {...state, isSending: false, list: data}
    }
    case actionType.REQUEST_USERS_FAILED: {
      return {...state, isSending: false}
    }
    default:
      return state;
  }
}