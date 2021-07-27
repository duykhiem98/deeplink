/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ShippingAddressComponent from '../../screens/shipping-address';
import { getCity, getDistrict, getWard, getMyShippingAddress, addMyShippingAddress } from '../../redux/actions/shipping-address';

class ShippingAddress extends PureComponent {
  render() {
    return (
      <>
        <ShippingAddressComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  getCity,
  getDistrict,
  getWard,
  getMyShippingAddress,
  addMyShippingAddress
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
    shippingAddress: state.shipAddress.shippingAddress,
    cities: state.shipAddress.cities,
    districts: state.shipAddress.districts,
    wards: state.shipAddress.wards,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(ShippingAddress);
