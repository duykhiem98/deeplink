import React, { Component } from "react";
import {
  Text,
  View,
} from "react-native";
import {
  Container,
  Right,
  Header,
  Left,
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Images } from "../../themes/";
import styles from "./styles";
import RowProduct from "./RowOrder";
import { Fonts, Metrics, Colors } from "../../themes/";
import { Input, Row } from "../../components";
import OrderProcessing from "./OrderProcessing";
import OrderHistory from "./OrderHistory";

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
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
    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }

    return (
      <Container style={{ backgroundColor: Colors.greys }}>
        <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
          <Left style={styles.left}>
            <Text style={styles.textTitle}>Đơn hàng</Text>
          </Left>
          <Right style={styles.right} transparent />
        </Header>

        {/* <ScrollableTabView
          initialPage={0}
          tabBarUnderlineStyle={styles.tabUnderLine}
          tabBarBackgroundColor={"white"}
          tabBarActiveTextColor={"black"}
          tabBarInactiveTextColor={Colors.darktext}
          tabBarTextStyle={styles.tabText}
          renderTabBar={() => <ScrollableTabBar />}
          prerenderingSiblingsNumber={1}
        >
          <View tabLabel="Đang xử lý" style={{ flex: 1 }}>
            <OrderProcessing />
          </View>
          <View tabLabel="Lịch sử đơn" style={{ flex: 1 }}>
            <OrderHistory />
          </View>
        </ScrollableTabView> */}

        <Tabs
          transparent
          initialPage={0}
          tabBarUnderlineStyle={styles.tabUnderLine}
          tabBarBackgroundColor={'white'}
          tabBarActiveTextColor={"black"}
          tabBarInactiveTextColor={Colors.darktext}
          tabBarTextStyle={styles.tabBarTextStyle}
          renderTabBar={() => <ScrollableTab style={{ backgroundColor: "white" }} />}
        >
          <Tab heading={
            <TabHeading style={{ backgroundColor: "white" }}>
              <Text>Đang xử lý</Text>
            </TabHeading>} >
            <OrderProcessing />
          </Tab>
          <Tab heading={
            <TabHeading style={{ backgroundColor: "white" }}>
              <Text>Lịch sử đơn</Text>
            </TabHeading>} >
            <OrderHistory />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default OrderList;