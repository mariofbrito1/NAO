import { GET_SECTORES } from './../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listaSectores: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SECTORES:
      return { ...state, listaSectores: action.payload };

    default:
      return state;
  }
};
