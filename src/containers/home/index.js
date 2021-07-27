/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import HomeComponent from '../../screens/home';
import { getLivestream } from '../../redux/actions/livestream';
import { getHomeProduct, getBanner, getFlag } from '../../redux/actions/home';
import { getProductDetail, addToWishlist, removeFromWishlist } from '../../redux/actions/product';
import { LIMIT } from '../../common/constant';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    props.getLivestream({ limit: LIMIT, page: 1 });
    props.getHomeProduct({ limit: LIMIT, page: 1 });
    props.getBanner();
    props.getFlag();
  }

  render() {
    return (
      <>
        <HomeComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  getLivestream,
  getHomeProduct,
  getBanner,
  getFlag,
  getProductDetail,
  addToWishlist,
  removeFromWishlist,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    livestreams: state.livestream.livestreams,
    banners: state.home.banners,
    flags: state.home.flags,
    lives: state.home.lives,
    newProducts: state.home.newProducts,
    promotionProducts: state.home.promotionProducts,
    hotProducts: state.home.hotProducts,
    loading: state.home.loading,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Home);
