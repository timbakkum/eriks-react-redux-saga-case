import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function contentReducer(state = initialState.content, action) {
  switch (action.type) {
    default:
      return state;
  }
}
