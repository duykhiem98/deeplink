/**
* Created by bavv on Wed Jun 19 2019
* Copyright (c) 2019 bavv@gemvietnam.com
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Fonts, Metrics, Colors, Images } from "../../themes";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '../../common/utils';
import { PRIORITY, RESIZE_MODE } from '../../common/constant';

class RowLive extends PureComponent {
  render() {
    const { rowData, onClickItem } = this.props;
    const imageUrl = getImageUrl(rowData.imageUrl);
    return (
      <TouchableOpacity
        style={styles.rowMain}
        onPress={() => onClickItem(rowData)}
      >
        {
          imageUrl ? <FastImage
            style={styles.itemLive}
            source={{
              uri: imageUrl,
              priority: PRIORITY,
            }}
            resizeMode={RESIZE_MODE}
          /> : <Image style={styles.itemLive} source={Images.bg_live} />
        }

        <View style={styles.saleOfferView}>
          <Text style={styles.saleText}>Live</Text>
        </View>

        <View style={styles.viewLiveTitle}>
          <View style={styles.viewLiveTitleLeft}>
            <Text style={styles.liveTitle}>{rowData.name}</Text>
            <Text style={styles.liveCount}>{rowData.description}</Text>
          </View>
          <View style={styles.viewLiveTitleRight}>
            <MaterialIcons name="more-vert" size={24} style={styles.icon} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rowMain: {
    backgroundColor: Colors.snow,
    width: Metrics.WIDTH * 0.75,
    alignItems: "flex-start",
    alignContent: "flex-start",
    margin: Metrics.WIDTH * 0.02
  },

  viewLiveTitle: {
    flexDirection: 'row',
    marginTop: Metrics.HEIGHT * 0.01,
  },
  viewLiveTitleLeft: {
    flex: 1
  },
  viewLiveTitleRight: {
  },
  icon: {
    color: Colors.gray,
  },
  liveTitle: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(14),
    fontWeight: 'bold',
    textAlign: "left"
  },
  liveCount: {
    color: Colors.gray,
    fontSize: Fonts.moderateScale(13),
  },
  itemLive: {
    width: '100%',
    height: Metrics.HEIGHT * 0.16,
  },

  saleOfferView: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: Colors.red,
    borderRadius: 3,
    justifyContent: "center",
    padding: 5,
  },

  saleText: {
    color: "white",
    fontSize: Fonts.moderateScale(12),
    fontWeight: 'bold',
    alignSelf: "center",
    textAlign: "center"
  },
});

export default RowLive;
