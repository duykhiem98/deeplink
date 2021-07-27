/**
* Created by bavv on Wed Jun 19 2019
* Copyright (c) 2019 bavv@gemvietnam.com
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Fonts, Metrics, Colors, Images } from "../../themes/";
import { Button } from "native-base";
import FastImage from 'react-native-fast-image';
import { formatCurency, getImageUrl } from '../../common/utils';
import { PRIORITY, RESIZE_MODE } from '../../common/constant';

class RowProduct extends PureComponent {
  render() {
    const { rowData, onClickWishlist, onClickItem, addToCart } = this.props;
    let imageUrl = '';
    if (rowData.images && rowData.images.length > 0) imageUrl = rowData.images[0];
    imageUrl = getImageUrl(imageUrl);
    const disabled = rowData.totalQuantity === 0;
    const Component = disabled ? View : TouchableOpacity;
    return (
      <TouchableOpacity
        activeOpacity={.8}
        style={styles.rowMain}
        onPress={() => onClickItem(rowData)}
      >
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

        {
          disabled && <View style={styles.saleOfferView}>
            <Text style={styles.saleText}>Hết hàng</Text>
          </View>
        }

        <View style={styles.viewPoint}>
          <View style={styles.iconView}>
            <TouchableOpacity onPress={() => onClickWishlist(rowData)}>
              <Image style={styles.icon} source={rowData.isWishlist ? Images.icon_favorite_fill : Images.icon_favorite} />
            </TouchableOpacity>
            <Text style={[styles.txtLiked, { marginLeft: 3 }]}>{rowData.favoriteCount || 0} người đã thích</Text>
            {/* <TouchableOpacity onPress={() => { }}>
              <Image style={[styles.icon, { marginLeft: 8 }]} source={Images.icon_send} />
            </TouchableOpacity> */}
          </View>
          <View>
            {/* <Text style={styles.txtPoint}>{rowData.point} points</Text> */}
          </View>
        </View>

        <View style={{ width: '100%' }}>
          <Text style={styles.itemTitle} numberOfLines={1}>{rowData.name}</Text>
          <View style={styles.priceView}>
            <View style={styles.priceView2}>
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

            <Component onPress={() => addToCart(rowData)}>
              <Image style={styles.iconAddToCart} source={Images.icon_add_to_cart} />
            </Component>
          </View>
        </View>


        {/* <Button style={[styles.button, disabled ? { backgroundColor: Colors.txtGrey } : undefined]} onPress={() => addToCart(rowData)} disabled={disabled}>
          <Text style={styles.textTitle}>THÊM VÀO GIỎ</Text>
        </Button> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rowMain: {
    backgroundColor: Colors.snow,
    width: Metrics.WIDTH * 0.35,
    alignItems: "flex-start",
    alignContent: "flex-start",
    margin: Metrics.WIDTH * 0.02,
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
    width: Metrics.WIDTH * 0.35,
    height: Metrics.WIDTH * 0.35,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },

  iconView: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },

  itemTitle: {
    // width: Metrics.WIDTH * 0.35,
    color: "#0e1130",
    fontSize: Fonts.moderateScale(12),
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "left"
  },

  itemPrice: {
    color: "#ff0000",
    fontSize: Fonts.moderateScale(11),
  },

  priceView: {
    // width: '100%',
    margin: 5,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  priceView2: {
    flexDirection: "row",
    alignItems: 'center',
  },

  oldItemPrice: {
    color: "#bbbbbb",
    fontSize: Fonts.moderateScale(11),
    marginLeft: 2,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },

  saleOfferView: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: Colors.red,
    borderRadius: 5,
    justifyContent: "center",
    padding: 5
  },

  saleText: {
    color: Colors.white,
    fontSize: Fonts.moderateScale(10),
    alignSelf: "center",
    textAlign: "center"
  },

  viewPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  txtLiked: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(11),
  },
  txtPoint: {
    color: "#F2994A",
    fontSize: Fonts.moderateScale(12),
  },

  heartIcon: {
    color: Colors.black,
    alignSelf: "center"
  },

  button: {
    width: '100%',
    height: 36,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(12),
    alignSelf: "center",
  },

  icon: {
    width: 22,
    height: 22,
  },
  iconAddToCart: {
    width: 18,
    height: 18,
    marginLeft: 2,
  }
});

export default RowProduct;
