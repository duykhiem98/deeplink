/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export const register = (data) => {
  return {
    type: types.REGISTER,
    payload: data
  }
}
export const registerSuccess = (data) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: data
  }
}
export const registerFailed = (data) => {
  return {
    type: types.REGISTER_FAILED,
    payload: data
  }
}

export const resetPassword = (data) => {
  return {
    type: types.RESET_PASSWORD,
    payload: data
  }
}
export const resetPasswordSuccess = (data) => {
  return {
    type: types.RESET_PASSWORD_SUCCESS,
    payload: data
  }
}
export const resetPasswordFailed = (data) => {
  return {
    type: types.RESET_PASSWORD_FAILED,
    payload: data
  }
}

export const login = (data) => {
  return {
    type: types.LOGIN,
    payload: data
  }
}

export const loginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data
  }
}

export const loginFailed = () => {
  return {
    type: types.LOGIN_FAILED
  }
}

export const loginSocial = (data) => {
  return {
    type: types.LOGIN_SOCIAL,
    payload: data
  }
}

export const loginSocialSuccess = (data) => {
  return {
    type: types.LOGIN_SOCIAL_SUCCESS,
    payload: data
  }
}

export const loginSocialFailed = () => {
  return {
    type: types.LOGIN_SOCIAL_FAILED
  }
}

export const logout = (data) => {
  return {
    type: types.LOGOUT,
    payload: data
  }
}

export const resetConfig = (data) => {
  return {
    type: types.RESET_CONFIG,
    payload: data
  }
}

export const getProfile = (data) => {
  return {
    type: types.GET_PROFILE,
    payload: data
  }
}

export const getProfileSuccess = (data) => {
  return {
    type: types.GET_PROFILE_SUCCESS,
    payload: data
  }
}

export const getProfileFailed = () => {
  return {
    type: types.GET_PROFILE_FAILED
  }
}

export function inited() {
  return {
    type: types.CONFIG_INITED,
  }
}