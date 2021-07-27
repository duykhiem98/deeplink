/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ProfileComponent from '../../screens/profile';
import { showLoading, hideLoading } from '../../redux/actions/config';
import { logout } from '../../redux/actions/authen';
import { getCompletedOrdersSelector } from '../order-list/selector';

class Profile extends PureComponent {
  render() {
    return (
      <>
        <ProfileComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  logout,
  showLoading,
  hideLoading,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    user: state.config.user,
    token: state.config.token,
    orders: getCompletedOrdersSelector(state),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Profile);
