import {
  SEND_FORGET_PASSWORD_EMAIL,
  SET_RESET_PASSWORD_EMAIL,
  SET_RESET_PASSWORD_EMAIL_SUCCESS,
  UPDATE_AUTH_USER,
  UPDATE_LOAD_USER,
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  authUser: null,
  loadUser: false,
  sendForgetPasswordEmail: false,
  resetPasswordEmail: '',
  resetPasswordEmailSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        authUser: action.payload,
        loadUser: true,
      };
    }
    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadUser: action.payload,
      };
    }
    case SEND_FORGET_PASSWORD_EMAIL: {
      return {
        ...state,
        sendForgetPasswordEmail: action.payload,
      };
    }
    case SET_RESET_PASSWORD_EMAIL: {
      return {
        ...state,
        resetPasswordEmail: action.payload,
      };
    }
    case SET_RESET_PASSWORD_EMAIL_SUCCESS: {
      return {
        ...state,
        resetPasswordEmailSuccess: action.payload,
      };
    }
    default:
      return state;
  }
};
