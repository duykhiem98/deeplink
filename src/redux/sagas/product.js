/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, delay } from "redux-saga/effects";
import * as types from '../types';
import * as actionsCategory from '../actions/category';
import * as actions from '../actions/product';
import { _global } from '../../core/global';
import { LIMIT } from "../../common/constant";

/**
* 
*/
function* sagaGetCategory(action) {
  try {
    const response = yield _global.connection.getCategories(action.payload);
    yield put(actions.getCategorySuccess(response));
    if (response && response.length > 0) {
      yield put(actionsCategory.getProductByCateId({ limit: LIMIT, categoryId: response[0].id }));
    }
  } catch (e) {
    console.log('sagaGetCategory err:', e);
    yield put(actions.getCategoryFailed());
  }
}

export function* watchGetCategory() {
  yield takeLatest(types.GET_CATEGORY, sagaGetCategory);
}

/**
* 
*/
function* sagaGetProduct(action) {
  try {
    const response = yield _global.connection.getProducts(action.payload, action.option);
    yield put(actions.getProductSuccess(response));
  } catch (e) {
    console.log('sagaGetProduct err:', e);
    yield put(actions.getProductFailed());
  }
}

export function* watchGetProduct() {
  yield takeLatest(types.GET_PRODUCT, sagaGetProduct);
}

/**
* 
*/
function* sagaGetProductDetail(action) {
  try {
    const response = yield _global.connection.getProductDetail(action.payload, { dontShowLoading: action.loading || false });
    yield put(actions.getProductDetailSuccess(response));
    if (response.category) {
      const res = yield _global.connection.getProducts({ limit: LIMIT, categoryId: response.category.id });
      yield put(actionsCategory.getProductRelateSuccess(res));
    }
  } catch (e) {
    console.log('sagaGetProductDetail err:', e);
    yield put(actions.getProductDetailFailed());
  }
}

export function* watchGetProductDetail() {
  yield takeLatest(types.GET_PRODUCT_DETAIL, sagaGetProductDetail);
}

/**
* 
*/
function* sagaGetMyWishlist(action) {
  try {
    const response = yield _global.connection.getMyWishlist(action.payload);
    yield put(actions.getMyWishlistSuccess(response));
  } catch (e) {
    console.log('sagaGetMyWishlist err:', e);
    yield put(actions.getMyWishlistFailed());
  }
}

export function* watchGetMyWishlist() {
  yield takeLatest(types.GET_MY_WISHLIST, sagaGetMyWishlist);
}

/**
* 
*/
function* sagaAddToWishlist(action) {
  try {
    const response = yield _global.connection.addToWishlist(action.payload);
    yield put(actions.addToWishlistSuccess(response));
    yield put(actions.updateWishlist({ id: action.payload.productId, isWishlist: true }));
  } catch (e) {
    console.log('sagaAddToWishlist err:', e);
    yield put(actions.addToWishlistFailed());
  }
}

export function* watchAddToWishlist() {
  yield takeLatest(types.ADD_TO_WISHLIST, sagaAddToWishlist);
}

/**
* 
*/
function* sagaRemoveFromWishlist(action) {
  try {
    const response = yield _global.connection.removeFromWishlist(action.payload);
    yield put(actions.removeFromWishlistSuccess(response));
    yield put(actions.updateWishlist({ id: action.payload.productId, isWishlist: false }));
  } catch (e) {
    console.log('sagaRemoveFromWishlist err:', e);
    yield put(actions.removeFromWishlistFailed());
  }
}

export function* watchRemoveFromWishlist() {
  yield takeLatest(types.REMOVE_FROM_WISHLIST, sagaRemoveFromWishlist);
}