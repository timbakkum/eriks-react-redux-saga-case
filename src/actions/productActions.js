import { call, put } from 'redux-saga/effects';

import * as TYPES from './actionTypes';

export const api = url => fetch(url).then(response => response.json());

export const fetchProductsRequest = () => ({
  type: TYPES.FETCH_PRODUCTS
});

export const fetchProductRequest = id => ({
  type: TYPES.FETCH_PRODUCT,
  payload: id
});

export function* fetchProducts(action) {
  try {
    const products = yield call(api, 'http://api.icndb.com/jokes/random/10');
    yield put({ type: TYPES.FETCH_PRODUCTS_SUCCESS, data: products.value });
  } catch (e) {
    console.log(e);
  }
}

export function* fetchProduct(action) {
  try {
    const product = yield call(
      api,
      `http://api.icndb.com/jokes/${action.payload}`
    );
    yield put({ type: TYPES.FETCH_PRODUCT_SUCCESS, data: product.value });
  } catch (e) {
    console.log(e);
  }
}
