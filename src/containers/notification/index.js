/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import NotificationComponent from '../../screens/notification';
import { getNotification } from '../../redux/actions/notification';

class Notification extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getNotification();
  }

  render() {
    return (
      <>
        <NotificationComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  getNotification,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    loading: state.notification.loading,
    notifications: state.notification.notifications,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Notification);
