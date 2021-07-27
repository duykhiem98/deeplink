/**
* Created by bavv on Wed Jun 19 2019
* Copyright (c) 2019 bavv@gemvietnam.com
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, TouchableOpacity, Image } from 'react-native';
import { Fonts, Metrics, Colors } from "../../themes";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  viewLeft: {
    flex: 3,
    justifyContent: 'center'
  },
  viewRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  titleLeft: {
    fontSize: 16,
    fontWeight: '500'
  },
  titleRight: {
    fontSize: 16
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 16
  },
  imageSwitch: {
    height: 28,
    width: 56
  },
  txtLeftContent: {
    fontSize: 13,
    marginTop: 4
  }
});

class RowSwitch extends PureComponent<Props> {
  render() {
    const {
      leftTitle,
      leftTitleColor,
      leftTitleStyle,
      containerStyle,
      separator,
      separatorColor,
      height,
      leftTitleBold,
      imageSwitchOn,
      imageSwitchOff,
      onChangeSwitch,
      isOn,
      onPress,
      leftContent,
      leftContentColor,
      leftContentStyle
    } = this.props;

    const ComponentButton = onPress ? TouchableOpacity : View;
    const ButtonSwitch = onChangeSwitch ? TouchableOpacity : View;

    return (
      <>
        <ComponentButton onPress={onPress} activeOpacity={0.8} style={[styles.container, { height }, containerStyle]}>
          {
            leftTitle && (
              <View style={styles.viewLeft}>
                <Text style={[styles.titleLeft, { color: leftTitleColor, fontWeight: leftTitleBold ? 'bold' : 'normal' }, leftTitleStyle]}>{leftTitle}</Text>
                {
                  leftContent && <Text numberOfLines={3} style={[styles.txtLeftContent, { color: leftContentColor }, leftContentStyle]}>{leftContent}</Text>
                }
              </View>
            )
          }
          <View style={[styles.viewRight]}>
            <ButtonSwitch onPress={onChangeSwitch} style={{ padding: 4, paddingRight: 0 }} activeOpacity={0.7}>
              <Image style={styles.imageSwitch} source={isOn ? imageSwitchOn : imageSwitchOff} resizeMode='contain' />
            </ButtonSwitch>
          </View>
        </ComponentButton>
        {
          separator && <View style={[styles.separator, { backgroundColor: separatorColor }]} />
        }
      </>
    );
  }
}

RowSwitch.defaultProps = {
  leftTitleColor: Colors.black,
  rightTitleColor: Colors.black,
  leftContentColor: Colors.greys,
  separator: true,
  separatorColor: Colors.greys,
  height: 60,
}

interface Props {
  leftTitle?: String;
  leftTitleColor?: String;
  leftTitleStyle?: TextStyle;
  leftTitleBold?: Boolean;
  leftContent?: String;
  leftContentColor?: String;
  leftContentStyle?: TextStyle;
  rightTitle?: String;
  rightTitleColor?: String;
  rightTitleStyle?: TextStyle;
  rightTitleBold?: Boolean;
  containerStyle?: ViewStyle;
  separator?: Boolean;
  separatorColor?: String;
  height?: Number;
  isOn?: Boolean;
  imageSwitchOn?: String;
  imageSwitchOff?: String;
  onChangeSwitch?: () => void;
  onPress?: () => void;
}

export default RowSwitch;
