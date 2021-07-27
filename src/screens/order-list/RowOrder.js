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
import { Row } from '../../components';
import StepIndicator from 'react-native-step-indicator';
import moment from 'moment';
import { formatCurency, getImageUrl } from '../../common/utils';
import { PROCESSING, CONFIRMED, DELIVERED, COMPLETED, PACKED, PRIORITY, RESIZE_MODE } from '../../common/constant';
import { firstIndicatorStyles, getStepIndicatorIconConfig, secondIndicatorStyles, thirdIndicatorStyles } from './styles';

class RowOrder extends PureComponent {
  onStepPress = (position) => {
    // setCurrentPage(position);
  };
  render() {
    const { rowData, onClickItem } = this.props;
    // let discount = 0;
    // rowData.items && rowData.items.map((e, i) => {
    //   let product = e.product;
    //   discount += product.salePrice * e.quantity;
    // });
    let currentPosition = 0;
    switch (rowData.note) {
      case CONFIRMED:
      case PACKED:
        currentPosition = 1;
        break;
      case DELIVERED:
        currentPosition = 2;
        break;
      case COMPLETED:
        currentPosition = 3;
        break;
      default:
        break;
    }
    console.log(`rowData, currentPosition:`, currentPosition);

    return (
      <TouchableOpacity
        activeOpacity={.7}
        style={styles.container}
        onPress={() => onClickItem(rowData)}
      >
        <Row
          leftTitle={`Đơn hàng: ${rowData.orderNo}`}
          rightTitle={`${moment(rowData.createdAt).format('DD/MM/YYYY HH:mm:ss')}`}
          height={30}
          separator
          leftTitleStyle={{ fontSize: 14 }}
          rightTitleStyle={{ color: Colors.red, fontSize: 14 }}
        />

        <View >
          {
            rowData.items && rowData.items.map((e, i) => {
              let imageUrl = '';
              if (e.product.images && e.product.images.length > 0) imageUrl = e.product.images[0];
              imageUrl = getImageUrl(imageUrl);
              return (
                <View style={styles.rowMain} key={`item-${i}`}>
                  <View style={styles.left}>
                    <FastImage
                      style={styles.itemImage}
                      source={{
                        uri: imageUrl,
                        priority: PRIORITY,
                      }}
                      resizeMode={RESIZE_MODE}
                    />
                  </View>

                  <View style={styles.right}>
                    <View>
                      <Text style={styles.itemTitle}>{e.product.name}</Text>
                      <Row
                        leftTitle={`x${e.quantity}`}
                        rightTitle={formatCurency(e.product.salePrice * e.quantity)}
                        height={30}
                        rightTitleStyle={{ color: Colors.red }}
                      />
                    </View>
                  </View>
                </View>
              )
            })
          }
          <View style={{}}>
            <View style={styles.separatorView} />
            <Row
              rightTitle={`Phí giao hàng: ${formatCurency(rowData.shippingCost)}`}
              height={30}
            />
            <Row
              rightTitle={`Tổng: ${formatCurency(rowData.paidByCustomer)}`}
              height={30}
              rightTitleStyle={{ color: Colors.red }}
            />
          </View>
        </View>

        <View style={styles.stepIndicator}>
          <StepIndicator
            stepCount={4}
            customStyles={thirdIndicatorStyles}
            // renderStepIndicator={this.renderStepIndicator}
            currentPosition={currentPosition}
            onPress={this.onStepPress}
            labels={['Đang xử lý', 'Đã xác nhận', 'Đang giao hàng', 'Thành công']}
          />
        </View>

      </TouchableOpacity >
    );
  }

  renderStepIndicator = (params) => (
    <Icon {...getStepIndicatorIconConfig(params)} />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: Metrics.WIDTH * 0.02,
    padding: Metrics.WIDTH * 0.02,
  },

  rowMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "flex-start",
    alignContent: "flex-start",
    marginBottom: Metrics.WIDTH * 0.02,
    marginTop: Metrics.WIDTH * 0.02
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

  itemTitle: {
    color: "#0e1130",
    fontSize: Fonts.moderateScale(13),
    marginTop: 5,
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
  },

  stepIndicator: {

  },

  separatorView: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.txtGrey,
    marginTop: Metrics.WIDTH * 0.01,
    marginBottom: Metrics.WIDTH * 0.01,
  },
});

export default RowOrder;
