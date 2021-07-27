/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

'use strick';

import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import codepush from './codepush';
import config from './config';
import home from './home';
import product from './product';
import category from './category';
import childCategory from './child-category';
import cart from './cart';
import order from './order';
import shipAddress from './shipping-address';
import notification from './notification';
import livestream from './livestream';
import store from './store';

const setupConfig = {
  key: 'configReducer',
  storage: AsyncStorage
}

export default combineReducers({
  codepush,
  config: persistReducer(setupConfig, config),
  home,
  product,
  category,
  childCategory,
  cart,
  order,
  shipAddress,
  notification,
  livestream,
  store,
});
