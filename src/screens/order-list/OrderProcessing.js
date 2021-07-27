import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  Container,
} from "native-base";
import { connect } from 'react-redux';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Images } from "../../themes";
import styles from "./styles";
import RowOrder from "./RowOrder";
import { Fonts, Metrics, Colors } from "../../themes";
import { Input, Row } from "../../components";
import NavigationService from "../../navigation/NavigationService";
import { getOrder } from '../../redux/actions/order';
import { getOrdersSelector } from "../../containers/order-list/selector";

class OrderProcessing extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  onClickItem = (orderDetail) => {
    NavigationService.navigate("orderDetail", { orderDetail });
  }
  renderRowOrder = ({ item }) => {
    return (
      <RowOrder
        rowData={item}
        onClickItem={this.onClickItem} />
    );
  }
  renderEmptyView = () => {
    return (
      <View style={styles.viewEmpty}>
        <Text style={[styles.txtEmpty, { marginBottom: 10 }]}>
          Chưa có đơn hàng
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={this.onRefresh}>
          <MaterialIcons name='autorenew' size={48} color={Colors.red} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { orders, loading } = this.props;

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }

    return (
      <Container style={{ flex: 1, backgroundColor: Colors.greys }}>
        {
          orders.processingOrder && orders.processingOrder.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={orders.processingOrder}
              keyExtractor={(item, index) => String(index)}
              renderItem={this.renderRowOrder}
              extraData={this.state}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={this.onRefresh}
                />
              }
            />
          ) : this.renderEmptyView()
        }
      </Container>
    );
  }

  onRefresh = () => {
    this.props.getOrder({ limit: 50, page: 1 });
  }
}

const mapDispathToProps = {
  getOrder,
}

const mapStateToProps = (state, props) => {
  return {
    orders: getOrdersSelector(state, props),
    loading: state.order.loading,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(OrderProcessing);