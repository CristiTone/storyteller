import { SET_ALERT } from './types';

export const setAlert = (msg, alertType) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType },
  });
};
