import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_PENDING,
} from "./code/code";

const initialState = {
  pending: false,
  error: null,
  products: [],
};
// eslint-disable-next-line
export default (state = initialState, action = {}) => {
  
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING:
      return {
        pending: true,
        error: null,
        products: [],
      };

    case FETCH_PRODUCTS_ERROR:
      return {
        pending: false,
        error: action.error,
        products: [],
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        pending: false,
        error: null,
        products: action.products,
      };

    default:
      return state;
  }
};
