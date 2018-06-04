import initialState from './initialState';
import * as TYPES from './../actions/actionTypes';
import union from 'lodash/union';

export default function productsReducer(state = initialState.products, action) {
  switch (action.type) {
    case TYPES.FETCH_PRODUCTS_SUCCESS:
      return union([...state], action.data);
    default:
      return state;
  }
}
