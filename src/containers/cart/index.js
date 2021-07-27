/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CartComponent from '../../screens/cart';
import { getMyCart, removeItemFromCart, changeQuantityItemInCart, draftCart } from '../../redux/actions/cart';
import { getMyCartSelector, getPaymentInfoSelector } from './selector';

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getMyCart();
  }
  render() {
    return (
      <>
        <CartComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  getMyCart,
  removeItemFromCart,
  changeQuantityItemInCart,
  draftCart,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    cart: getMyCartSelector(state, props),
    paymentInfo: getPaymentInfoSelector(state, props)
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Cart);
