import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { Container, Right, Left, Content, Body, Header } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// Screen Styles
import styles from "./styles";
import { Colors, Images } from "../../themes";
import RowNotification from "./RowNotification";
import { _global } from "../../core/global";
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onClickItem = (item) => {
    const type = item.type;
    const objectId = item.objectId;
    switch (type) {
      case 'ORDER':
        _global.connection.getOrderDetail({ orderId: objectId })
          .then(response => {
            // console.log('getOrderDetail', response);
            this.props.navigation.navigate("orderDetail", { orderDetail: response });
          }).catch(error => {
            // console.log('getOrderDetail::error', error)
            _global.Alert.alert({
              title: 'Thông báo',
              message: error,
              leftButton: { text: 'OK' }
            });
          });
        break;
      case 'LIVE_STREAM':
        _global.connection.getLivestreamDetail({ livestreamId: objectId })
          .then(response => {
            // console.log('getLivestreamDetail', response);
            this.props.navigation.navigate("live", { id: response.id, storeId: response.store.id });
          }).catch(error => {
            // console.log('getLivestreamDetail::error', error);
            _global.Alert.alert({
              title: 'Thông báo',
              message: error,
              leftButton: { text: 'OK' }
            });
          });
        break;
      default:
        console.log(`default`);
        break;
    }
  }
  renderRowNotification = ({ item }) => {
    return (
      <RowNotification
        rowData={item}
        onClickItem={this.onClickItem} />
    );
  }
  renderEmptyView = () => {
    return (
      <View style={styles.viewEmpty}>
        <Text style={[styles.txtEmpty, { marginBottom: 10 }]}>
          Chưa có thông báo
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={this.onRefresh}>
          <MaterialIcons name='autorenew' size={48} color={Colors.red} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { notifications, loading } = this.props;
    console.log(`notifications:`, notifications);

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }

    return (
      <Container style={styles.main}>
        <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
          <Left style={styles.left}>
            <Text style={styles.textTitle}>Thông báo</Text>
          </Left>
          <Right style={styles.right} transparent />
        </Header>

        <View style={{ flex: 1 }}>
          {
            notifications && notifications.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={notifications}
                keyExtractor={(item, index) => String(index)}
                renderItem={this.renderRowNotification}
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
        </View>
      </Container>
    );
  }

  onRefresh = () => {
    this.props.getNotification();
  }
}
