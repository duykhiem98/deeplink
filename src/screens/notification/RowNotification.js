/**
* Created by bavv on Wed Jun 19 2019
* Copyright (c) 2019 bavv@gemvietnam.com
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import {
  Right,
  Left,
  Body,
  Title,
} from "native-base";
import { Fonts, Metrics, Colors } from "../../themes";
import Icon from "react-native-vector-icons/MaterialIcons";
import FastImage from 'react-native-fast-image';

class RowNotification extends PureComponent {
  render() {
    const { rowData, onClickItem } = this.props;
    return (
      <>
        <TouchableOpacity
          style={styles.rowMain}
          onPress={() => onClickItem(rowData)}
        >
          {/* <View style={styles.left}>
          <FastImage
            style={styles.itemImage}
            source={{
              uri: 'https://64.media.tumblr.com/8718c162103c60f9b0dd8a9647371f9f/tumblr_inline_odlx7jjwBp1uo4xzd_640.png',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View> */}

          <View style={styles.right}>
            <Text style={[styles.txtTitle, !!rowData.seen ? { fontWeight: 'bold' } : undefined]}>{rowData.title}</Text>
            <View style={styles.priceView}>
              <Text style={[styles.txtContent, !!rowData.seen ? { fontWeight: 'bold' } : undefined]}>{rowData.message}</Text>
              {/* <Text style={styles.txtContent}>{rowData.createAt}</Text> */}
            </View>
          </View>

        </TouchableOpacity>

        <View style={styles.separatorView} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  rowMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "flex-start",
    alignContent: "flex-start",
    margin: Metrics.WIDTH * 0.0165
  },

  itemImage: {
    width: Metrics.WIDTH * 0.24,
    height: Metrics.WIDTH * 0.18,
    borderRadius: 5
  },

  iconView: {
    marginTop: 10,
    flexDirection: "row"
  },

  txtTitle: {
    color: "#0e1130",
    fontSize: Fonts.moderateScale(14),
    marginTop: 5,
    textAlign: "left"
  },

  itemPrice: {
    color: "#ff0000",
    fontSize: Fonts.moderateScale(13),
  },

  priceView: {
    flex: 1,
    marginTop: 5,
  },

  txtContent: {
    color: "#828282",
    fontSize: Fonts.moderateScale(13),
  },

  left: {
    alignSelf: "center",
  },

  body: {
    alignItems: "center",
  },

  right: {
    flex: 1,
    alignItems: 'flex-start',
    padding: Metrics.WIDTH * 0.02,
  },

  separatorView: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.txtGrey,
    marginTop: Metrics.WIDTH * 0.01,
    marginLeft: 16,
    marginRight: 16,
  },
});

export default RowNotification;
