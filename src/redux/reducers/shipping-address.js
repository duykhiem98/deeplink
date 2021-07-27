/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

const initialState = {
  loading: false,
  cities: [],
  districts: [],
  wards: [],
  shippingAddress: {
    addressDefault: true,
    addressLine1: "",
    addressLine2: "",
    cityCode: "",
    cityName: "",
    districtCode: "",
    districtName: "",
    mobile: "",
    wardCode: "",
    wardName: "",
    fullName: ""
  },
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case types.GET_CITY_SUCCESS:
      return {
        ...state,
        cities: action.payload,
      }
    case types.GET_DISTRICT_SUCCESS:
      return {
        ...state,
        districts: action.payload,
      }
    case types.GET_WARD_SUCCESS:
      return {
        ...state,
        wards: action.payload,
      }
    case types.GET_MY_SHIPPING_ADDRESS_SUCCESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
      case types.LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}
