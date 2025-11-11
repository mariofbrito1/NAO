import { ADD_ROL, EDIT_ROL, GET_ROLES, GET_ROLES_BY_ID } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listaRoles: [],
  rolAEditar: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROLES:
      return { ...state, listaRoles: action.payload };
    case GET_ROLES_BY_ID:
      return { ...state, rolAEditar: action.payload };
    case ADD_ROL:
      return { ...state, listaRoles: [...state.listaRoles, action.payload] };
    case EDIT_ROL:
      return {
        ...state,
        rolAEditar: state.listaRoles.map(rol => (rol.id === action.payload.id ? action.payload : rol)),
      };
    default:
      return state;
  }
};
