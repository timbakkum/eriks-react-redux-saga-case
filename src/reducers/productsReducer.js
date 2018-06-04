import initialState from './initialState';
import * as TYPES from './../actions/actionTypes';
import union from 'lodash/union';

export default function productsReducer(state = initialState.products, action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      console.log(state);
      return state;
    case TYPES.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: union([...state.data], action.data)
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
    default:
      return state;
  }
}
