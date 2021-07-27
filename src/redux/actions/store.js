/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const getStoreById = (data) => {
    return {
        type: types.GET_STORE_BY_ID,
        payload: data
    }
}

export const getStoreByIdSuccess = (data) => {
    return {
        type: types.GET_STORE_BY_ID_SUCCESS,
        payload: data
    }
}

export const getStoreByIdFailed = (data) => {
    return {
        type: types.GET_STORE_BY_ID_FAILED,
        payload: data
    }
}