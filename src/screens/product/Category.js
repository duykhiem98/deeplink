import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
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
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Colors, Images } from "../../themes";
import Swiper from "react-native-swiper";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import RowProduct from "./RowProduct";
import RowCategory from "./RowCategory";
import RBSheet from "react-native-raw-bottom-sheet";
import ProductVariant from "../../components/Product/ProductVariant";
import { KeyBoardScroll } from "../../components";

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  onClickCategoryItem = (item) => {
    this.props.navigation.navigate("childCategory", { id: item.id });
  }
  renderRowCategories = ({ item }) => {
    return (
      <RowCategory
        rowData={item}
        onClickItem={this.onClickCategoryItem} />
    );
  }

  onClickProductItem = (item) => {
    this.props.navigation.navigate("productDetail", { id: item.id });
  }
  renderRowProduct = ({ item }) => {
    return (
      <RowProduct
        rowData={item}
        onClickItem={this.onClickProductItem}
        addToCart={this.addToCart} />
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
    const { childCategories, products } = this.props;

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }

    var rightButton = (
      <Button transparent onPress={this._handleBack}>
        <Icon
          name="ios-create-outline"
          style={{ color: "#fff", fontSize: 30 }}
          onPress={this.functionRedirect}
        />
      </Button>
    );

    return (
      <Container>
        <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.pop()}
            >
              <MaterialIcons name="keyboard-backspace" size={24} color={Colors.black} />
              <Text style={[styles.headerTitle, { marginLeft: 10 }]}>Danh mục</Text>
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
                  placeholder="Tìm kiếm"
                  placeholderTextColor="#8e8e93"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  keyboardType="default"
                  selectionColor="#6d6d71"
                />
              </View>
            </View>

            {
              childCategories && childCategories.length > 0 ? <>
                <View style={styles.newArrivalSec}>
                  <Left style={styles.sideButtons}>
                    <Text style={styles.titelText}>Danh mục</Text>
                  </Left>
                </View>
                <FlatList
                  horizontal
                  // pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  data={childCategories}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={this.renderRowCategories}
                  extraData={this.state}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={false}
                //     onRefresh={this.onRefresh}
                //   />
                // }
                />
              </>

                : undefined
            }

            {/* <View style={styles.separatorView} /> */}
            <View style={styles.newArrivalSec}>
              <Left style={styles.sideButtons}>
                <Text style={styles.titelText}>Sản phẩm</Text>
              </Left>
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

        <RBSheet
          ref={ref => { this.RBSheet = ref; }}
          height={380}
          openDuration={250}
          // closeOnDragDown
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }
          }}
        >
          <ProductVariant
            onClose={() => this.RBSheet.close()}
          />
        </RBSheet>
      </Container>
    );
  }

  addToCart = (item) => {
    this.props.getProductDetail({ productId: item.id });
    this.RBSheet.open();
  }
}

export default Category;