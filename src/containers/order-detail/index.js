/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import OrderDetailComponent from '../../screens/order-detail';

class OrderDetail extends PureComponent {
  render() {
    return (
      <>
        <OrderDetailComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    shippingAddress: state.shipAddress.shippingAddress,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(OrderDetail);
