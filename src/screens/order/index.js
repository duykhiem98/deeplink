import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  ImageBackground,
  BackHandler,
  I18nManager,
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
import _ from 'lodash';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import RowProduct from "./RowProduct";
import { Fonts, Metrics, Colors } from "../../themes";
import { Input, KeyBoardScroll, Row, RowLeft } from "../../components";
import LineInput from "../../components/Input/LineInput";
import { formatCurency } from "../../common/utils";
import { _global } from "../../core/global";

class Order extends Component {
  constructor(props) {
    super(props);
    const { shippingAddress } = props;
    this.state = {
      order: {
        note: '',
        orderStores: [
          {
            items: [
              {
                itemId: '',
                productId: '',
                quantity: 0
              }
            ],
            storeId: ''
          }
        ],
        paymentMethod: "COD",
        shippingAddress: shippingAddress && shippingAddress.id
      }
    };
  }

  renderHeaderComponent = () => {
    return (
      <View style={{ backgroundColor: 'white', borderTopEndRadius: 10, borderTopStartRadius: 10, padding: 10 }}>
        <Text style={[styles.txtEmpty]}>
          Sản phẩm
        </Text>
      </View>
    )
  }

  renderFooterComponent = () => {
    const { cart } = this.props;
    const { order } = this.state;
    return (
      <View style={{ backgroundColor: 'white', borderBottomEndRadius: 10, borderBottomStartRadius: 10, padding: 16 }}>

        <View style={styles.viewContinue}>
          <Row
            leftTitle={'Tổng tiền sản phẩm'}
            rightTitle={formatCurency(cart.totalAmount)}
            height={30}
            // leftTitleBold
            // rightTitleBold
            rightTitleStyle={{ color: Colors.black }}
          />
          {/* <Row
                leftTitle={'Khuyến mãi'}
                rightTitle={formatCurency(0)}
                height={30}
                // leftTitleBold
                // rightTitleBold
                rightTitleStyle={{ color: Colors.black }}
              /> */}
          <Row
            leftTitle={'Phí giao hàng'}
            rightTitle={formatCurency(cart.shippingCost)}
            height={30}
            // leftTitleBold
            // rightTitleBold
            rightTitleStyle={{ color: Colors.black }}
          />

          <Row
            leftTitle={'Tổng tiền'}
            rightTitle={formatCurency(cart.paidByCustomer)}
            height={28}
            leftTitleBold
            // rightTitleBold
            rightTitleStyle={{ color: Colors.red }}
          />
        </View>

        {/* <LineInput
          containerStyle={styles.textInput}
          placeholder="Ghi chú cho người bán"
          value={order.note ? order.note : ``}
          onChangeText={this.onChangeNote}
        /> */}
      </View>
    )
  }

  renderRowProduct = ({ item }) => {
    return (
      <RowProduct
        rowData={item} />
    );
  }
  renderEmptyView = () => {
    return (
      <View style={styles.viewEmpty}>
        <Text style={[styles.txtEmpty, { marginBottom: 10 }]}>
          Chưa có dữ liệu
        </Text>
        {/* <TouchableOpacity activeOpacity={0.7} onPress={this.reScan}>
          <MaterialIcons name='autorenew' size={48} color={Colors.black} />
        </TouchableOpacity> */}
      </View>
    )
  }

  render() {
    const { cart, shippingAddress } = this.props;

    let address = shippingAddress.addressLine1 ? `${shippingAddress.addressLine1}, ${shippingAddress.wardName}, ${shippingAddress.districtName}, ${shippingAddress.cityName}` : ``;
    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }

    return (
      <Container style={{ backgroundColor: Colors.greys }}>
        <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
          <View style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.pop()}
            >
              <MaterialIcons name="keyboard-backspace" size={24} color={Colors.black} />
              <Text style={styles.textTitle}>Đặt hàng</Text>
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

