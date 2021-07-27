/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, delay } from "redux-saga/effects";
import * as types from '../types';
import * as actions from '../actions/category';
import { _global } from '../../core/global';

/**
* 
*/
function* sagaSetCategory(action) {
  try {
    yield put(actions.setChildCategorySuccess(action.payload));
  } catch (e) {
    console.log('sagaSetCategory err:', e);
  }
}

export function* watchGetCategory() {
  yield takeLatest(types.SET_CHILD_CATEGORY, sagaSetCategory);
}

/**
* 
*/
function* sagaGetProduct(action) {
  try {
    const response = yield _global.connection.getProducts(action.payload);
    yield put(actions.getProductByCateIdSuccess(response));
  } catch (e) {
    console.log('sagaGetProduct err:', e);
    yield put(actions.getProductByCateIdFailed());
  }
}

export function* watchGetProduct() {
  yield takeLatest(types.GET_PRODUCT_BY_CATE_ID, sagaGetProduct);
}

/**
* 
*/
function* sagaGetProductRelate(action) {
  try {
    const response = yield _global.connection.getProducts(action.payload);
    yield put(actions.getProductRelateSuccess(response));
  } catch (e) {
    console.log('sagaGetProductRelate err:', e);
    yield put(actions.getProductRelateFailed());
  }
}

export function* watchGetProductRelate() {
  yield takeLatest(types.GET_PRODUCT_RELATE, sagaGetProductRelate);
}


/**
* 
*/
function* sagaGetChildCategory(action) {
  try {
    const response = yield _global.connection.getChildCategories(action.payload);
    yield put(actions.getChildCategorySuccess(response));
  } catch (e) {
    console.log('sagaGetChildCategory err:', e);
    yield put(actions.getChildCategoryFailed());
  }
}

export function* watchGetChildCategory() {
  yield takeLatest(types.GET_CHILD_CATEGORY, sagaGetChildCategory);
}