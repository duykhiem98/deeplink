/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const getLivestream = (data) => {
    return {
        type: types.GET_LIVESTREAM,
        payload: data
    }
}

export const getLivestreamSuccess = (data) => {
    return {
        type: types.GET_LIVESTREAM_SUCCESS,
        payload: data
    }
}

export const getLivestreamFailed = (data) => {
    return {
        type: types.GET_LIVESTREAM_FAILED,
        payload: data
    }
}

export const getLivestreamDetail = (data) => {
    return {
        type: types.GET_LIVESTREAM_DETAIL,
        payload: data
    }
}

export const getLivestreamDetailSuccess = (data) => {
    return {
        type: types.GET_LIVESTREAM_DETAIL_SUCCESS,
        payload: data
    }
}

export const getLivestreamDetailFailed = (data) => {
    return {
        type: types.GET_LIVESTREAM_DETAIL_FAILED,
        payload: data
    }
}

export const getProductOfLivestream = (data) => {
    return {
        type: types.GET_PRODUCT_OF_LIVESTREAM,
        payload: data
    }
}

export const getProductOfLivestreamSuccess = (data) => {
    return {
        type: types.GET_PRODUCT_OF_LIVESTREAM_SUCCESS,
        payload: data
    }
}

export const getProductOfLivestreamFailed = (data) => {
    return {
        type: types.GET_PRODUCT_OF_LIVESTREAM_FAILED,
        payload: data
    }
}