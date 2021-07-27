import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  BackHandler,
  ScrollView,
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
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Swiper from "react-native-swiper";
import FastImage from 'react-native-fast-image';
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./styles";
import { Fonts, Metrics, Colors, Images } from "../../themes/";
import ProductVariant from "../../components/Product/ProductVariant";
import { formatCurency } from "../../common/utils";
import { KeyBoardScroll } from "../../components";
import CartIcon from "../../components/Cart/CartIcon";
import RowProduct from "../home/RowProduct";
import ViewMoreText from "../../components/ViewMoreText";
import { _global } from "../../core/global";
import { PRIORITY, RESIZE_MODE } from "../../common/constant";

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainProductId: props.id,
    };
  }

  renderViewMore = (onPress) => {
    return (
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#EB5757' }} onPress={onPress}>Xem thêm</Text>
      </View>
    )
  }

  renderViewLess = (onPress) => {
    return (
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#EB5757' }} onPress={onPress}>Thu gọn</Text>
      </View>
    )
  }

  renderRowProduct = ({ item }) => {
    return (
      <RowProduct
        rowData={item}
        onClickWishlist={this.onClickItemWishlist}
        onClickItem={this.onClickProductItem}
        addToCart={this.addItemToCart}
      />
    );
    // props.getProductDetail({ productId: props.id });
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
    const { productDetail, productsRelate, id } = this.props;
    const { mainProductId } = this.state;
    const products = productsRelate.data.filter(dt => dt.id !== mainProductId) || [];

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }
    const disabled = productDetail.data && productDetail.data.totalQuantity === 0;
    return (
      <Container>
        <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.pop()}
            >
              <MaterialIcons name="keyboard-backspace" size={24} color={Colors.black} />
              <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
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
          <KeyBoardScroll>
            <View style={styles.slidesec}>
              <View style={{ flex: 1, backgroundColor: Colors.greys }}>
                {
                  !productDetail || !productDetail.data.images || productDetail.data.images.length === 0 && <View style={styles.viewNoImage}>
                    <Text style={styles.txtNoImage}>Không có hình ảnh</Text>
                  </View>
                }

                {
                  productDetail && productDetail.data.images && productDetail.data.images.length > 0 && <Swiper
                    showsButtons={false}
                    autoplay={true}
                    autoplayTimeout={2}
                    activeDot={<View style={styles.activeDot} />}
                    dot={<View style={styles.dot} />}
                  >
                    {productDetail.data.images.map((item, index) => {
                      console.log(`item image:`, item);
                      return (
                        <View style={styles.slide} key={index}>
                          <FastImage
                            style={styles.sliderImage}
                            source={{
                              uri: item,
                              priority: PRIORITY,
                            }}
                            resizeMode={RESIZE_MODE}
                          />

                          {
                            disabled && <View style={styles.saleOfferView}>
                              <Text style={styles.saleText}>Hết hàng</Text>
                            </View>
                          }
                        </View>
                      );
                    })}
                  </Swiper>
                }

                {/* {
                  productDetail && productDetail.data.images && productDetail.data.images.length > 0 && <View style={styles.slide}>
                    <FastImage
                      style={styles.sliderImage}
                      source={{
                        uri: productDetail.data.images[0],
                        priority: PRIORITY,
                      }}
                      resizeMode={RESIZE_MODE}
                    />

                    {
                      disabled && <View style={styles.saleOfferView}>
                        <Text style={styles.saleText}>Hết hàng</Text>
                      </View>
                    }
                  </View>
                } */}

              </View>

              <View style={styles.viewPoint}>


                <View style={styles.viewPrice}>

                  <Text style={styles.itemTitle}>{productDetail.data.name}</Text>
                  <View style={styles.priceView}>
                    {/* <Text style={styles.itemPrice}>{formatCurency(productDetail.data.salePrice)}</Text>
                    <Text style={styles.oldItemPrice}>{formatCurency(productDetail.data.price)}</Text> */}
                    {
                      productDetail.data.salePrice < productDetail.data.price && (
                        <>
                          <Text style={styles.itemPrice}>{formatCurency(productDetail.data.salePrice)}</Text>
                          <Text style={styles.oldItemPrice}>{formatCurency(productDetail.data.price)}</Text>
                        </>
                      )
                    }
                    {
                      productDetail.data.salePrice >= productDetail.data.price && <Text style={styles.itemPrice}>{formatCurency(productDetail.data.price)}</Text>
                    }
                  </View>

                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.txtPoint}>{productDetail.data.point} points</Text>
                  <View style={styles.iconView}>
                    <TouchableOpacity onPress={this.onClickWishlist}>
                      <Image style={styles.icon} source={productDetail.data.isWishlist ? Images.icon_favorite_fill : Images.icon_favorite} />
                    </TouchableOpacity>
                    {/* <Text style={[styles.txtLiked, { marginLeft: 5 }]}>{productDetail.data.favoriteCount || 0} người đã thích</Text> */}
                    {/* <TouchableOpacity onPress={() => { }}>
              <Image style={[styles.icon, { marginLeft: 8 }]} source={Images.icon_send} />
            </TouchableOpacity> */}
                  </View>
                </View>
              </View>

            </View>

            {/* <View style={styles.separatorView} /> */}

            <Text style={styles.title}>
              Chi tiết sản phẩm
            </Text>
            <View
              style={{
                paddingRight: Metrics.WIDTH * 0.02,
                paddingLeft: Metrics.WIDTH * 0.02
              }}
            >
              <ViewMoreText
                numberOfLines={4}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
              >
                <Text style={styles.qus}>
                  {productDetail.data.description}
                </Text>
              </ViewMoreText>
              {/* <Text style={styles.qus}>
                {productDetail.data.description}
              </Text> */}
            </View>

            <View style={styles.viewNewProduct}>
              <View style={styles.newArrivalSec}>
                <Left style={styles.newArrivalBody}>
                  <Text style={styles.titelText}>Sản phẩm liên quan</Text>
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
                products && products.length > 0 ? (
                  <FlatList
                    horizontal
                    // pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={products}
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

          <View style={{ flexDirection: 'row', width: '100%', padding: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
            <Button
              style={[styles.btn, { marginRight: 10 }, disabled ? { backgroundColor: Colors.txtGrey } : { backgroundColor: '#E97B16' }]}
              onPress={this.buyNow}
              disabled={disabled}
            >
              <Text style={styles.btnText}>Mua ngay</Text>
            </Button>
            <Button
              style={[styles.btn, disabled ? { backgroundColor: Colors.txtGrey } : undefined]}
              onPress={this.addToCart}
              disabled={disabled}
            >
              <Text style={styles.btnText}>Thêm vào giỏ</Text>
            </Button>
          </View>

        </View>

        <RBSheet
          ref={ref => { this.RBSheet = ref; }}
          height={400}
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

  onClickItemWishlist = (item) => {
    if (item.isWishlist) {
      this.props.removeFromWishlist({ productId: item.id });
    } else {
      this.props.addToWishlist({ productId: item.id });
    }
  }

  onClickProductItem = (item) => {
    this.setState({
      mainProductId: item.id
    }, () => {
      this.props.getProductDetail({ productId: item.id }, true);
    });
    // this.props.navigation.navigate("productDetail", { id: item.id });
  }

  addItemToCart = (item) => {
    this.props.getProductDetail({ productId: item.id }, true);
    this.RBSheet.open();
  }

  onClickWishlist = () => {
    const { productDetail } = this.props;
    if (productDetail.data.isWishlist) {
      this.props.removeFromWishlist({ productId: productDetail.data.id });
    } else {
      this.props.addToWishlist({ productId: productDetail.data.id });
    }
  }

  viewCart = () => {
    this.props.navigation.navigate("cart");
  }

  buyNow = async () => {
    // const { productDetail } = this.props;
    // const response = await _global.connection.addToCart({
    //   productId: productDetail && productDetail.data && productDetail.data.productVariants[0].id,
    //   quantity: 1
    // }, { dontShowLoading: true });
    // if (!response.success) {
    //   _global.Alert.alert({
    //     title: 'Thông báo',
    //     message: 'Mua hàng thất bại',
    //     leftButton: { text: 'OK' }
    //   });
    // } else {
    //   this.viewCart();
    // }

    this.viewCart();
  }

  addToCart = () => {
    this.RBSheet.open();
  }
}

export default ProductDetail;