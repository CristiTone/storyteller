import * as userClient from '../apiClients/userClient';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await userClient.getUser();

    dispatch({
      type: USER_LOADED,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (account) => async (dispatch) => {
  try {
    const res = await userClient.registerUser(account);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res,
    });
    dispatch(setAlert('Registered succesfully', 'success'));
  } catch (err) {
    const errors = err.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (account) => async (dispatch) => {
  try {
    const res = await userClient.loginUser(account);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res,
    });
    dispatch(setAlert('Logged in succesfully', 'success'));

    dispatch(loadUser());
  } catch (err) {
    const errors = err.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
