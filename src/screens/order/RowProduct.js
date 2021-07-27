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
import { Fonts, Metrics, Colors, Images } from "../../themes";
import Icon from "react-native-vector-icons/MaterialIcons";
import FastImage from 'react-native-fast-image';
import { Row } from '../../components';
import { formatCurency, getImageUrl } from '../../common/utils';
import { PRIORITY, RESIZE_MODE } from '../../common/constant';

class RowProduct extends PureComponent {
  render() {
    const { rowData, onClickItem } = this.props;
    const options = rowData.variant.options;
    let variantTxt = '';
    options && options.map(e => {
      variantTxt += `${e.name}: ${e.value} `;
    });
    let imageUrl = '';
    if (rowData.product.images && rowData.product.images.length > 0) imageUrl = rowData.product.images[0];
    imageUrl = getImageUrl(imageUrl);
    return (
      <TouchableOpacity
        activeOpacity={.8}
        style={styles.rowMain}
        onPress={() => { }}
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
          <Text style={styles.itemTitle}>{rowData.product.name}</Text>
          <View style={styles.priceView}>
            {/* <Text style={styles.itemPrice}>{formatCurency(rowData.product.salePrice)}</Text>
            <Text style={styles.oldItemPrice}>{formatCurency(rowData.product.price)}</Text> */}
            {
              rowData.product.salePrice < rowData.product.price && (
                <>
                  <Text style={styles.itemPrice}>{formatCurency(rowData.product.salePrice)}</Text>
                  <Text style={styles.oldItemPrice}>{formatCurency(rowData.product.price)}</Text>
                </>
              )
            }
            {
              rowData.product.salePrice >= rowData.product.price && <Text style={styles.itemPrice}>{formatCurency(rowData.product.price)}</Text>
            }
          </View>
          <Row
            leftTitle={`x${rowData.quantity}`}
            rightTitle={formatCurency(rowData.product.salePrice * rowData.quantity)}
            height={30}
            // leftTitleBold
            // rightTitleBold
            rightTitleStyle={{ color: Colors.red }}
          />
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
    width: Metrics.WIDTH * 0.24,
    height: Metrics.WIDTH * 0.18,
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
  },

  body: {
    alignItems: "center",
  },

  right: {
    flex: 1,
    alignItems: 'flex-start',
    padding: Metrics.WIDTH * 0.02,
  },

  viewCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  viewSub: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greys,
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
    backgroundColor: Colors.greys,
    marginLeft: 10
  }
});

export default RowProduct;
