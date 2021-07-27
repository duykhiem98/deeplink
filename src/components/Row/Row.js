/**
* Created by bavv on Wed Jun 19 2019
* Copyright (c) 2019 bavv@gemvietnam.com
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { Fonts, Metrics, Colors } from "../../themes";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  viewLeft: {
    flex: 1,
    justifyContent: 'center'
  },
  viewRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  titleLeft: {
    fontSize: 16
  },
  titleRight: {
    fontSize: 16
  },
  separator: {
    height: 1,
    backgroundColor: Colors.greys
    // marginHorizontal: 16
  }
});

class Row extends PureComponent<Props> {
  render() {
    const {
      leftTitle,
      leftTitleColor,
      leftTitleStyle,
      rightTitle,
      rightTitleColor,
      rightTitleStyle,
      containerStyle,
      separator,
      separatorColor,
      width,
      height,
      leftTitleBold,
      rightTitleBold,
      rightIconName,
      rightIcon,
      rightIconColor,
      onPress,
      rightStyle,
      separatorStyle,
      disable,
    } = this.props;

    const ComponentButton = disable ? View : onPress ? TouchableOpacity : View;

    return (
      <>
        <ComponentButton onPress={onPress} activeOpacity={0.8} style={[styles.container, { height, opacity: disable ? 0.6 : 1 }, containerStyle]}>
          {
            !!leftTitle && (
              <View style={styles.viewLeft}>
                <Text numberOfLines={1} style={[styles.titleLeft, { color: leftTitleColor, fontWeight: leftTitleBold ? 'bold' : 'normal' }, leftTitleStyle]}>{leftTitle}</Text>
              </View>
            )
          }
          {
            (!!rightTitle || rightIcon) && (
              <View style={[styles.viewRight, rightStyle]}>
                {
                  !!rightTitle && <Text style={[styles.titleRight, { color: rightTitleColor, fontWeight: rightTitleBold ? 'bold' : 'normal' }, rightTitleStyle]}>{rightTitle}</Text>
                }
                {
                  rightIcon && <Icon style={{ marginRight: -6 }} name={rightIconName} color={rightIconColor} size={24} />
                }
              </View>
            )
          }
        </ComponentButton>
        {
          separator && <View style={[styles.separator, separatorStyle, { backgroundColor: separatorColor }]} />
        }
      </>
    );
  }
}

Row.defaultProps = {
  leftTitleColor: Colors.black,
  rightTitleColor: Colors.black,
  separator: false,
  separatorColor: Colors.greys,
  // width: Metrics.WIDTH,
  height: 54,
  rightIconName: 'keyboard-arrow-right',
  rightIcon: false,
  rightIconColor: Colors.black,
  disable: false
}

interface Props {
  leftTitle?: String;
  leftTitleColor?: String;
  leftTitleStyle?: TextStyle;
  leftTitleBold?: Boolean;
  rightTitle?: String;
  rightTitleColor?: String;
  rightTitleStyle?: TextStyle;
  rightTitleBold?: Boolean;
  containerStyle?: ViewStyle;
  rightStyle?: ViewStyle;
  separator?: Boolean;
  separatorColor?: String;
  separatorStyle?: ViewStyle;
  width?: Number;
  height?: Number;
  rightIconName?: String;
  rightIcon?: Boolean;
  rightIconColor?: String;
  onPress?: () => void;
  disable?: Boolean;
}

export default Row;
