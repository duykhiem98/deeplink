/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const getMyCart = (data, option) => {
    return {
        type: types.GET_MY_CART,
        payload: data,
        option
    }
}

export const getMyCartSuccess = (data) => {
    return {
        type: types.GET_MY_CART_SUCCESS,
        payload: data
    }
}

export const getMyCartFailed = (data) => {
    return {
        type: types.GET_MY_CART_FAILED,
        payload: data
    }
}

export const addToCart = (data) => {
    return {
        type: types.ADD_TO_CART,
        payload: data
    }
}

export const addToCartSuccess = (data) => {
    return {
        type: types.ADD_TO_CART_SUCCESS,
        payload: data
    }
}

export const addToCartFailed = (data) => {
    return {
        type: types.ADD_TO_CART_FAILED,
        payload: data
    }
}

export const removeItemFromCart = (data) => {
    return {
        type: types.REMOVE_ITEM_FROM_CART,
        payload: data
    }
}

export const removeItemFromCartSuccess = (data) => {
    return {
        type: types.REMOVE_ITEM_FROM_CART_SUCCESS,
        payload: data
    }
}

export const removeItemFromCartFailed = (data) => {
    return {
        type: types.REMOVE_ITEM_FROM_CART_FAILED,
        payload: data
    }
}

export const clearDisabledItemFromCart = (data) => {
    return {
        type: types.CLEAR_DISABLED_ITEM_FROM_CART,
        payload: data
    }
}

export const clearDisabledItemFromCartSuccess = (data) => {
    return {
        type: types.CLEAR_DISABLED_ITEM_FROM_CART_SUCCESS,
        payload: data
    }
}

export const clearDisabledItemFromCartFailed = (data) => {
    return {
        type: types.CLEAR_DISABLED_ITEM_FROM_CART_FAILED,
        payload: data
    }
}

export const changeQuantityItemInCart = (data) => {
    return {
        type: types.CHANGE_QUANTITY_ITEM_IN_CART,
        payload: data
    }
}

export const changeQuantityItemInCartSuccess = (data) => {
    return {
        type: types.CHANGE_QUANTITY_ITEM_IN_CART_SUCCESS,
        payload: data
    }
}

export const changeQuantityItemInCartFailed = (data) => {
    return {
        type: types.CHANGE_QUANTITY_ITEM_IN_CART_FAILED,
        payload: data
    }
}

export const draftCart = (data) => {
    return {
        type: types.DRAFT_CART,
        payload: data
    }
}

export const draftCartSuccess = (data) => {
    return {
        type: types.DRAFT_CART_SUCCESS,
        payload: data
    }
}

export const draftCartFailed = (data) => {
    return {
        type: types.DRAFT_CART_FAILED,
        payload: data
    }
}