/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const showLoading = (data) => {
    return {
        type: types.SHOW_LOADING,
        payload: data
    }
}

export const hideLoading = (data) => {
    return {
        type: types.HIDE_LOADING,
        payload: data
    }
}