/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const setChildCategorySuccess = (data) => {
    return {
        type: types.SET_CHILD_CATEGORY_SUCCESS,
        payload: data
    }
}

export const getProductByCateId = (data) => {
    return {
        type: types.GET_PRODUCT_BY_CATE_ID,
        payload: data
    }
}

export const getProductByCateIdSuccess = (data) => {
    return {
        type: types.GET_PRODUCT_BY_CATE_ID_SUCCESS,
        payload: data
    }
}

export const getProductByCateIdFailed = (data) => {
    return {
        type: types.GET_PRODUCT_BY_CATE_ID_FAILED,
        payload: data
    }
}

export const getProductRelate = (data) => {
    return {
        type: types.GET_PRODUCT_RELATE,
        payload: data
    }
}

export const getProductRelateSuccess = (data) => {
    return {
        type: types.GET_PRODUCT_RELATE_SUCCESS,
        payload: data
    }
}

export const getProductRelateFailed = (data) => {
    return {
        type: types.GET_PRODUCT_RELATE_FAILED,
        payload: data
    }
}

export const getChildCategory = (data) => {
    return {
        type: types.GET_CHILD_CATEGORY,
        payload: data
    }
}

export const getChildCategorySuccess = (data) => {
    return {
        type: types.GET_CHILD_CATEGORY_SUCCESS,
        payload: data
    }
}

export const getChildCategoryFailed = (data) => {
    return {
        type: types.GET_CHILD_CATEGORY_FAILED,
        payload: data
    }
}