/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import OrderListComponent from '../../screens/order-list';
import { getOrder } from '../../redux/actions/order';
import { getOrdersSelector } from './selector';

class OrderList extends PureComponent {
  constructor(props) {
    super(props);
    props.getOrder({ limit: 50, page: 1 });
  }

  render() {
    return (
      <>
        <OrderListComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  getOrder,
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    orders: getOrdersSelector(state, props),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(OrderList);
