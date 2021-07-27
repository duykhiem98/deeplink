import React, { PureComponent } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class LoadInitial extends PureComponent {
  render() {
    return (
      <LinearGradient
        locations={[0.1, 0.98]}
        colors={["#EB5757", "#EB5757"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <ActivityIndicator size="large" color={'white'} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LoadInitial;
