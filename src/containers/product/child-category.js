/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ChildCategoryComponent from '../../screens/product/ChildCategory';
import { getProductByCateChildId } from '../../redux/actions/child-category';
import { addToWishlist, removeFromWishlist } from '../../redux/actions/product';
import { LIMIT } from '../../common/constant';

class ChildCategory extends PureComponent {
  constructor(props) {
    super(props);
    props.getProductByCateChildId({ limit: LIMIT, page: 1, categoryId: props.id });
  }

  render() {
    return (
      <>
        <ChildCategoryComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  getProductByCateChildId,
  addToWishlist,
  removeFromWishlist,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    products: state.childCategory.products,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(ChildCategory);
