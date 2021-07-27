/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import OrderComponent from '../../screens/order';
import { getMyCart } from '../../redux/actions/cart';
import { createOrder } from '../../redux/actions/order';
import { getMyCartSelector, getPaymentInfoSelector } from '../cart/selector';

class Order extends PureComponent {
  render() {
    return (
      <>
        <OrderComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  getMyCart,
  createOrder,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    cart: getMyCartSelector(state, props),
    shippingAddress: state.shipAddress.shippingAddress,
    paymentInfo: getPaymentInfoSelector(state, props)
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Order);
