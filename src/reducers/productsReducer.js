import initialState from './initialState';
import * as TYPES from './../actions/actionTypes';
import {
  updateObject,
  mapArrayIntoObject,
  createIdKey
} from './../utilities/utilities';
import union from 'lodash/union';

export default function productsReducer(state = initialState.products, action) {
  switch (action.type) {
    case TYPES.FETCH_PRODUCTS_SUCCESS:
      const newProductsData = action.data.map(product => createIdKey(product));
      console.log(action.data, newProductsData);
      return {
        ...state,
        data: updateObject(state.data, mapArrayIntoObject(newProductsData))
      };
    case TYPES.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        data: union([...state.data], [action.data])
      };
    case TYPES.START_FETCH_PRODUCTS:
      return {
        ...state,
        overviewLoading: true
      };
    case TYPES.END_FETCH_PRODUCTS:
      return {
        ...state,
        overviewLoading: false
      };
    case TYPES.SET_DETAIL_STARTING_STYLES:
      return {
        ...state,
        detailStartingStyles: action.payload
      };
    case TYPES.RESET_DETAIL_STARTING_STYLES:
      return {
        ...state,
        detailStartingStyles: { x: 10, y: 50 }
      };
    default:
      return state;
  }
}
