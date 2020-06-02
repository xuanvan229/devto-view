// export const login_state = (state) => state.login
import { createSelector } from "reselect";

const loginState = state => state.login;

export const getIsLogin = createSelector(
  loginState,
  adminState => adminState.isLogin,
);

export const getUser = createSelector(
  loginState,
  adminState => adminState.user,
);

export const getError = createSelector(
  loginState,
  adminState => adminState.error,
);

export const getCountLoginTime = createSelector(
  loginState,
  adminState => adminState.count,
);

export const getIsSending = createSelector(
  loginState,
  adminState => adminState.isSending,
);
