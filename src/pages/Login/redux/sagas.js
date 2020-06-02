import { takeLatest, put, call, all, fork, select } from "redux-saga/effects";
import * as actionType from "./actionType";
import * as actions from './action';
import * as actionsUser from '../../User/redux/action';

import * as api from './api';

const getaccess_token = state => state.login.access_token;
const getaccess_token_expired = state => state.login.access_token_expired;
const getrefresh_token = state => state.login.refresh_token;
const getrefresh_token_expired = state => state.login.refresh_token_expired;


function* submitLogin(action) {
  const { username, password } = action.payload.data;
  const dataSend = {
    user: {
      username, password
    }
  };

  try {
    const result = yield call(api.sendLoginAPI, dataSend);
    console.log("result login ==============", result);
    if (result.status === 200) {
      // localStorage.setItem("token", result.data.access_token);
      yield put(actions.receiveLoginSuccess(result.data));
      // yield put(actionsUser.requestUser());
    } else {
      yield put(actions.receiveLoginFail());
    }
  } catch (error) {
    action.payload.toast.error(error.response.data.message, {
      position: action.payload.toast.POSITION.TOP_LEFT
    })
    yield put(actions.receiveLoginFail(error.response.data.message));
  }
}



function* refreshTokenSaga(action) {
  const access_token = yield select(getaccess_token);
  const access_token_expired = yield select(getaccess_token_expired);
  const refresh_token = yield select(getrefresh_token);
  const refresh_token_expired = yield select(getrefresh_token_expired);
  const timeNow = Date.now() / 1000;
  console.log("it timeeeeeeeeeeeeeeee", access_token_expired , refresh_token_expired);
  if (refresh_token_expired - timeNow <=   0) {
    console.log("go to NavigationService")
    // NavigationService.push('Login');
    yield put(actions.refreshTokenFail("error"))
  } else {
    if (access_token_expired - timeNow <= 0) {
      console.log("go to here")
      try {
        const result = yield call(api.reFreshToken, refresh_token);
        console.log('refreshTokenSagarefreshTokenSaga', result);
        if (result.status === 200) {
          localStorage.setItem("token", result.data.access_token);
          yield put(actions.refreshTokenSuccess(result.data));
        } else {
          yield put(actions.refreshTokenFail("error"));
        }
      } catch (error) {
        console.log('error reFreshTokenSaga', {error});
        if (error.response && error.response.data) {
          yield put(actions.refreshTokenFail("error"));
        } else {
          yield put(actions.refreshTokenFail("error"));
        }
      }
    }
  }
}




function* loginSaga() {
  yield all([
    takeLatest(actionType.LOGIN_SEND_REQUEST, submitLogin),
    takeLatest(actionType.REFRESH_TOKEN, refreshTokenSaga)
  ]);
}

export function* root() {
  yield all([fork(loginSaga)]);
}
