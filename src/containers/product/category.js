/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CategoryComponent from '../../screens/product/Category';
import { getProductByCateId, getChildCategory } from '../../redux/actions/category';
import { getProductDetail } from '../../redux/actions/product';
import { getChildCategoriesSelector } from './selector';
import { LIMIT } from '../../common/constant';

class Category extends PureComponent {
  constructor(props) {
    super(props);
    props.getChildCategory({ categoryId: props.id });
    props.getProductByCateId({ limit: LIMIT, page: 1, categoryId: props.id });
  }

  render() {
    return (
      <>
        <CategoryComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  getProductByCateId,
  getChildCategory,
  getProductDetail,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    childCategories: state.category.childCategories,
    products: state.category.products,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Category);
