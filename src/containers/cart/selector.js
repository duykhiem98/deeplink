/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { createSelector } from 'reselect';

const cartSelector = state => state.cart.cart;
const propsSelector = (state, props) => props;

export const getMyCartSelector = createSelector(
    cartSelector,
    propsSelector,
    (cart, props) => {
        return cart;
    }
)

export const getPaymentInfoSelector = createSelector(
    cartSelector,
    propsSelector,
    (cart, props) => {
        let totalAmount = 0;
        let discount = 0;
        cart && cart.items && cart.items.map(e => {
            let product = e.product;
            discount += product.salePrice * e.quantity;
        });
        let promotionPrice = 0;
        let shipPrice = 0;
        totalAmount = discount + promotionPrice + shipPrice;
        return {
            discount,
            promotionPrice,
            shipPrice,
            totalAmount
        };
    }
)