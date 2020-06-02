import * as actionType from './actionType';

const defaultState = {
  isSending: false,
  isLogin: false,
  error: "",
  user: {},
  access_token: null,
  access_token_expired: 0,
  refresh_token: null,
  refresh_token_expired: 0,
}


export const login = (state= defaultState, action) => {
  switch(action.type) {
    case actionType.LOGIN_SEND_REQUEST: {
      return {...state, isSending: true}
    }
    case actionType.LOGIN_SEND_REQUEST_SUCCESS: {
      // const { data } = action.payload;
      return {
        ...state,
        isSending: false,
        isLogin: true,
        // user: data,
        // access_token: data.access_token,
        // access_token_expired: data.access_token_expired,
        // refresh_token: data.refresh_token,
        // refresh_token_expired: data.refresh_token_expired,
      }
    }
    case actionType.LOGIN_SEND_REQUEST_FAILED: {
      return {...state, isSending: false}
    }
    case actionType.REFRESH_TOKEN_SUCCESS: {
      const {data} = action.payload;
      return {
        ...state,
        access_token: data.access_token,
        access_token_expired: data.access_token_expired,
      };
    }
    case actionType.REFRESH_TOKEN_FAILED: {
      return {...state, isLogin: false}
    }
    case actionType.LOG_OUT: {
      return {...state, isLogin: false}
    }
    default:
      return state;
  }
}