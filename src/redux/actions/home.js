/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const getHomeProduct = (data) => {
    return {
        type: types.GET_HOME_PRODUCT,
        payload: data
    }
}

export const getHomeProductSuccess = (data) => {
    return {
        type: types.GET_HOME_PRODUCT_SUCCESS,
        payload: data
    }
}

export const getHomeProductFailed = (data) => {
    return {
        type: types.GET_HOME_PRODUCT_FAILED,
        payload: data
    }
}

export const getBanner = (data) => {
    return {
        type: types.GET_BANNER,
        payload: data
    }
}

export const getBannerSuccess = (data) => {
    return {
        type: types.GET_BANNER_SUCCESS,
        payload: data
    }
}

export const getBannerFailed = (data) => {
    return {
        type: types.GET_BANNER_FAILED,
        payload: data
    }
}

export const getFlag = (data) => {
    return {
        type: types.GET_FLAG,
        payload: data
    }
}

export const getFlagSuccess = (data) => {
    return {
        type: types.GET_FLAG_SUCCESS,
        payload: data
    }
}

export const getFlagFailed = (data) => {
    return {
        type: types.GET_FLAG_SUCCESS,
        payload: data
    }
}