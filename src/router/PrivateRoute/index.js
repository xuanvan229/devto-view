import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // auth: false,
    };
  }

  render() {
    console.log("it come to here", this.props)
    const { path, exact, component, login, baseApp } = this.props;
    const { isLogin } = login;
    if (baseApp.appLoading) {
      return <h1> Loading </h1>;
    }
    if (!isLogin) {
      return <Redirect to="/login" />;
    }
    return <Route path={path} exact={exact} component={component} />;
  }
}

PrivateRoute.propTypes = {
  login: PropTypes.object.isRequired,
  component: PropTypes.any,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  baseApp: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { login, baseApp } = state;
  return { login, baseApp };
}

export default connect(mapStateToProps)(PrivateRoute);
