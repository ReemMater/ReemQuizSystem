import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';

import setAuthToken from '../../utilts/setAuthToken';

import {
  REGESTER_SUCCESS,
  REGESTER_FAIL,
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGIN_SUCSESS,
  LOGOUT,
  UPDATE_USER,
  UPDATE_FAIL,
  USERS_LOADED,
} from '../Types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    users: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //dispatch({ type: UPDATE_QUESTION, payload: question });

  //Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
  //Load Users
  const loadUsers = async () => {
    try {
      const res = await axios.get('/api/users/users');
      dispatch({
        type: USERS_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  //Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGESTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGESTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCSESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        ///shaly el data
        payload: err.response.data.msg,
      });
    }
  };

  //LogOut
  const logout = () =>
    dispatch({
      type: LOGOUT,
    });

  //Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  //Update user
  const updateUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/users/${formData.id}`,
        formData,
        config
      );
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: UPDATE_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        users: state.users,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
        updateUser,
        loadUsers,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