        <View style={{ flex: 1 }}>
          <KeyBoardScroll style={{ padding: 10 }} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.viewInfo}>
              {
                !shippingAddress.fullName && <RowLeft
                  leftTitle={'Thêm địa chỉ nhận hàng'}
                  rightTitle={''}
                  rightIcon
                  height={30}
                  leftTitleStyle={{ color: Colors.red }}
                  leftTitleBold
                  onPress={() => this.props.navigation.navigate("shippingAddress")}
                />
              }
              {
                shippingAddress.fullName && <View>
                  <View style={styles.viewRowTitle}>
                    <Text style={styles.textInfoTitle}>Tên người nhận</Text>
                    <TouchableOpacity style={{ alignSelf: 'center' }} activeOpacity={0.7} onPress={() => this.props.navigation.navigate("shippingAddress")}>
                      <Text style={styles.textUpdateInfo}>Thay đổi</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.textInfoContent}>{shippingAddress.fullName}</Text>
                  <Text style={styles.textInfoContent}>{address}</Text>
                  <Text style={styles.textInfoContent}>{shippingAddress.mobile}</Text>
                </View>
              }

            </View>

            <View style={styles.separatorView} />

            <View style={styles.viewNewProduct}>
              {
                cart && cart.items && cart.items.length > 0 ? (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={cart.items}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={this.renderRowProduct}
                    extraData={this.state}
                    ListHeaderComponent={this.renderHeaderComponent}
                    ListFooterComponent={this.renderFooterComponent}
                    contentContainerStyle={{ borderRadius: 10 }}
                  // refreshControl={
                  //   <RefreshControl
                  //     refreshing={false}
                  //     onRefresh={this.onRefresh}
                  //   />
                  // }
                  />
                ) : this.renderEmptyView()
              }
            </View>

            <View style={[styles.viewContinue, { padding: 16, borderRadius: 10, marginTop: 10 }]}>
              <Text style={styles.textPaymentInfo}>Phương thức thanh toán</Text>
              <Row
                leftTitle={'Thanh toán khi nhận hàng (COD)'}
                rightTitle={''}
                height={30}
                // leftTitleBold
                // rightTitleBold
                rightTitleStyle={{ color: Colors.black }}
              />
            </View>
          </KeyBoardScroll>

          <View style={styles.viewBottom}>

            <Text style={styles.textTitle}>Tổng</Text>
            <Text style={[styles.textTitle, { color: Colors.red }]}>{formatCurency(cart.paidByCustomer)}</Text>

            <Button style={styles.buttonContinue} onPress={this.createOrder}>
              <Text style={styles.textButton}>ĐẶT HÀNG</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }

  onChangeNote = (note) => {
    this.setState({
      order: {
        ...this.state.order,
        note
      }
    });
  }

  createOrder = () => {
    let { order } = this.state;
    const { cart, shippingAddress } = this.props;
    if (!shippingAddress || !shippingAddress.fullName) {
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Vui lòng nhập địa chỉ giao hàng',
        leftButton: { text: 'OK' }
      });
      return;
    }
    let items = cart && cart.items;
    if (!items || items.length === 0) {
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Bạn chưa có sản phẩm nào trong giỏ hàng',
        leftButton: { text: 'OK' }
      });
      return;
    }

    let orderStores = items && items.map(e => {
      return {
        items: [
          {
            itemId: e.id,
            productId: e.variant.id,
            quantity: e.quantity
          }
        ],
        storeId: e.store.id
      };
    });
    let ordersSorted = [];
    orderStores.map(e => {
      let findItem = ordersSorted.find(item => item.storeId === e.storeId);
      if (findItem) {
        findItem.items = [...findItem.items, ...e.items];
      } else {
        ordersSorted.push(e);
      }
    })
    order.orderStores = ordersSorted;
    order.shippingAddress = shippingAddress.id;
    console.log(`order:`, JSON.stringify(order));
    this.props.createOrder({
      order, callback: () => {
        this.props.navigation.navigate("orderList");
        _global.Alert.alert({
          title: 'Thông báo',
          message: 'Đặt hàng thành công',
          leftButton: {
            text: 'OK', onPress: () => {
              // this.props.navigation.navigate("orderList");
            }
          },
        });
      }
    });
  }
}

export default Order;