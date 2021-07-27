/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const resetProductScreen = (data) => {
    return {
        type: types.RESET_PRODUCT_SCREEN,
        payload: data
    }
}

export const getCategory = (data) => {
    return {
        type: types.GET_CATEGORY,
        payload: data
    }
}

export const getCategorySuccess = (data) => {
    return {
        type: types.GET_CATEGORY_SUCCESS,
        payload: data
    }
}

export const getCategoryFailed = (data) => {
    return {
        type: types.GET_CATEGORY_FAILED,
        payload: data
    }
}

export const getProduct = (data, option) => {
    return {
        type: types.GET_PRODUCT,
        payload: data,
        option
    }
}

export const getProductSuccess = (data) => {
    return {
        type: types.GET_PRODUCT_SUCCESS,
        payload: data
    }
}

export const getProductFailed = (data) => {
    return {
        type: types.GET_PRODUCT_FAILED,
        payload: data
    }
}

export const getProductDetail = (data, loading) => {
    return {
        type: types.GET_PRODUCT_DETAIL,
        payload: data,
        loading
    }
}

export const getProductDetailSuccess = (data) => {
    return {
        type: types.GET_PRODUCT_DETAIL_SUCCESS,
        payload: data
    }
}

export const getProductDetailFailed = (data) => {
    return {
        type: types.GET_PRODUCT_DETAIL_FAILED,
        payload: data
    }
}

export const selectVariant = (data) => {
    return {
        type: types.SELECT_VARIANT,
        payload: data
    }
}

export const removeVariant = (data) => {
    return {
        type: types.REMOVE_VARIANT,
        payload: data
    }
}

export const resetVariant = (data) => {
    return {
        type: types.RESET_VARIANT,
        payload: data
    }
}

export const getMyWishlist = (data) => {
    return {
        type: types.GET_MY_WISHLIST,
        payload: data
    }
}

export const getMyWishlistSuccess = (data) => {
    return {
        type: types.GET_MY_WISHLIST_SUCCESS,
        payload: data
    }
}

export const getMyWishlistFailed = (data) => {
    return {
        type: types.GET_MY_WISHLIST_SUCCESS,
        payload: data
    }
}

export const updateWishlist = (data) => {
    return {
        type: types.UPDATE_WISHLIST,
        payload: data
    }
}

export const addToWishlist = (data) => {
    return {
        type: types.ADD_TO_WISHLIST,
        payload: data
    }
}

export const addToWishlistSuccess = (data) => {
    return {
        type: types.ADD_TO_WISHLIST_SUCCESS,
        payload: data
    }
}

export const addToWishlistFailed = (data) => {
    return {
        type: types.ADD_TO_WISHLIST_FAILED,
        payload: data
    }
}

export const removeFromWishlist = (data) => {
    return {
        type: types.REMOVE_FROM_WISHLIST,
        payload: data
    }
}

export const removeFromWishlistSuccess = (data) => {
    return {
        type: types.REMOVE_FROM_WISHLIST_SUCCESS,
        payload: data
    }
}

export const removeFromWishlistFailed = (data) => {
    return {
        type: types.REMOVE_FROM_WISHLIST_FAILED,
        payload: data
    }
}