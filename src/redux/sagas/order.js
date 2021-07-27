/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, delay } from "redux-saga/effects";
import * as types from '../types';
import * as cartActions from '../actions/cart';
import * as actions from '../actions/order';
import { _global } from '../../core/global';

/**
* 
*/
function* sagaGetOrder(action) {
  try {
    const response = yield _global.connection.getOrder(action.payload);
    yield put(actions.getOrderSuccess(response));
  } catch (e) {
    console.log('sagaGetOrder err:', e);
    yield put(actions.getOrderFailed());
  }
}

export function* watchGetOrder() {
  yield takeLatest(types.GET_ORDER, sagaGetOrder);
}

/**
* 
*/
function* sagaGetOrderOfStore(action) {
  try {
    const response = yield _global.connection.getOrderOfStore(action.payload);
    yield put(actions.getOrderOfStoreSuccess(response));
  } catch (e) {
    console.log('sagaGetOrderOfStore err:', e);
    yield put(actions.getOrderOfStoreFailed());
  }
}

export function* watchGetOrderOfStore() {
  yield takeLatest(types.GET_ORDER_OF_STORE, sagaGetOrderOfStore);
}

/**
* 
*/
function* sagaCreateOrder(action) {
  try {
    let { order, callback } = action.payload;
    const response = yield _global.connection.createOrder(order);
    yield put(actions.createOrderSuccess(response));
    yield put(actions.getOrder({ limit: 50, page: 1 }));
    yield put(cartActions.getMyCart());
    callback && callback();
  } catch (e) {
    console.log('sagaCreateOrder err:', e);
    yield put(actions.createOrderFailed());
  }
}

export function* watchCreateOrder() {
  yield takeLatest(types.CREATE_ORDER, sagaCreateOrder);
}

/**
* 
*/
function* sagaGetOrderDetail(action) {
  try {
    const response = yield _global.connection.getOrderDetail(action.payload);
    yield put(actions.getOrderDetailSuccess(response));
  } catch (e) {
    console.log('sagaGetOrderDetail err:', e);
    yield put(actions.getOrderDetailFailed());
  }
}

export function* watchGetOrderDetail() {
  yield takeLatest(types.GET_ORDER_DETAIL, sagaGetOrderDetail);
}

/**
* 
*/
function* sagaCancelOrder(action) {
  try {
    const response = yield _global.connection.cancelOrder(action.payload);
    yield put(actions.cancelOrderSuccess(response));
  } catch (e) {
    console.log('sagaCancelOrder err:', e);
    yield put(actions.cancelOrderFailed());
  }
}

export function* watchCancelOrder() {
  yield takeLatest(types.CANCEL_ORDER, sagaCancelOrder);
}

/**
* 
*/
function* sagaCancelItemInOrder(action) {
  try {
    const response = yield _global.connection.cancelItemInOrder(action.payload);
    yield put(actions.cancelItemInOrderSuccess(response));
  } catch (e) {
    console.log('sagaCancelItemInOrder err:', e);
    yield put(actions.cancelItemInOrderFailed());
  }
}

export function* watchCancelItemInOrder() {
  yield takeLatest(types.CANCEL_ITEM_IN_ORDER, sagaCancelItemInOrder);
}