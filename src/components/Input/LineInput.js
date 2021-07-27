/**
* Created by bavv on Mon Jun 24 2019
* Copyright (c) 2019 bavv@gemvietnam.com
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { Fonts, Metrics, Colors } from "../../themes/";

const styles = StyleSheet.create({
  container: {
    marginLeft: Metrics.WIDTH * 0.01,
    marginRight: Metrics.WIDTH * 0.01,
  },
  textInput: {
    fontSize: 14,
    color: Colors.black,
    padding: 0,
    margin: 0
  },
  separator: {
    height: 1,
    marginTop: -5
  }
});

class LineInput extends PureComponent<Props> {
  render() {
    const {
      separator,
      separatorColor,
      height,
      containerStyle,
      inputStyle,
      separatorStyle
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          {...this.props}
          underlineColorAndroid='transparent'
          placeholderTextColor="#b7b7b7"
          autoCorrect={false}
          style={[styles.textInput, { height: height }, inputStyle]}
        />
        {
          separator && <View style={[styles.separator, separatorStyle, { backgroundColor: separatorColor }]} />
        }
      </View>
    );
  }
}

LineInput.defaultProps = {
  separator: true,
  separatorColor: Colors.greys,
  height: 44
}

interface Props extends TextInputProps {
  separator?: Boolean;
  separatorColor?: String;
  height?: Number;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  separatorStyle?: ViewStyle;
}

export default LineInput;
