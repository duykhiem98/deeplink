import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Right,
  Input,
  Header,
  Left,
  Body,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Colors, Images } from "../../themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import RowProduct from "./RowProduct";
import { KeyBoardScroll } from "../../components";

class ChildCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  onClickWishlist = (item) => {
    if (item.isWishlist) {
      this.props.removeFromWishlist({ productId: item.id });
    } else {
      this.props.addToWishlist({ productId: item.id });
    }
  }
  onClickProductItem = (item) => {
    this.props.navigation.navigate("productDetail", { id: item.id });
  }
  renderRowProduct = ({ item }) => {
    return (
      <RowProduct
        rowData={item}
        onClickWishlist={this.onClickWishlist}
        onClickItem={this.onClickProductItem}
      />
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
    const { products } = this.props;

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }

    return (
      <Container>
        <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.pop()}
            >
              <MaterialIcons name="keyboard-backspace" size={24} color={Colors.black} />
              <Text style={[styles.headerTitle, { marginLeft: 10 }]}>Sản phẩm</Text>
            </TouchableOpacity>
          </Left>

          <Right style={styles.right}>
            {/* <TouchableOpacity
              style={styles.actionTopView}
              onPress={() => this.setState({ isSearch: !this.state.isSearch })}
            >
              <EvilIcons name="search" size={26} style={styles.heartIcon} />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={[styles.actionTopView]}
              onPress={() => { }}
            >
              <EvilIcons name="cart" size={26} style={styles.heartIcon} />
            </TouchableOpacity> */}
          </Right>
        </Header>

        <View style={{ flex: 1 }}>
          <KeyBoardScroll>
            <View style={styles.searchViewBg}>
              <View style={styles.searchView}>
                <AntDesign
                  name="search1"
                  size={20}
                  color="#8e8e93"
                  style={{ marginLeft: 10 }}
                />
                <Input
                  style={styles.searchInput}
                  placeholder="Search"
                  placeholderTextColor="#8e8e93"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  keyboardType="default"
                  selectionColor="#6d6d71"
                />
              </View>
            </View>

            {
              products.data && products.data.length > 0 ? (
                <FlatList
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  data={products.data}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={this.renderRowProduct}
                  extraData={this.state}
                />
              ) : this.renderEmptyView()
            }

          </KeyBoardScroll>
        </View>
      </Container>
    );
  }
}

export default ChildCategory;