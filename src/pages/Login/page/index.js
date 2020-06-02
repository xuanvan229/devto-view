/* eslint-disable jsx-a11y/anchor-is-valid */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeUsername, changePassword, sendLogin } from "../redux/action";
import { getError, getIsLogin, getUser, getSendingLogin } from "../redux/selector";
import Login from "./Login";

const mapStateToProps = state => ({
  isLogin: getIsLogin(state),
  error: getError(state),
  user: getUser(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendLogin,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
