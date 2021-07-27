/**
* Created by bavv on Wed Jun 19 2019
* Copyright (c) 2019 bavv@gemvietnam.com
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Fonts, Metrics, Colors } from "../../themes";
import Icon from "react-native-vector-icons/MaterialIcons";
import FastImage from 'react-native-fast-image';
import { PRIORITY, RESIZE_MODE } from '../../common/constant';

class RowFlag extends PureComponent {
  render() {
    const { rowData, onClickItem } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={.8}
        style={styles.rowMain}
      // onPress={() => onClickItem(rowData)}
      >
        <FastImage
          style={styles.itemImage}
          source={{
            uri: rowData.image,
            priority: PRIORITY,
          }}
          resizeMode={RESIZE_MODE}
        />
        <Text style={styles.itemTitle} numberOfLines={1}>{rowData.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rowMain: {
    backgroundColor: Colors.snow,
    alignItems: "center",
    margin: Metrics.WIDTH * 0.0165
  },

  itemImage: {
    width: 68,
    height: 68,
    borderRadius: 36
  },

  iconView: {
    width: Metrics.WIDTH * 0.3,
    marginTop: 10,
    flexDirection: "row"
  },

  itemTitle: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(13),
    marginTop: 5,
    textAlign: "center"
  },

  itemPrice: {
    color: "#ff0000",
    fontSize: Fonts.moderateScale(13),
  },

  priceView: {
    width: Metrics.WIDTH * 0.3,
    marginTop: 5,
    flexDirection: "row"
  },

  oldItemPrice: {
    color: "#bbbbbb",
    fontSize: Fonts.moderateScale(13),
    marginLeft: 5,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
});

export default RowFlag;
