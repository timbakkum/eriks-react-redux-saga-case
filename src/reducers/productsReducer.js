import initialState from './initialState';
import * as TYPES from './../actions/actionTypes';
import {
  updateObject,
  mapArrayIntoObject,
  createIdKey,
  createSortedProductsArray,
  sortByNumber
} from './../utilities/utilities';
import union from 'lodash/union';

export default function productsReducer(state = initialState.products, action) {
  switch (action.type) {
    case TYPES.FETCH_PRODUCTS_SUCCESS:
      const newProductsById = action.data.map(product => createIdKey(product));
      const newProductsAllIds = createSortedProductsArray(newProductsById);

      return {
        ...state,
        byId: updateObject(state.byId, mapArrayIntoObject(newProductsById)),
        allIds: union([...state.allIds], newProductsAllIds).sort(sortByNumber)
      };
    case TYPES.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.data.id]: updateObject(state.byId[action.data.id], {
            name: action.data.name,
            id: action.data.id,
            details: action.data
          })
        },
        allIds: union([...state.allIds], [action.data.id]).sort(sortByNumber)
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

    case TYPES.START_FETCH_PRODUCT:
      return {
        ...state,
        detailLoading: true
      };
    case TYPES.END_FETCH_PRODUCT:
      return {
        ...state,
        detailLoading: false
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
