/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ProductDetailComponent from '../../screens/product-detail';
import { getProductByCateId } from '../../redux/actions/category';
import { getProductDetail, addToWishlist, removeFromWishlist } from '../../redux/actions/product';
import { getProductsRelateSelector } from './selector';

class ProductDetail extends PureComponent {
  constructor(props) {
    super(props);
    props.getProductDetail({ productId: props.id });
  }

  render() {
    return (
      <>
        <ProductDetailComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  getProductDetail,
  addToWishlist,
  removeFromWishlist,
  getProductByCateId,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    productDetail: state.product.productDetail,
    // productsRelate: getProductsRelateSelector(state, props),
    productsRelate: state.category.productsRelate,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(ProductDetail);
