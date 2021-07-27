/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoginComponent from '../../screens/login';
import { login, loginSocial, logout } from '../../redux/actions/authen';

class Login extends PureComponent {
  render() {
    return (
      <>
        <LoginComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  login,
  loginSocial,
  logout,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Login);
