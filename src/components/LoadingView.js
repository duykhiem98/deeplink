import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../themes';

const LoadingView = () => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        // backgroundColor: 'black',
        opacity: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={Colors.red} />
    </View>
  );
};

export default LoadingView;
