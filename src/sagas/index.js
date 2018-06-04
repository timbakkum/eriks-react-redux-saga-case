import { takeLatest, all } from 'redux-saga/effects';

import * as TYPES from './../actions/actionTypes';
import { fetchProducts, fetchProduct } from './../actions/productActions';

function* mySaga() {
  yield all([
    takeLatest(TYPES.FETCH_PRODUCTS, fetchProducts),
    takeLatest(TYPES.FETCH_PRODUCT, fetchProduct)
  ]);
}

export default mySaga;
