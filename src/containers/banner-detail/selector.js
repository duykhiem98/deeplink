/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { createSelector } from 'reselect';

const productDetailSelector = state => state.product.productDetail;
const variantSelectedSelector = state => state.product.variantSelected;
const propsSelector = (state, props) => props;

export const getAttributesSelector = createSelector(
    productDetailSelector,
    (productDetail) => {
        let productVariants = productDetail.data.productVariants;
        let attributes = [];
        if (productVariants && productVariants.length > 0) {
            let options = [];
            productVariants.map(e => {
                options.push(...e.options);
            });
            options.map(e => {
                let findAtt = attributes.find(att => att.code === e.code);
                if (findAtt) {
                    if (!findAtt.values.find(v => v.value === e.value)) {
                        findAtt.values = [...findAtt.values, { value: e.value }];
                    }
                } else {
                    attributes.push({
                        code: e.code,
                        name: e.name,
                        values: [{ value: e.value }]
                    });
                }
            });
        }
        return attributes;
    }
)

export const getProductVariantsSelector = createSelector(
    productDetailSelector,
    getAttributesSelector,
    variantSelectedSelector,
    (productDetail, attributes, variantSelected) => {
        console.log(`attributes:`, attributes);
        console.log(`variantSelected:`, variantSelected);
        let result = {};
        if (productDetail && attributes && attributes.length > 0 && variantSelected) {
            let productVariants = productDetail.data.productVariants && productDetail.data.productVariants.filter(e => {
                let options = e.options.map(o => {
                    return {
                        code: o.code,
                        value: o.value
                    }
                });
                // console.log(`options:`, options);
                for (let opt of options) {
                    if (compareArrays([opt], variantSelected)) return true;
                }
                return compareArrays(options, variantSelected)
            });
            console.log(`productVariants:`, productVariants);

            let atts = [...attributes];
            for (let att of atts) {
                att.values = att.values.map(e => {
                    return { ...e, selected: undefined };
                });
            }
            if (variantSelected.length > 0) {
                for (let variant of variantSelected) {
                    let findAtt = atts.find(e => e.code === variant.code);
                    if (findAtt) {
                        findAtt.values = findAtt.values.map(e => {
                            if (e.value === variant.value) {
                                return { ...e, selected: true };
                            }
                            return { ...e, selected: false };
                        });
                    }
                }
            }

            console.log(`atts:`, atts);

            result.productAvailables = productVariants;
            result.attributes = atts;
            result.validVariant = atts.length === variantSelected.length;
        }
        return result;
    }
)

function compareArrays(array1, array2) {
    if (array1.length === array2.length)
        return JSON.stringify(array1.sort(compare)) === JSON.stringify(array2.sort(compare));
    else
        return false;
}

function compare(a, b) {
    if (a.code < b.code) {
        return -1;
    }
    if (a.code > b.code) {
        return 1;
    }
    return 0;
}