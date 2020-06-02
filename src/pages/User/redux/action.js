import * as actionType from "./actionType";

export const requestUser = () => ({
  type: actionType.REQUEST_USERS,
});

export const requestUserSuccess = data => ({
  type: actionType.REQUEST_USERS_SUCCESS,
  payload: { data },
});

export const requestUserFail = error => ({
  type: actionType.REQUEST_USERS_FAILED,
  payload: { error },
});