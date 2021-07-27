/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { createSelector } from 'reselect';
import { COMPLETED, CANCELED, RETURNED, DELIVERED } from '../../common/constant';

const ordersSelector = state => state.order.orders;
const propsSelector = (state, props) => props;

export const getOrdersSelector = createSelector(
    ordersSelector,
    propsSelector,
    (orders, props) => {
        let processingOrder = orders.data && orders.data.filter(e => e.note !== COMPLETED && e.note !== CANCELED && e.note !== RETURNED);
        let historyOrder = orders.data && orders.data.filter(e => e.note === COMPLETED || e.note === CANCELED || e.note === RETURNED);
        // console.log(`processingOrder:`, processingOrder);
        // console.log(`historyOrder:`, historyOrder);
        return {
            ...orders,
            processingOrder,
            historyOrder
        };
    }
)

export const getCompletedOrdersSelector = createSelector(
    ordersSelector,
    (orders) => {
        return orders.data && orders.data.filter(e => e.note === COMPLETED) || [];
    }
)