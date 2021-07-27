/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

'use strick';

import { all, fork } from 'redux-saga/effects';
import * as authen from './authen';
import * as home from './home';
import * as product from './product';
import * as category from './category';
import * as childCategory from './child-category';
import * as cart from './cart';
import * as order from './order';
import * as shippingAddress from './shipping-address';
import * as onesignal from './onesignal';
import * as notification from './notification';
import * as livestream from './livestream';
import * as store from './store';

export default function* rootSaga() {
    yield all([
        ...Object.values(authen),
        ...Object.values(home),
        ...Object.values(product),
        ...Object.values(category),
        ...Object.values(childCategory),
        ...Object.values(cart),
        ...Object.values(order),
        ...Object.values(shippingAddress),
        ...Object.values(onesignal),
        ...Object.values(notification),
        ...Object.values(livestream),
        ...Object.values(store),
    ].map(fork));
}
