/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const getProductByCateChildId = (data) => {
    return {
        type: types.GET_PRODUCT_BY_CATE_CHILD_ID,
        payload: data
    }
}

export const getProductByCateChildIdSuccess = (data) => {
    return {
        type: types.GET_PRODUCT_BY_CATE_CHILD_ID_SUCCESS,
        payload: data
    }
}

export const getProductByCateChildIdFailed = (data) => {
    return {
        type: types.GET_PRODUCT_BY_CATE_CHILD_ID_FAILED,
        payload: data
    }
}