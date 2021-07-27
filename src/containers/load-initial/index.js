/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import LoadInitialComponent from '../../screens/load-initial';
import { login, loginSocial } from '../../redux/actions/authen';
import NavigationService from '../../navigation/NavigationService';

class LoadInitial extends PureComponent {
  onDidFocus = () => {
    const { user } = this.props;
    console.log(`user:`, user);
    if (user && user.userName && user.password) {
      this.props.login({ userName: user.userName, password: user.password });
    } else if (user && user.socialType === 'FACEBOOK' && user.token) {
      this.props.loginSocial({ socialType: user.socialType, token: user.token });
    } else {
      NavigationService.reset('homeStack');
    }
  }

  render() {
    return (
      <>
        <NavigationEvents
          onDidFocus={this.onDidFocus}
        />
        <LoadInitialComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  login,
  loginSocial,
}

const mapStateToProps = (state, props) => {
  return {
    user: state.config.user,
    token: state.config.token
  }
}

export default connect(mapStateToProps, mapDispathToProps)(LoadInitial);
