import { call, put } from 'redux-saga/effects';

import * as TYPES from './actionTypes';

export const api = url => fetch(url).then(response => response.json());

export const fetchProductsRequest = () => ({
  type: TYPES.FETCH_PRODUCTS
});

export function* fetchProducts(action) {
  try {
    const products = yield call(api, 'http://api.icndb.com/jokes/random/10');
    yield put({ type: TYPES.FETCH_PRODUCTS_SUCCESS, data: products.value });
  } catch (e) {
    console.log(e);
  }
}
