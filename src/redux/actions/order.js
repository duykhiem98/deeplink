/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const getOrder = (data) => {
    return {
        type: types.GET_ORDER,
        payload: data
    }
}

export const getOrderSuccess = (data) => {
    return {
        type: types.GET_ORDER_SUCCESS,
        payload: data
    }
}

export const getOrderFailed = (data) => {
    return {
        type: types.GET_ORDER_FAILED,
        payload: data
    }
}

export const getOrderOfStore = (data) => {
    return {
        type: types.GET_ORDER_OF_STORE,
        payload: data
    }
}

export const getOrderOfStoreSuccess = (data) => {
    return {
        type: types.GET_ORDER_OF_STORE_SUCCESS,
        payload: data
    }
}

export const getOrderOfStoreFailed = (data) => {
    return {
        type: types.GET_ORDER_OF_STORE_FAILED,
        payload: data
    }
}

export const createOrder = (data) => {
    return {
        type: types.CREATE_ORDER,
        payload: data
    }
}

export const createOrderSuccess = (data) => {
    return {
        type: types.CREATE_ORDER_SUCCESS,
        payload: data
    }
}

export const createOrderFailed = (data) => {
    return {
        type: types.CREATE_ORDER_FAILED,
        payload: data
    }
}

export const getOrderDetail = (data) => {
    return {
        type: types.GET_ORDER_DETAIL,
        payload: data
    }
}

export const getOrderDetailSuccess = (data) => {
    return {
        type: types.GET_ORDER_DETAIL_SUCCESS,
        payload: data
    }
}

export const getOrderDetailFailed = (data) => {
    return {
        type: types.GET_ORDER_DETAIL_FAILED,
        payload: data
    }
}

export const cancelOrder = (data) => {
    return {
        type: types.CANCEL_ORDER,
        payload: data
    }
}

export const cancelOrderSuccess = (data) => {
    return {
        type: types.CANCEL_ORDER_SUCCESS,
        payload: data
    }
}

export const cancelOrderFailed = (data) => {
    return {
        type: types.CANCEL_ORDER_FAILED,
        payload: data
    }
}

export const cancelItemInOrder = (data) => {
    return {
        type: types.CANCEL_ITEM_IN_ORDER,
        payload: data
    }
}

export const cancelItemInOrderSuccess = (data) => {
    return {
        type: types.CANCEL_ITEM_IN_ORDER_SUCCESS,
        payload: data
    }
}

export const cancelItemInOrderFailed = (data) => {
    return {
        type: types.CANCEL_ITEM_IN_ORDER_FAILED,
        payload: data
    }
}
