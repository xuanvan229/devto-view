import * as actionType from "./actionType";

export const sendLogin = (data, toast) => ({
  type: actionType.LOGIN_SEND_REQUEST,
  payload: {data , toast},
});

export const receiveLoginSuccess = data => ({
  type: actionType.LOGIN_SEND_REQUEST_SUCCESS,
  payload: { data },
});

export const receiveLoginFail = error => ({
  type: actionType.LOGIN_SEND_REQUEST_FAILED,
  payload: { error },
});


export const refreshToken = data => ({
  type: actionType.REFRESH_TOKEN,
  payload: {data},
});

export const refreshTokenSuccess = data => ({
  type: actionType.REFRESH_TOKEN_SUCCESS,
  payload: { data },
});

export const refreshTokenFail = error => ({
  type: actionType.REFRESH_TOKEN_FAILED,
  payload: { error },
});

export const logout = data => ({
  type: actionType.LOG_OUT,
});