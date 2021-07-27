/**
* Created by bavv on Mon Jun 24 2019
* Copyright (c) 2019 bavv@gemvietnam.com
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { Fonts, Metrics, Colors } from "../../themes";

const styles = StyleSheet.create({
  container: {
    width: Metrics.WIDTH * 0.9,
    backgroundColor: "transparent",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.txtGrey,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  textInput: {
    fontSize: Fonts.moderateScale(14),
    color: Colors.black,
    padding: 0,
    margin: 0,
  },
});

class Input extends PureComponent<Props> {
  render() {
    const {
      separator,
      separatorColor,
      height,
      containerStyle,
      inputStyle,
      separatorStyle,
      disable
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          {...this.props}
          underlineColorAndroid='transparent'
          placeholderTextColor="#b7b7b7"
          autoCorrect={false}
          editable={!disable}
          style={[styles.textInput, { height: height }, inputStyle]}
        />
      </View>
    );
  }
}

Input.defaultProps = {
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

export default Input;
