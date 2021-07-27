import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button } from "native-base";
import { connect } from 'react-redux';
import { Fonts, Metrics, Colors } from "../../themes";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getProductVariantsSelector } from '../../containers/product-detail/selector';
import { selectVariant, removeVariant, resetVariant } from '../../redux/actions/product';
import { getMyCart } from '../../redux/actions/cart';
import KeyBoardScroll from '../KeyBoardScroll';
import LoadingView from '../LoadingView';
import { _global } from '../../core/global';
import { formatCurency } from '../../common/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.WIDTH,
    borderColor: Colors.greys,
    paddingLeft: 16,
    paddingRight: 16
  },
  viewLeft: {
    flex: 1,
  },
  itemTitle: {
    width: Metrics.WIDTH * 0.35,
    color: "#0e1130",
    fontSize: Fonts.moderateScale(14),
    textAlign: "left"
  },
  itemPrice: {
    color: "#ff0000",
    fontSize: Fonts.moderateScale(12),
  },
  priceView: {
    width: Metrics.WIDTH * 0.35,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: "row",
    alignItems: 'center',
    // justifyContent: 'space-between'
  },
  oldItemPrice: {
    color: "#bbbbbb",
    fontSize: Fonts.moderateScale(12),
    marginLeft: 5,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  viewPoint: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  txtPoint: {
    color: "#F2994A",
    fontSize: Fonts.moderateScale(12),
  },

  viewItem: {
    justifyContent: "center",
    marginTop: 10,
  },

  itemContent: {
    width: Metrics.WIDTH * 0.35,
    color: "#0e1130",
    fontSize: Fonts.moderateScale(13),
    marginTop: 5,
    textAlign: "left"
  },

  viewCount: {
    flexDirection: 'row',
    marginTop: 5,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  viewSub: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greys,
    marginRight: 10
  },
  txtCount: {
    color: "#0e1130",
    fontSize: Fonts.moderateScale(14),
  },
  viewAdd: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
    marginLeft: 10
  },
  btn: {
    width: Metrics.WIDTH * 0.96,
    height: Metrics.HEIGHT * 0.05,
    backgroundColor: Colors.red,
    borderColor: Colors.yellow,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 3,
    marginTop: 16
  },
  btnText: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
  },

  viewSize: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greys,
    marginRight: 10
  },
  viewVariant: {
    height: 36,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    borderColor: Colors.greys,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginRight: 8,
    marginBottom: 5
  },
});


class ProductVariant extends PureComponent {
  constructor(props) {
    super(props);
    // this.props.getProductDetail({ productId: item.id }, true);
    this.state = {
      quantity: 1,
      loading: false
    }
  }
  componentWillUnmount() {
    this.props.resetVariant();
  }

