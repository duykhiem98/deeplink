import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  StatusBar,
  TouchableOpacity,
  Platform,
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
import styles from "./styles";
import RowProduct from "./RowProduct";
import { Fonts, Metrics, Colors } from "../../themes/";
import { Input, KeyBoardScroll, Row, SmartSwipeRow } from "../../components";
import { debounce, formatCurency } from "../../common/utils";
import { _global } from "../../core/global";
import _ from 'lodash';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    this._rows = {};
    this.openCellId = null;

    this.debounceQuantity = _.debounce(function (productId, quantity) {
      this.onChangeQuantity({ productId, quantity })
    }, 2000);
  }

  onClickItem = (item) => {
    // this.props.navigation.navigate("FirstScreen");
  }
  onRemoveItem = (item) => {
    console.log(`onRemoveItem item:`, item);
    _global.Alert.alert({
      title: 'Bạn chắc chắn muốn bỏ sản phẩm này?',
      leftButton: { text: 'Huỷ' },
      rightButton: { text: 'Đồng ý', onPress: () => this.props.removeItemFromCart({ itemId: item.id }) }
    })
  }

  onChangeQuantity = ({ productId, quantity }) => {
    this.props.changeQuantityItemInCart({ productId, quantity });
  }

  renderRowProduct = ({ item, index }) => {
    return (
      <RowProduct
        rowData={item}
        onClickItem={this.onClickItem}
        onDelete={this.onRemoveItem}
        decrease={this.decrease}
        increase={this.increase} />
    );
  }

  renderEmptyView = () => {
    return (
      <View style={styles.viewEmpty}>
        <Text style={[styles.txtEmpty, { marginBottom: 10 }]}>
          Bạn chưa có sản phẩm nào trong giỏ hàng
        </Text>
        {/* <TouchableOpacity activeOpacity={0.7} onPress={this.reScan}>
          <MaterialIcons name='autorenew' size={48} color={Colors.black} />
        </TouchableOpacity> */}
      </View>
    )
  }

  render() {
    const { cart } = this.props;

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
              <Text style={styles.textTitle}>Giỏ hàng</Text>
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
          <KeyBoardScroll containerStyle={{ paddingBottom: 40 }}>
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
          </KeyBoardScroll>

          {
            cart && cart.items && cart.items.length > 0 && (
              <View style={styles.viewBottom}>
                <Text style={styles.textTitle}>Tổng</Text>
                <Text style={[styles.textTitle, { color: Colors.red }]}>{formatCurency(cart.totalAmount)}</Text>
                <Button style={styles.buttonContinue} onPress={this.goOrder}>
                  <Text style={styles.textButton}>ĐẶT HÀNG</Text>
                </Button>
              </View>
            )
          }
        </View>
      </Container>
    );
  }

  decrease = (item) => {
    console.log(`decrease item:`, item);
    let quantity = item.quantity - 1;

    if (quantity === 0) {
      _global.Alert.alert({
        title: 'Bạn chắc chắn muốn bỏ sản phẩm này?',
        leftButton: { text: 'Huỷ' },
        rightButton: { text: 'Đồng ý', onPress: () => this.props.removeItemFromCart({ itemId: item.id }) }
      })
      return;
    }

    this.props.draftCart({
      itemId: item.id,
      quantity
    });

    this.debounceQuantity(item.id, quantity);
  }

  increase = (item) => {
    console.log(`increase item:`, item);
    let quantity = item.quantity + 1;
    if (quantity > item.product.totalQuantity) {
      return;
    }
    this.props.draftCart({
      itemId: item.id,
      quantity
    });
    this.debounceQuantity(item.id, quantity);
  }

  goOrder = () => {
    const { cart } = this.props;
    if (!cart || !cart.items || cart.items.length === 0) {
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Bạn chưa có sản phẩm nào trong giỏ hàng',
        leftButton: { text: 'OK' }
      });
      return;
    }
    this.props.navigation.navigate("order");
  }
}

export default Cart;