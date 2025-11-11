import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  FETCH_WARNING,
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  initialURL: '/',
  error: '',
  warning: '',
  message: '',
  loading: false,
  showMessage: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return { ...state, error: '', message: '', loading: true, showMessage: false };
    }
    case FETCH_SUCCESS: {
      return { ...state, error: '', loading: false, message: action.payload, showMessage: true };
    }
    case FETCH_ERROR: {
      return { ...state, loading: false, message: '', error: action.payload, showMessage: true };
    }
    case HIDE_MESSAGE: {
      return { ...state, error: '', message: '', warning:'', showMessage: false };
    }
    case FETCH_WARNING: {
      return { ...state, loading: false, message: '', warning: action.payload, showMessage: true };
    }
    default:
      return state;
  }
};