  render() {
    let { quantity, loading } = this.state;
    let { productDetail, productVariants } = this.props;
    const attributes = productVariants && productVariants.attributes;
    const productAvailables = productVariants && productVariants.productAvailables;
    const validVariant = productVariants && productVariants.validVariant;
    const disabled = !productAvailables || productAvailables.length !== 1 || !validVariant;
    let quantityAvail = productAvailables && productAvailables.length > 0 && productAvailables[0].quantity || 0;

    let Component = disabled ? View : TouchableOpacity;
    if (productDetail.loading || loading) {
      return <LoadingView />
    }
    return (
      <KeyBoardScroll
        contentContainerStyle={styles.container}
      >
        <View style={styles.viewPoint}>
          <View style={styles.viewLeft}>
            <Text style={styles.itemTitle} numberOfLines={1}>{productDetail.data.name}</Text>
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
            <Text style={styles.itemContent} numberOfLines={1}>Còn {quantityAvail} sản phẩm</Text>
          </View>
          <View>
            {/* <Text style={styles.txtPoint}>{productDetail.data.point} points</Text> */}
          </View>
        </View>

        {
          attributes && attributes.map((item, index) => {
            return (
              <View style={styles.viewItem} key={`item-${index}`}>
                <Text style={styles.itemContent} numberOfLines={1}>{item.name}</Text>
                <View style={styles.viewCount}>
                  {
                    item.values && item.values.map((e, i) => {
                      const canClick = e.selected === undefined || !!e.selected;
                      // const Component = canClick ? TouchableOpacity : View;
                      const Component = TouchableOpacity;
                      return (
                        <Component key={`item-${i}`} style={[styles.viewVariant, e.selected ? { backgroundColor: Colors.red } : canClick ? { backgroundColor: Colors.white } : { backgroundColor: Colors.white }]} onPress={() => this.selectVariant(item.code, e.value, e.selected)}>
                          <Text style={styles.txtCount}>{e.value}</Text>
                        </Component>
                      )
                    })
                  }
                </View>
              </View>
            )
          })
        }

        {
          <View style={styles.viewItem}>
            <Text style={styles.itemContent} numberOfLines={1}>Số lượng</Text>
            <View style={styles.viewCount}>
              <Component style={[styles.viewSub, disabled ? { backgroundColor: Colors.greys } : undefined]} onPress={this.decrease}>
                <MaterialIcons name='remove' size={20} color={Colors.gray} />
              </Component>
              <Text style={styles.txtCount}>{quantity}</Text>
              <Component style={[styles.viewAdd, disabled ? { backgroundColor: Colors.greys } : undefined]} onPress={this.increase}>
                <MaterialIcons name='add' size={20} color={Colors.white} />
              </Component>
            </View>
          </View>
        }

        <Button
          style={[styles.btn, disabled ? { backgroundColor: Colors.greys } : undefined]}
          disabled={disabled}
          onPress={this.addToCart}
        >
          <Text style={styles.btnText}>Thêm vào giỏ</Text>
        </Button>
      </KeyBoardScroll>
    )
  }

  selectVariant = (code, value, selected) => {
    console.log(`item:`, { code, value });
    if (selected) {
      this.props.removeVariant({ code, value });
    } else {
      this.props.selectVariant({ code, value });
    }
  }

  decrease = () => {
    let { productVariants } = this.props;
    let { quantity } = this.state;
    const productAvailables = productVariants && productVariants.productAvailables;
    // let quantityAvail = productAvailables && productAvailables.length > 0 && productAvailables[0].quantity || 0;

    if (quantity <= 1) return;

    this.setState({
      quantity: quantity - 1
    });
  }

  increase = () => {
    let { productVariants } = this.props;
    let { quantity } = this.state;
    const productAvailables = productVariants && productVariants.productAvailables;
    let quantityAvail = productAvailables && productAvailables.length > 0 && productAvailables[0].quantity || 0;

    if (quantity >= quantityAvail) return;

    this.setState({
      quantity: quantity + 1
    });
  }

  addToCart = async () => {
    let { productVariants, onClose } = this.props;
    let { quantity } = this.state;
    onClose && onClose();
    const productAvailables = productVariants && productVariants.productAvailables;
    let quantityAvail = productAvailables && productAvailables.length > 0 && productAvailables[0].quantity || 0;
    if (quantityAvail < 1) {
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác.',
        leftButton: { text: 'OK' }
      });
      return;
    }
    this.setState({ loading: true });
    const response = await _global.connection.addToCart({
      productId: productAvailables[0].id,
      quantity
    }, { dontShowLoading: true });
    this.setState({ loading: false });
    if (!response.success) {
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Thêm vào giỏ hàng thất bại',
        leftButton: { text: 'OK' }
      });
    }
    this.props.getMyCart(null, { dontShowLoading: true });
  }
}

const mapDispathToProps = {
  selectVariant,
  removeVariant,
  resetVariant,
  getMyCart,
}

const mapStateToProps = (state, props) => {
  return {
    productDetail: state.product.productDetail,
    productVariants: getProductVariantsSelector(state, props),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(ProductVariant);