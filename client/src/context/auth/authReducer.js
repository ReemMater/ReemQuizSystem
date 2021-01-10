/* eslint-disable import/no-anonymous-default-export */
import {
  REGESTER_SUCCESS,
  REGESTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCSESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_USER,
  UPDATE_FAIL,
  USERS_LOADED,
} from '../Types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case USERS_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        users: action.payload,
      };
    case REGESTER_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_SUCSESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGESTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        error: action.payload,
        token: null,
        user: null,
      };
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        error: action.payload,
        token: null,
        user: null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        error: action.payload,
        token: null,
        user: null,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        token: null,
        user: null,
      };
    case UPDATE_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
