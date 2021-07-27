/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, delay } from "redux-saga/effects";
import * as types from '../types';
import * as loadingActions from '../actions/config';
import * as cartActions from '../actions/cart';
import * as shipActions from '../actions/shipping-address';
import * as actions from '../actions/authen';
import * as onesignalActions from '../actions/onesignal';
import { _global } from '../../core/global';
import NavigationService from "../../navigation/NavigationService";

/**
* Login
*/
function* sagaLogin(action) {
  try {
    const response = yield _global.connection.login(action.payload);
    yield put(actions.loginSuccess({ user: { ...action.payload }, token: response.access_token }));
    yield put(actions.inited());
  } catch (e) {
    console.log('sagaLogin err:', e);
    // yield put(actions.resetConfig());
    // NavigationService.reset('homeStack');
  }
}

export function* watchLogin() {
  console.log('watchLogin');
  yield takeLatest(types.LOGIN, sagaLogin);
}

/**
* Login social
*/
function* sagaLoginSocial(action) {
  try {
    const response = yield _global.connection.loginSocial(action.payload);
    yield put(actions.loginSocialSuccess({ user: { ...action.payload }, token: response.access_token }));
    yield put(actions.inited());
  } catch (e) {
    console.log('sagaLoginSocial err:', e);
    yield put(actions.resetConfig());
    NavigationService.reset('homeStack');
  }
}

export function* watchLoginSocial() {
  yield takeLatest(types.LOGIN_SOCIAL, sagaLoginSocial)
}

function* sagaInitialData(action) {
  try {
    yield put(onesignalActions.addUserIdDevice());
    yield put(actions.getProfile());
    yield put(shipActions.getMyShippingAddress());
    yield put(cartActions.getMyCart());
    setTimeout(() => {
      NavigationService.reset('homeStack');
    }, 100);

  } catch (error) {
    console.log('sagaInitialData err:', error);
  }
}

// Individual exports for testing
export function* watchInitialData() {
  yield takeLatest(types.CONFIG_INITED, sagaInitialData);
}

/**
* Register
*/
function* sagaRegister(action) {
  try {
    const response = yield _global.connection.register(action.payload);
    yield put(actions.registerSuccess({ user: { ...action.payload }, token: response.access_token }));
    yield put(actions.inited());
  } catch (e) {
    console.log('sagaRegister err:', e);
    yield put(actions.registerFailed());
  }
}

export function* watchRegister() {
  yield takeLatest(types.REGISTER, sagaRegister);
}

/**
* Reset password
*/
function* sagaResetPassword(action) {
  try {
    yield _global.connection.resetPassword(action.payload);
    NavigationService.reset('authenStack');
  } catch (e) {
    console.log('sagaResetPassword err:', e);
    yield put(actions.resetPasswordFailed());
  }
}

export function* watchResetPassword() {
  yield takeLatest(types.RESET_PASSWORD, sagaResetPassword);
}

function* sagaGetProfile(action) {
  try {
    const response = yield _global.connection.getProfile(action.payload);
    yield put(actions.getProfileSuccess(response));
  } catch (e) {
    console.log('sagaGetProfile err:', e);
    yield put(actions.getProfileFailed());
  }
}

export function* watchGetProfile() {
  yield takeLatest(types.GET_PROFILE, sagaGetProfile);
}

/**
* Logout
*/
function* sagaLogout(action) {
  try {
    yield put(actions.resetConfig());
    NavigationService.reset('authenStack');
  } catch (e) {
    console.log('sagaLogout err:', e);
  }
}

export function* watchLogout() {
  yield takeLatest(types.LOGOUT, sagaLogout);
}