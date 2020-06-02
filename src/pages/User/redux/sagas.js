import { takeLatest, put, call, all, fork, select } from "redux-saga/effects";
import * as actionType from "./actionType";
import * as actions from './action';
import * as api from './api';

function* requestUser(action) {
  // const { email, password } = action.payload.data; 
  // const dataSend = {
  //   email, password
  // };

  try {
    const result = yield call(api.getUser);
    console.log("result", result)

    if (result.status === 200) {
      // localStorage.setItem("token", result.data.payload.token);
      yield put(actions.requestUserSuccess(result.data));
    } else {
      yield put(actions.requestUserFail());
    }
  } catch (error) {
    console.log("erro", {error})
    yield put(actions.requestUserFail(error.response.data.message));
  }
}
function* loginSaga() {
  yield all([
    takeLatest(actionType.REQUEST_USERS, requestUser),
  ]);
}

export function* root() {
  yield all([fork(loginSaga)]);
}