import { takeLatest, all, call, put } from 'redux-saga/effects';
import * as TYPES from './../actions/actionTypes';

export const api = url => fetch(url).then(response => response.json());
const delay = ms => new Promise(res => setTimeout(res, ms));

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

function* mySaga() {
  yield all([
    takeLatest(TYPES.FETCH_PRODUCTS, fetchProducts),
    takeLatest(TYPES.FETCH_PRODUCT, fetchProduct)
  ]);
}

export default mySaga;
