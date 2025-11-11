import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  FETCH_WARNING,
} from '../../@jumbo/constants/ActionTypes';

export const fetchSuccess = message => {
  return dispatch => {
    dispatch({
      type: FETCH_SUCCESS,
      payload: message || '',
    });
  };
};
export const fetchError = error => {
  return dispatch => {
    dispatch({
      type: FETCH_ERROR,
      payload: error,
    });
  };
};

export const fetchStart = () => {
  return dispatch => {
    dispatch({
      type: FETCH_START,
    });
  };
};

export const fetchWarning = warning => {
  return dispatch => {
    dispatch({
      type: FETCH_WARNING,
      payload: warning,
    });
  };
};

export const hideMessage = () => {
  return dispatch => {
    dispatch({
      type: HIDE_MESSAGE,
    });
  };
};
