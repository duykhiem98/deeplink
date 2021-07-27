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

class RowCategory extends PureComponent {
  render() {
    const { rowData, onClickItem } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={.8}
        style={styles.rowMain}
        onPress={() => onClickItem(rowData)}
      >
        <FastImage
          style={styles.itemImage}
          source={{
            uri: rowData.imageUrl || 'https://antiqueruby.aliansoftware.net/Images/woocommerce/ic_new_arrivals_one.png',
            priority: PRIORITY,
          }}
          resizeMode={RESIZE_MODE}
        />
        <Text style={styles.itemTitle} numberOfLines={1}>{rowData.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rowMain: {
    padding: 10,
    alignItems: "center",
    // margin: Metrics.WIDTH * 0.0165
  },

  itemImage: {
    width: Metrics.WIDTH * 0.2,
    height: Metrics.WIDTH * 0.2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },

  iconView: {
    width: Metrics.WIDTH * 0.3,
    marginTop: 10,
    flexDirection: "row"
  },

  itemTitle: {
    width: Metrics.WIDTH * 0.2,
    color: "white",
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

export default RowCategory;
