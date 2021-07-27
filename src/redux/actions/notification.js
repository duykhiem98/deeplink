/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const getNotification = (data) => {
    return {
        type: types.GET_NOTIFICATION,
        payload: data
    }
}

export const getNotificationSuccess = (data) => {
    return {
        type: types.GET_NOTIFICATION_SUCCESS,
        payload: data
    }
}

export const getNotificationFailed = (data) => {
    return {
        type: types.GET_NOTIFICATION_FAILED,
        payload: data
    }
}