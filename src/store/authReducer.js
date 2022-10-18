import {
  SET_CURRENT_USER,
  SET_INVALID_CREDENTIALS,
  SET_INVALID_EMAIL,
  SET_VALID_EMAIL,
  SET_VALID_PASSWORD,
  SET_INTERNAL_SERVER_ERROR,
  SET_CONNECTION_REFUSED_ERROR,
  SET_INVALID_TOKEN,
} from "./code/code";
import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  error: {},
};
// eslint-disable-next-line
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        error: {},
        loading: false,
      };

    case SET_INVALID_CREDENTIALS:
      return {
        isAuthenticated: false,
        user: {},
        error: {
          message: action.error,
          variant: "error",
        },
      };

    case SET_INVALID_EMAIL:
      return {
        isAuthenticated: false,
        user: {},
        error: {
          message: action.error,
          variant: "error",
        },
      };
    case SET_VALID_EMAIL:
      return {
        isAuthenticated: false,
        user: {},
        error: {
          message: action.error,
          variant: "success",
        },
      };
    case SET_INVALID_TOKEN:
      return {
        isAuthenticated: false,
        user: {},
        error: {
          message: action.error,
          variant: "error",
        },
      };
    case SET_VALID_PASSWORD:
      return {
        isAuthenticated: false,
        user: {},
        error: {
          message: action.error,
          variant: "success",
        },
      };
    case SET_INTERNAL_SERVER_ERROR:
      return {
        isAuthenticated: false,
        user: {},
        error: {
          message: action.error,
          variant: "warning",
        },
      };

    case SET_CONNECTION_REFUSED_ERROR:
      return {
        isAuthenticated: false,
        user: {},
        error: {
          message: action.error,
          variant: "error",
        },
      };

    default:
      return state;
  }
};
