/**
* Created by bavv on 26/11/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { addUserIdDevice } from './redux/actions/onesignal';
import { getNotification } from './redux/actions/notification';
import { getProfile } from './redux/actions/authen';

const oneSignal_key = "716374c1-6d03-4591-922f-af28c1205340";

class Notify extends PureComponent {
  constructor(props) {
    super(props);
    OneSignal.init(oneSignal_key
      // , { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 }
    );

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(2);

    if (props.notify) {
      console.log("setSubscription");
      OneSignal.setSubscription(true);
    }
  }

  componentDidMount() {
    // OneSignal.configure()
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (notification) => {
    console.log("Notification received: ", notification);

    this.props.getNotification();
    this.props.getProfile();

    // if (notification && notification.payload && notification.payload.additionalData && notification.payload.additionalData.score) {
    //   this.props.getListSchedule();
    //   this.props.getScore();
    // }

    // if (notification && notification.payload && notification.payload.additionalData && notification.payload.additionalData.wifi) {
    //   this.props.saveAdditionalData(notification.payload.additionalData);
    // }

  }

  onOpened = (openResult) => {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    // const { notification } = openResult;

    // Actions.notifi()
    return;
    // Linking.openURL(`${Schema}tabbar/tab_5/playCamera?camera=18`)
  }

  onIds = (device) => {
    console.log('Device info:---->', device);
    const userId = device.userId;
    const { notificationDevice } = this.props;
    if (userId !== notificationDevice.userId) {
      this.props.addUserIdDevice({ userId });
    }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  addUserIdDevice,
  getNotification,
}

const mapStateToProps = (state) => {
  return {
    notificationDevice: state.config.notificationDevice,
    notify: state.config.notify
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notify);