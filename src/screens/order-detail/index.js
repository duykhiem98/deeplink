import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  Container,
  Content,
  Button,
  Icon,
  Right,
  Item,
  Header,
  Left,
  Body,
  Title,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from 'moment';
import { Images } from "../../themes";
import styles from "./styles";
import { Fonts, Metrics, Colors } from "../../themes";
import { Input, KeyBoardScroll, Row } from "../../components";
import FastImage from 'react-native-fast-image';
import StepIndicator from 'react-native-step-indicator';
import { thirdIndicatorStyles } from "../order-list/styles";
import { formatCurency, getImageUrl } from "../../common/utils";
import { PROCESSING, CONFIRMED, DELIVERED, COMPLETED, PACKED, PRIORITY, RESIZE_MODE } from '../../common/constant';

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { orderDetail, shippingAddress } = this.props;

    let address = shippingAddress.addressLine1 ? `${shippingAddress.addressLine1}, ${shippingAddress.wardName}, ${shippingAddress.districtName}, ${shippingAddress.cityName}` : ``;
    // let discount = 0;
    // orderDetail && orderDetail.items && orderDetail.items.map((e, i) => {
    //   let product = e.product;
    //   discount += product.salePrice * e.quantity;
    // });
    console.log(`orderDetail:`, orderDetail);
    let currentPosition = 0;
    switch (orderDetail.note) {
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

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }

    return (
      <Container style={{ backgroundColor: Colors.background }}>
        <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
          <View style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.pop()}
            >
              <MaterialIcons name="keyboard-backspace" size={24} color={Colors.black} />
              <Text style={styles.textTitle}>Chi tiết đơn hàng</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.right}>
            {/* <TouchableOpacity
              style={styles.heartBg}
              onPress={() => this.setState({ isSearch: !this.state.isSearch })}
            >
              <Ionicons name="search-outline" size={24} color="white" />
            </TouchableOpacity> */}
          </View>
        </Header>

        <View style={styles.mainview}>
          <KeyBoardScroll>
            <View style={{ padding: 16, marginTop: 12, marginBottom: 12, backgroundColor: 'white', }}>
              <Row
                leftTitle={`Đơn hàng: ${orderDetail.orderNo}`}
                rightTitle={`${moment(orderDetail.createdAt).format('DD/MM/YYYY HH:mm:ss')}`}
                height={30}
                separator
                leftTitleStyle={{ fontSize: 14 }}
                rightTitleStyle={{ color: Colors.red, fontSize: 14 }}
              />

              <View >
                {
                  orderDetail.items && orderDetail.items.map((e, i) => {
                    let imageUrl = '';
                    if (e.product.images && e.product.images.length > 0) imageUrl = e.product.images[0];
                    imageUrl = getImageUrl(imageUrl);
                    return (
                      <View key={`index-${i}`} style={styles.rowMain}>
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
                    rightTitle={`Tổng: ${formatCurency(orderDetail.totalAmount)}`}
                    height={30}
                    rightTitleStyle={{ color: Colors.red }}
                  />
                </View>
              </View>

              <View style={styles.stepIndicator}>
                <StepIndicator
                  stepCount={4}
                  customStyles={thirdIndicatorStyles}
                  currentPosition={currentPosition}
                  onPress={this.onStepPress}
                  labels={['Đang xử lý', 'Đã xác nhận', 'Đang giao hàng', 'Thành công']}
                />
              </View>
            </View>

            <View style={styles.viewContinue}>
              <Text style={[styles.textPaymentInfo, { marginBottom: 5 }]}>Địa chỉ nhận hàng</Text>
              <Text style={styles.textInfoContent}>{shippingAddress.fullName || ``}</Text>
              <Text style={styles.textInfoContent}>{address || ``}</Text>
              <Text style={styles.textInfoContent}>{shippingAddress.mobile || ``}</Text>

              <View style={styles.separatorView} />

              <Text style={[styles.textPaymentInfo, { marginTop: 10, marginBottom: 5 }]}>Thông tin thanh toán</Text>
              <Row
                leftTitle={'Tổng tiền sản phẩm'}
                rightTitle={formatCurency(orderDetail.totalAmount)}
                height={28}
                // leftTitleBold
                // rightTitleBold
                rightTitleStyle={{ color: Colors.black }}
              />
              {/* <Row
                leftTitle={'Khuyến mãi'}
                rightTitle={formatCurency(0)}
                height={28}
                // leftTitleBold
                // rightTitleBold
                rightTitleStyle={{ color: Colors.black }}
              /> */}
              <Row
                leftTitle={'Phí giao hàng'}
                rightTitle={formatCurency(orderDetail.shippingCost)}
                height={28}
                // leftTitleBold
                // rightTitleBold
                rightTitleStyle={{ color: Colors.black }}
              />
              <Row
                leftTitle={'Tổng tiền'}
                rightTitle={formatCurency(orderDetail.paidByCustomer)}
                height={28}
                // leftTitleBold
                // rightTitleBold
                rightTitleStyle={{ color: Colors.red }}
              />

              <View style={styles.separatorView} />

              <Text style={[styles.textPaymentInfo, { marginTop: 10, marginBottom: 5 }]}>Phương thức thanh toán</Text>
              <Row
                leftTitle={'Thanh toán khi nhận hàng (COD)'}
                rightTitle={''}
                height={28}
                // leftTitleBold
                // rightTitleBold
                rightTitleStyle={{ color: Colors.black }}
              />

              <Row
                leftTitle={'Thành tiền'}
                rightTitle={formatCurency(orderDetail.paidByCustomer)}
                height={28}
                leftTitleBold
                // rightTitleBold
                rightTitleStyle={{ color: Colors.red }}
              />

              {/* <Button style={styles.buttonContinue} onPress={this._handleBack}>
                <Text style={styles.textButton}>ĐẶT HÀNG</Text>
              </Button> */}
            </View>
          </KeyBoardScroll>
        </View>

      </Container>
    );
  }
}

export default OrderDetail;