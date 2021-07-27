/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LiveComponent from '../../screens/live';
import { getLivestreamDetail, getProductOfLivestream } from '../../redux/actions/livestream';
import { getStoreById } from '../../redux/actions/store';
import { LIMIT } from '../../common/constant';

class Live extends PureComponent {
  constructor(props) {
    super(props);
    props.getLivestreamDetail({ livestreamId: props.id });
    props.getProductOfLivestream({ livestreamId: props.id, limit: LIMIT, page: 1 });
    props.getStoreById({ storeId: props.storeId });
  }

  render() {
    return (
      <>
        <LiveComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  getLivestreamDetail,
  getProductOfLivestream,
  getStoreById,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    livestreamDetail: state.livestream.livestreamDetail,
    products: state.livestream.products,
    storeDetail: state.store.storeDetail,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Live);
