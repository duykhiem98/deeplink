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
  Input,
  Header,
  Left,
  Body,
  Title,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import RowProduct from "./RowProduct";
import VerticalRowProduct from "../product/RowProduct";
import { Fonts, Metrics, Colors, Images } from "../../themes/";
import RowLive from "./RowLive";
import RBSheet from "react-native-raw-bottom-sheet";
import ProductVariant from "../../components/Product/ProductVariant";
import { KeyBoardScroll } from "../../components";
import CartIcon from "../../components/Cart/CartIcon";
import { LIMIT, PRIORITY, RESIZE_MODE } from "../../common/constant";
import Swiper from "react-native-swiper";
import FastImage from 'react-native-fast-image';
import RowFlag from "./RowFlag";
import { IC_BANER } from "../../icon";
import NavigationService from "../../navigation/NavigationService";
import { Banner } from "./Banner";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sheetHeight: 0
    }
  }

  onClickLiveItem = (item) => {
    this.props.navigation.navigate("live", { id: item.id, storeId: item.store.id });
  }
  renderRowLive = ({ item }) => {
    return (
      <RowLive
        rowData={item}
        onClickItem={this.onClickLiveItem} />
    );
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
        addToCart={this.addToCart} />
    );
  }
  renderVerticalRowProduct = ({ item }) => {
    return (
      <VerticalRowProduct
        rowData={item}
        onClickWishlist={this.onClickWishlist}
        onClickItem={this.onClickProductItem}
        addToCart={this.addToCart} />
    );
  }
  renderRowFlag = ({ item }) => {
    return (
      <RowFlag
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
    const { banners, flags, newProducts, promotionProducts, hotProducts, loading } = this.props;

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }

    return (
      <Container>
        <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
          <Left style={styles.left}>
            <Text style={styles.headerTitle}>Nguyễn Trang Shop</Text>
          </Left>

          {/* <Body style={styles.body}>
            <Image
              source={Images.drawer_antiquruby_logo}
              style={{ flex: 0.6, resizeMode: "contain" }}
            />
          </Body> */}

          <Right style={styles.right}>
            {/* <TouchableOpacity
              style={styles.actionTopView}
              onPress={() => this.setState({ isSearch: !this.state.isSearch })}
            >
              <EvilIcons name="search" size={26} style={styles.heartIcon} />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={[styles.actionTopView, { marginLeft: 10 }]}
              onPress={this.viewCart}
            >
              <EvilIcons name="cart" size={26} style={styles.heartIcon} />
            </TouchableOpacity> */}

            <CartIcon
              onPress={this.viewCart}
            />
          </Right>
        </Header>

        <View style={{ flex: 1 }}>
          <KeyBoardScroll
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={this.onRefresh}
                title="Đang tải dữ liệu..."
              />
            }
          >
            {/* <View style={styles.searchViewBg}>
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
            </View> */}

            {/* {
              livestreams.data && livestreams.data.length > 0 ? (
                <FlatList
                  horizontal
                  // pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  data={livestreams.data}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={this.renderRowLive}
                  extraData={this.state}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={false}
                //     onRefresh={this.onRefresh}
                //   />
                // }
                />
              ) : undefined
            } */}

            <View style={{ width: '100%', height: 160, backgroundColor: Colors.black }}>
              {
                <Swiper
                  showsButtons={false}
                  autoplay={true}
                  autoplayTimeout={2}
                  showsPagination={false}
                >
                  {banners.length > 0 && banners.map((item, index) => {
                    return (
                      <TouchableOpacity activeOpacity={0.8} style={styles.slide} key={index} onPress={() => this.onClickBanner(item)}>
                        <FastImage
                          style={styles.sliderImage}
                          source={{
                            uri: item.image,
                            priority: PRIORITY,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </Swiper>
              }
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={flags}
              keyExtractor={(item, index) => String(index)}
              renderItem={this.renderRowFlag}
              extraData={this.state}
            />

            <View style={styles.viewNewProduct}>
              <View style={styles.newArrivalSec}>
                <Left style={styles.newArrivalBody}>
                  <Text style={styles.titelText}>Sản phẩm mới</Text>
                </Left>
                <Right style={styles.sideButtons}>
                  <MaterialIcons
                    name="chevron-right"
                    size={28}
                    color="black"
                    onPress={() => { }}
                  />
                </Right>
              </View>
              {
                newProducts.data && newProducts.data.length > 0 ? (
                  <FlatList
                    horizontal
                    // pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={newProducts.data}
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
            <Banner />
            <View style={styles.viewNewProduct}>
              <View style={styles.newArrivalSec}>
                <Left style={styles.newArrivalBody}>
                  <Text style={styles.titelText}>Khuyến mại</Text>
                </Left>
                <Right style={styles.sideButtons}>
                  <MaterialIcons
                    name="chevron-right"
                    size={28}
                    color="black"
                    onPress={() => { }}
                  />
                </Right>
              </View>
              {
                promotionProducts.data && promotionProducts.data.length > 0 ? (
                  <FlatList
                    // horizontal
                    // pagingEnabled={true}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    data={promotionProducts.data}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={this.renderVerticalRowProduct}
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

            {/* <View style={styles.viewNewProduct}>
              <View style={styles.newArrivalSec}>
                <Left style={styles.newArrivalBody}>
                  <Text style={styles.titelText}>Sản phẩm hot</Text>
                </Left>
                <Right style={styles.sideButtons}>
                  <MaterialIcons
                    name="chevron-right"
                    size={28}
                    color="black"
                    onPress={() => { }}
                  />
                </Right>
              </View>
              {
                hotProducts.data && hotProducts.data.length > 0 ? (
                  <FlatList
                    horizontal
                    // pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={hotProducts.data}
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
            </View> */}
          </KeyBoardScroll>
        </View>

        <RBSheet
          ref={ref => { this.RBSheet = ref; }}
          height={390}
          openDuration={250}
          // closeOnDragDown
          customStyles={{
            container: {
              // height: this.state.sheetHeight > 0 ? this.state.sheetHeight : undefined,
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }
          }}
        >
          <View
            style={{ flex: 1 }}
          // onLayout={this.onLayout}
          >
            <ProductVariant
              onClose={() => this.RBSheet.close()}
            />
          </View>
        </RBSheet>
      </Container>
    );
  }

  onLayout = event => {
    if (this.state.sheetHeight > 0) return;
    let { width, height } = event.nativeEvent.layout;
    this.setState({ sheetHeight: height });
    console.log(`onLayout:`, width, height);
  }

  viewCart = () => {
    this.props.navigation.navigate("cart");
  }

  addToCart = (item) => {
    this.props.getProductDetail({ productId: item.id }, true);
    this.RBSheet.open();
  }

  onRefresh = () => {
    this.props.getLivestream({ limit: LIMIT, page: 1 });
    this.props.getHomeProduct({ limit: LIMIT, page: 1 });
  }

  onClickBanner = (banner) => {
    this.props.navigation.navigate("bannerDetail", { banner });
  }
}

export default Home;
