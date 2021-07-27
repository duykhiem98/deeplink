import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../themes';

const LoadingIndicator = () => {
  const isLoading = useSelector(({ config }) => config.isLoading);
  if (!isLoading) return null;
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  );
};

export default LoadingIndicator;
