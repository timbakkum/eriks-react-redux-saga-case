import { takeLatest, all, call, put } from 'redux-saga/effects';
import * as TYPES from './../actions/actionTypes';
import config from './../config';

export const api = url => fetch(url).then(response => response.json());
const delay = ms => new Promise(res => setTimeout(res, ms));

export function* fetchProducts(action) {
  try {
    yield put({ type: TYPES.START_FETCH_PRODUCTS });
    const products = yield call(api, `${config.productEndpoint}?limit=151`);
    yield put({ type: TYPES.FETCH_PRODUCTS_SUCCESS, data: products.results });
    yield delay(3000);
    yield put({ type: TYPES.END_FETCH_PRODUCTS });
  } catch (e) {
    console.log(e);
    // dispatch error toaster
    yield put({ type: TYPES.END_FETCH_PRODUCTS });
  }
}

export function* fetchProduct(action) {
  try {
    yield put({ type: TYPES.START_FETCH_PRODUCT });

    const product = yield call(
      api,
      `${config.productEndpoint}${action.payload}`
    );
    yield put({ type: TYPES.FETCH_PRODUCT_SUCCESS, data: product });
    yield put({ type: TYPES.END_FETCH_PRODUCT });
  } catch (e) {
    console.log(e);
    // dispatch error toaster
    yield put({ type: TYPES.END_FETCH_PRODUCT });
  }
}

function* mySaga() {
  yield all([
    takeLatest(TYPES.FETCH_PRODUCTS, fetchProducts),
    takeLatest(TYPES.FETCH_PRODUCT, fetchProduct)
  ]);
}

export default mySaga;
