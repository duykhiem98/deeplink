/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ProductComponent from '../../screens/product';
import { getProductByCateId } from '../../redux/actions/category';
import { resetProductScreen, getCategory, getProduct, getProductDetail, addToWishlist, removeFromWishlist } from '../../redux/actions/product';
import { LIMIT, STORY_ID } from '../../common/constant';
import { getProductsInTabSelector } from './selector';

class Product extends PureComponent {
  constructor(props) {
    super(props);
    props.getCategory({ storeId: STORY_ID });
    // props.getProduct({ limit: LIMIT, page: 1 });
    // props.getProductByCateId({ limit: LIMIT, categoryId: props.id });
  }

  render() {
    return (
      <>
        <ProductComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  resetProductScreen,
  getCategory,
  getProduct,
  getProductDetail,
  addToWishlist,
  removeFromWishlist,
  getProductByCateId,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    categories: state.product.categories,
    products: state.product.products,
    productsInTab: getProductsInTabSelector(state),
    loading: state.product.loading,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Product);
