import { takeLatest } from 'redux-saga/effects';

import * as TYPES from './../actions/actionTypes';
import { fetchProducts } from './../actions/productActions';

function* mySaga() {
  yield takeLatest(TYPES.FETCH_PRODUCTS, fetchProducts);
}

export default mySaga;
