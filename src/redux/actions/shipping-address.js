/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const getCity = (data) => {
    return {
        type: types.GET_CITY,
        payload: data
    }
}

export const getCitySuccess = (data) => {
    return {
        type: types.GET_CITY_SUCCESS,
        payload: data
    }
}

export const getCityFailed = (data) => {
    return {
        type: types.GET_CITY_FAILED,
        payload: data
    }
}

export const getDistrict = (data) => {
    return {
        type: types.GET_DISTRICT,
        payload: data
    }
}

export const getDistrictSuccess = (data) => {
    return {
        type: types.GET_DISTRICT_SUCCESS,
        payload: data
    }
}

export const getDistrictFailed = (data) => {
    return {
        type: types.GET_DISTRICT_FAILED,
        payload: data
    }
}

export const getWard = (data) => {
    return {
        type: types.GET_WARD,
        payload: data
    }
}

export const getWardSuccess = (data) => {
    return {
        type: types.GET_WARD_SUCCESS,
        payload: data
    }
}

export const getWardFailed = (data) => {
    return {
        type: types.GET_WARD_FAILED,
        payload: data
    }
}

export const getMyShippingAddress = (data) => {
    return {
        type: types.GET_MY_SHIPPING_ADDRESS,
        payload: data
    }
}

export const getMyShippingAddressSuccess = (data) => {
    return {
        type: types.GET_MY_SHIPPING_ADDRESS_SUCCESS,
        payload: data
    }
}

export const getMyShippingAddressFailed = (data) => {
    return {
        type: types.GET_MY_SHIPPING_ADDRESS_FAILED,
        payload: data
    }
}

export const addMyShippingAddress = (data) => {
    return {
        type: types.ADD_MY_SHIPPING_ADDRESS,
        payload: data
    }
}

export const addMyShippingAddressSuccess = (data) => {
    return {
        type: types.ADD_MY_SHIPPING_ADDRESS_SUCCESS,
        payload: data
    }
}

export const addMyShippingAddressFailed = (data) => {
    return {
        type: types.ADD_MY_SHIPPING_ADDRESS_FAILED,
        payload: data
    }
}
