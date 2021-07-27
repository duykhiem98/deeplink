/**
* Created by nghinv on Sat Nov 17 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import codePush from 'react-native-code-push';
import { connect } from 'react-redux';
import DeviceConfig from 'react-native-device-info';
import { CURRENT_VERSION } from '../../common/constant';
import { Colors } from '../../themes';

class Version extends PureComponent {
  render() {
    let { codepush } = this.props;
    let titleVersion = `v${DeviceConfig.getVersion()} - ${CURRENT_VERSION}`;

    if (codepush) {
      switch (codepush.status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          titleVersion = `Đang tải dữ liệu: ${parseInt(codepush.progress)}%`
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          titleVersion = `Đang cài đặt lại ứng dụng... `
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          titleVersion = 'Chuẩn bị khởi động lại ứng dụng...'
          break;
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.viewContent}>
          <Text style={styles.version} >
            {titleVersion}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 24,
    overflow: 'hidden'
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  version: {
    color: Colors.red,
    fontSize: 14
  },
});

const mapStateToProps = (state) => {
  return {
    codepush: state.codepush
  }
}

export default connect(mapStateToProps)(Version);
