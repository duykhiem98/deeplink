/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, delay } from "redux-saga/effects";
import * as types from '../types';
import * as actions from '../actions/cart';
import { _global } from '../../core/global';

/**
* 
*/
function* sagaGetMyCart(action) {
  try {
    const response = yield _global.connection.getMyCart(action.payload, action.option);
    yield put(actions.getMyCartSuccess(response));
  } catch (e) {
    console.log('sagaGetMyCart err:', e);
    yield put(actions.getMyCartFailed());
  }
}

export function* watchGetMyCart() {
  yield takeLatest(types.GET_MY_CART, sagaGetMyCart);
}

/**
* 
*/
function* sagaAddToCart(action) {
  try {
    const response = yield _global.connection.addToCart(action.payload);
    yield put(actions.addToCartSuccess(response));
  } catch (e) {
    console.log('sagaAddToCart err:', e);
    yield put(actions.addToCartFailed());
  }
}

export function* watchAddToCart() {
  yield takeLatest(types.ADD_TO_CART, sagaAddToCart);
}

/**
* 
*/
function* sagaRemoveItemFromCart(action) {
  try {
    const response = yield _global.connection.removeItemFromCart(action.payload);
    yield put(actions.removeItemFromCartSuccess(response));
    yield put(actions.getMyCart());
  } catch (e) {
    console.log('sagaRemoveItemFromCart err:', e);
    yield put(actions.removeItemFromCartFailed());
  }
}

export function* watchRemoveItemFromCart() {
  yield takeLatest(types.REMOVE_ITEM_FROM_CART, sagaRemoveItemFromCart);
}

/**
* 
*/
function* sagaClearDisabledItemFromCart(action) {
  try {
    const response = yield _global.connection.clearDisabledItemFromCart(action.payload);
    yield put(actions.clearDisabledItemFromCartSuccess(response));
  } catch (e) {
    console.log('sagaClearDisabledItemFromCart err:', e);
    yield put(actions.clearDisabledItemFromCartFailed());
  }
}

export function* watchClearDisabledItemFromCart() {
  yield takeLatest(types.CLEAR_DISABLED_ITEM_FROM_CART, sagaClearDisabledItemFromCart);
}

/**
* 
*/
function* sagaChangeQuantityItemInCart(action) {
  try {
    const response = yield _global.connection.changeQuantityItemInCart(action.payload, { dontShowLoading: true });
    yield put(actions.changeQuantityItemInCartSuccess(response));
    yield put(actions.getMyCart(null, { dontShowLoading: true }));
  } catch (e) {
    console.log('sagaChangeQuantityItemInCart err:', e);
    yield put(actions.changeQuantityItemInCartFailed());
  }
}

export function* watchChangeQuantityItemInCart() {
  yield takeLatest(types.CHANGE_QUANTITY_ITEM_IN_CART, sagaChangeQuantityItemInCart);
}