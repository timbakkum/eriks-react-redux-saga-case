import { call, put } from 'redux-saga/effects';

import * as TYPES from './actionTypes';

export const api = url => fetch(url).then(response => response.json());
const delay = ms => new Promise(res => setTimeout(res, ms));

export const fetchProductsRequest = () => ({
  type: TYPES.FETCH_PRODUCTS
});

export const startProductsRequest = () => ({
  type: TYPES.START_FETCH_PRODUCTS
});

export const endProductsRequest = () => ({
  type: TYPES.END_FETCH_PRODUCTS
});

export const fetchProductRequest = id => ({
  type: TYPES.FETCH_PRODUCT,
  payload: id
});

export const setDetailStartingStyles = styles => ({
  type: TYPES.SET_DETAIL_STARTING_STYLES,
  payload: styles
});

export function* fetchProducts(action) {
  try {
    yield put({ type: TYPES.START_FETCH_PRODUCTS });
    const products = yield call(api, 'http://api.icndb.com/jokes/random/10');
    yield put({ type: TYPES.FETCH_PRODUCTS_SUCCESS, data: products.value });
    yield delay(3000);
    yield put({ type: TYPES.END_FETCH_PRODUCTS });
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
