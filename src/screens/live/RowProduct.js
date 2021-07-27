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
import { Fonts, Metrics, Colors, Images } from "../../themes/";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FastImage from 'react-native-fast-image';
import { formatCurency, getImageUrl } from '../../common/utils';
import { PRIORITY, RESIZE_MODE } from '../../common/constant';

class RowProduct extends PureComponent {
  render() {
    const { rowData, onClickItem } = this.props;
    const options = rowData.variant && rowData.variant.options;
    let variantTxt = '';
    options && options.map(e => {
      variantTxt += `${e.name}: ${e.value} `;
    });
    let imageUrl = '';
    if (rowData.images && rowData.images.length > 0) imageUrl = rowData.images[0];
    imageUrl = getImageUrl(imageUrl);
    return (
      <TouchableOpacity
        activeOpacity={.7}
        style={styles.rowMain}
        onPress={() => onClickItem(rowData)}
      >
        <View style={styles.left}>
          {
            imageUrl ? <FastImage
              style={styles.itemImage}
              source={{
                uri: imageUrl,
                priority: PRIORITY,
              }}
              resizeMode={RESIZE_MODE}
            /> : <Image source={Images.bg_login} style={styles.itemImage} />
          }
        </View>

        <View style={styles.right}>
          <View style={styles.viewRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle} numberOfLines={2}>{rowData.name}</Text>
              {/* <View style={styles.viewVariant}>
                <Text style={styles.itemVariant}>{variantTxt}</Text>
              </View> */}
            </View>
          </View>


          <View style={[styles.viewRow, { marginTop: 5 }]}>
            <View style={styles.priceView}>
              {
                rowData.salePrice < rowData.price && (
                  <>
                    <Text style={styles.itemPrice}>{formatCurency(rowData.salePrice)}</Text>
                    <Text style={styles.oldItemPrice}>{formatCurency(rowData.price)}</Text>
                  </>
                )
              }
              {
                rowData.salePrice >= rowData.price && <Text style={styles.itemPrice}>{formatCurency(rowData.price)}</Text>
              }
            </View>

            <View style={styles.viewRow}>
            </View>
          </View>
        </View>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rowMain: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: "flex-start",
    alignContent: "flex-start",
    padding: Metrics.WIDTH * 0.02,
    marginBottom: 1,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  itemImage: {
    width: Metrics.WIDTH * 0.2,
    height: Metrics.WIDTH * 0.2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },

  iconView: {
    marginTop: 10,
    flexDirection: "row"
  },

  itemTitle: {
    color: "#0e1130",
    fontSize: Fonts.moderateScale(13),
    textAlign: "left"
  },
  itemVariant: {
    color: Colors.txtGrey,
    fontSize: Fonts.moderateScale(10),
    textAlign: "left"
  },

  itemPrice: {
    color: "#ff0000",
    fontSize: Fonts.moderateScale(13),
  },

  viewVariant: {
    flex: 1,
    marginTop: 2,
  },
  priceView: {
    flex: 1,
    flexDirection: "row"
  },

  oldItemPrice: {
    color: "#bbbbbb",
    fontSize: Fonts.moderateScale(13),
    marginLeft: 5,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },

  saleOfferView: {
    width: Metrics.WIDTH * 0.1,
    height: Metrics.WIDTH * 0.1,
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#ffc700",
    borderRadius: Metrics.WIDTH * 0.05,
    justifyContent: "center"
  },

  saleText: {
    color: "#0e1130",
    fontSize: Fonts.moderateScale(10),
    alignSelf: "center",
    textAlign: "center"
  },

  heartIcon: {
    color: Colors.black,
    alignSelf: "center"
  },

  left: {
    alignSelf: 'center'
  },

  body: {
    alignItems: "center",
  },

  right: {
    flex: 1,
    alignItems: 'flex-start',
    padding: Metrics.WIDTH * 0.02,
  },

  viewRow: {
    flexDirection: 'row',
  },

  viewSub: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    marginRight: 10
  },

  txtCount: {
    color: "#0e1130",
    fontSize: Fonts.moderateScale(14),
  },

  viewAdd: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
    marginLeft: 10
  }
});

export default RowProduct;
