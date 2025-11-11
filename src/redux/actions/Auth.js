import {
  SEND_FORGET_PASSWORD_EMAIL,
  SEND_CHANGE_PASSWORD_EMAIL,
  UPDATE_AUTH_USER,
  UPDATE_LOAD_USER,
  REFRESH_TOKEN,
  SET_RESET_PASSWORD_EMAIL,
  SET_RESET_PASSWORD_EMAIL_SUCCESS,
} from '../../@jumbo/constants/ActionTypes';

export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};

export const updateLoadUser = loading => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading,
    });
  };
};

export const setForgetPassMailSent = status => {
  return dispatch => {
    dispatch({
      type: SEND_FORGET_PASSWORD_EMAIL,
      payload: status,
    });
  };
};

export const setResetPasswordEmail = email => {
  return dispatch => {
    dispatch({
      type: SET_RESET_PASSWORD_EMAIL,
      payload: email,
    });
  };
};

export const setResetPasswordEmailSuccess = payload => {
  return dispatch => {
    dispatch({
      type: SET_RESET_PASSWORD_EMAIL_SUCCESS,
      payload,
    });
  };
};

export const setChangePassMailSent = status => {
  return dispatch => {
    dispatch({
      type: SEND_CHANGE_PASSWORD_EMAIL,
      payload: status,
    });
  };
};

export const onRefreshToken = status => {
  return dispatch => {
    dispatch({
      type: REFRESH_TOKEN,
      payload: status,
    });
  };
};
