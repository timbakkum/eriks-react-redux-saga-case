import * as TYPES from './actionTypes';

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

export const resetDetailStartingStyles = () => ({
  type: TYPES.RESET_DETAIL_STARTING_STYLES
});
