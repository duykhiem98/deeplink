/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { takeLatest, put, delay } from "redux-saga/effects";
import * as types from '../types';
import * as actions from '../actions/child-category';
import { _global } from '../../core/global';

/**
* 
*/
function* sagaGetProduct(action) {
  try {
    const response = yield _global.connection.getProducts(action.payload);
    yield put(actions.getProductByCateChildIdSuccess(response));
  } catch (e) {
    console.log('sagaGetProduct err:', e);
    yield put(actions.getProductByCateChildIdFailed());
  }
}

export function* watchGetProduct() {
  yield takeLatest(types.GET_PRODUCT_BY_CATE_CHILD_ID, sagaGetProduct);
}