import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Platform,
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
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Colors, Images, Metrics } from "../../themes";
import Swiper from "react-native-swiper";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import RowProduct from "./RowProduct";
import RowCategory from "./RowCategory";
import RBSheet from "react-native-raw-bottom-sheet";
import ProductVariant from "../../components/Product/ProductVariant";
import { KeyBoardScroll } from "../../components";
import CartIcon from "../../components/Cart/CartIcon";
import _ from 'lodash';
import Animated from "react-native-reanimated";
import { LIMIT, STORY_ID } from "../../common/constant";
import LinearGradient from "react-native-linear-gradient";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      new_collection: [
        {
          id: 1,
          image: Images.banner1,
          title: "NEW COLLECTION",
          description: "FOR SUMMER",
        },
        {
          id: 2,
          image: Images.banner1,
          title: "NEW COLLECTION",
          description: "FOR SUMMER",
        },
        {
          id: 3,
          image: Images.banner1,
          title: "NEW COLLECTION",
          description: "FOR SUMMER",
        },
      ],
      scrollY: new Animated.Value(0),
      selectPromotion: false
    };

    // https://stackoverflow.com/questions/53408470/flatlist-onendreached-being-called-multiple-times
    this._onEndReached = _.debounce(this.handleLoadMoreProduct, 500);
  }

  onClickCategoryItem = (item) => {
    this.props.getProductByCateId({ limit: LIMIT, categoryId: item.id });
    // this.props.navigation.navigate("category", { id: item.id });
  }
  renderRowCategories = ({ item }) => {
    return (
      <RowCategory
        rowData={item}
        onClickItem={this.onClickCategoryItem} />
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

  renderFooterCategory = () => {
    const { categories } = this.props;
    if (!categories.loadMore) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    );
  };

  renderFooterProduct = () => {
    const { products } = this.props;
    if (!products.loadMore) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    );
  };

  renderProductInTab = (index) => {
    const { productsInTab } = this.props;
    // console.log(`productsInTab:`, productsInTab);
    const products = index === 1 ? productsInTab.productNews : productsInTab.productProms;
    if (products && products.length > 0) {
      return <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={(item, index) => String(index)}
        renderItem={this.renderRowProduct}
        extraData={this.state}
        ListFooterComponent={this.renderFooterProduct}
      // onEndReachedThreshold={0.1}
      // onEndReached={this.handleLoadMoreProduct}
      />
    } else {
      return this.renderEmptyView()
    }
  }

  render() {
    const { selectPromotion } = this.state;
    const { categories, products, loading } = this.props;

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }

    // const headerTranslate = this.state.scrollY.interpolate({
    //   inputRange: [0, HEADER_SCROLL_DISTANCE],
    //   outputRange: [0, -1 * HEADER_SCROLL_DISAPPEAR],
    //   extrapolate: 'clamp'
    // });

    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.98]}
        colors={[
          '#FF8686',
          '#50A1FF'
        ]}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
            <Left style={styles.left}>
              <Text style={styles.headerTitle}>Hãy tìm mẫu sản phẩm bạn cần</Text>
            </Left>

            <Right style={styles.right}>
              {/* <TouchableOpacity
              style={[styles.actionTopView, { marginLeft: 10 }]}
              onPress={this.viewCart}>
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
              scrollEventThrottle={16}
              // onScroll={Animated.event(
              //   [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              //   Platform.OS === 'ios' ? undefined : {
              //     listener: event => {
              //       if (this.isCloseToBottom(event.nativeEvent)) {
              //         this.handleLoadMoreProduct();
              //       }
              //     }
              //   }
              // )}
              onMomentumScrollEnd={({ nativeEvent }) => {
                if (this.isCloseToBottom(nativeEvent)) {
                  this.handleLoadMoreProduct();
                }
              }}
            >
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

              {/* <View style={styles.slidesec}>
              <Swiper
                showsButtons={false}
                showsPagination={false}
                activeDot={<View style={styles.activeDot} />}
                dot={<View style={styles.dot} />}
              >
                {new_collection.map((item, index) => {
                  return (
                    <View style={styles.slide} key={index}>
                      <Image source={item.image} style={styles.sliderImage} />
                      <View style={styles.contentStyle}>
                        <Text style={styles.headertext}>{item.title}</Text>
                        <Text style={styles.desctext}>{item.description}</Text>
                      </View>
                    </View>
                  );
                })}
              </Swiper>
            </View> */}

              <View style={styles.newArrivalSec}>
                <Left style={styles.sideButtons}>
                  <Text style={styles.titelText}>Danh mục</Text>
                </Left>
              </View>

              <View>
                {
                  categories.data && categories.data.length > 0 ? (
                    <FlatList
                      horizontal
                      // pagingEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      data={categories.data}
                      keyExtractor={(item, index) => String(index)}
                      renderItem={this.renderRowCategories}
                      extraData={this.state}
                      ListFooterComponent={this.renderFooterCategory}
                      onEndReachedThreshold={0.4}
                      onEndReached={this.handleLoadMoreCategory}
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

              {/* <View style={styles.separatorView} /> */}
              {/* <View style={styles.newArrivalSec}>
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
                  ListFooterComponent={this.renderFooterProduct}
                // onEndReachedThreshold={0.1}
                // onEndReached={this.handleLoadMoreProduct}
                />
              ) : this.renderEmptyView()
            } */}

              <View style={styles.viewTab}>
                <View style={styles.tabView}>
                  <TouchableOpacity onPress={() => this.setState({ selectPromotion: false })}>
                    <Text style={{ ...styles.productTitle, color: !selectPromotion ? Colors.black : Colors.txtGrey }}>Sản phẩm mới</Text>
                    <View style={{ ...styles.lineView, backgroundColor: !selectPromotion ? Colors.red : undefined }} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.setState({ selectPromotion: true })}>
                    <Text style={{ ...styles.productTitle, color: selectPromotion ? Colors.black : Colors.txtGrey }}>Sản phẩm khuyến mãi</Text>
                    <View style={{ ...styles.lineView, backgroundColor: selectPromotion ? Colors.red : undefined }} />
                  </TouchableOpacity>
                </View>
                {
                  this.renderProductInTab(!selectPromotion ? 1 : 2)
                }
                {/* <Tabs
                transparent
                initialPage={0}
                tabBarUnderlineStyle={styles.tabUnderLine}
                tabBarBackgroundColor={'white'}
                tabBarActiveTextColor={"black"}
                tabBarInactiveTextColor={Colors.darktext}
                tabBarTextStyle={styles.tabBarTextStyle}
              // renderTabBar={() => <ScrollableTab tabsContainerStyle={{ flex: 1 }} />}
              >
                <Tab heading={
                  <TabHeading style={{ backgroundColor: "white" }}>
                    <Text>Sản phẩm mới</Text>
                  </TabHeading>} >
                  {
                    this.renderProductInTab(1)
                  }
                </Tab>
                <Tab heading={
                  <TabHeading style={{ backgroundColor: "white" }}>
                    <Text>Sản phẩm khuyến mại</Text>
                  </TabHeading>} >
                  {
                    this.renderProductInTab(2)
                  }
                </Tab>
              </Tabs> */}
              </View>
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
        </View>
      </LinearGradient>
    );
  }

  onRefresh = () => {
    this.props.resetProductScreen();
    this.props.getCategory({ storeId: STORY_ID });
    // this.props.getProduct({ limit: LIMIT, page: 1});
  }

  handleLoadMoreCategory = () => {
    const { categories } = this.props;
    if (!categories.loadMore) {
      // this.props.getCategory({ limit: LIMIT, page: categories.page + 1, isHot: true });
    }
  };
  handleLoadMoreProduct = (event) => {
    console.log(`handleLoadMoreProduct`);
    const { products } = this.props;
    if (products.page >= products.totalPage) return;
    if (!products.loadMore) {
      this.props.getProduct({ limit: LIMIT, page: products.page + 1 }, { dontShowLoading: true });
    }
  };
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  viewCart = () => {
    this.props.navigation.navigate("cart");
  }

  addToCart = (item) => {
    this.props.getProductDetail({ productId: item.id });
    this.RBSheet.open();
  }
}

export default Product;