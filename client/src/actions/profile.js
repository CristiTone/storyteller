import * as profileClient from '../apiClients/profileClient';
import {
  GET_LIBRARY,
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';
import { setAlert } from './alert';

// Get Profile Library
export const getLibrary = () => async (dispatch) => {
  try {
    const res = await profileClient.getLibrary();

    dispatch({
      type: GET_LIBRARY,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.response.status },
    });
  }
};

// Get Profile
export const getProfile = () => async (dispatch) => {
  try {
    const res = await profileClient.getProfile();

    dispatch({
      type: GET_PROFILE,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.response.status },
    });
  }
};

// Delete Profile
export const deleteProfile = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await profileClient.deleteProfile();

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Account deleted', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.statusText, status: err.response.status },
      });
    }
  }
};
