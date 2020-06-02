// export const login_state = (state) => state.login
import { createSelector } from "reselect";

const userState = state => state.users;

export const getListUser = createSelector(
  userState,
  users => users.list,
);