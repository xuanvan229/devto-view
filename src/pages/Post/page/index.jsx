/* eslint-disable jsx-a11y/anchor-is-valid */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeUsername, changePassword,refreshToken, sendLogin, logout } from "../../Login/redux/action";
import { getError, getIsLogin, getUser, getSendingLogin } from "../../Login/redux/selector";
import Dashboard from "./Dashboard.jsx";

const mapStateToProps = state => ({
  isLogin: getIsLogin(state),
  error: getError(state),
  user: getUser(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendLogin,
      refreshToken,
      logout,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
