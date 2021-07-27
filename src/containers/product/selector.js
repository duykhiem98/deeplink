/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { createSelector } from 'reselect';

const categoriesSelector = state => state.product.categories;
const productsSelector = state => state.category.products;
const propsSelector = (state, props) => props;

export const getChildCategoriesSelector = createSelector(
    categoriesSelector,
    propsSelector,
    (categories, props) => {
        // console.log(`props.id:`, props.id);
        // console.log(`categories:`, categories);
        if (props.id) {
            return categories && categories.data && categories.data.find(dt => dt.id === props.id);
        }
        return [];
    }
)

export const getProductsInTabSelector = createSelector(
    productsSelector,
    (products) => {
        return {
            productNews: products && products.data && products.data.filter(dt => Number(dt.salePrice) >= Number(dt.price)) || [],
            productProms: products && products.data && products.data.filter(dt => Number(dt.salePrice) < Number(dt.price)) || []
        }
    }
)


Array.find