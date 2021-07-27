import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Fonts, Metrics, Colors } from "../../themes";

export default class PasswordInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icEye: 'visibility',
      password: true
    }
  }

  changePwdType = () => {
    let newState;
    if (this.state.password) {
      newState = {
        icEye: 'visibility-off',
        password: false
      }
    } else {
      newState = {
        icEye: 'visibility',
        password: true
      }
    }

    this.setState(newState)
  };

  render() {
    const {
      containerStyle,
      inputStyle,
      height
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          {...this.props}
          ref={this.props.refInput}
          secureTextEntry={this.state.password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          placeholderTextColor="#b7b7b7"
          style={[styles.textInput, { height: height }, inputStyle]} />
        <TouchableOpacity style={[styles.icon, this.props.iconStyle]} onPress={this.changePwdType}>
          <Icon
            name={this.state.icEye}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: Metrics.WIDTH * 0.9,
    height: 44,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.txtGrey,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    alignSelf: "center",
    fontSize: Fonts.moderateScale(14),
  },
  icon: {
    padding: 8
  }
});

PasswordInput.defaultProps = {
  iconSize: 24,
  height: 44
};
