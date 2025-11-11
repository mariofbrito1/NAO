import {
  ADD_SECCIONES,
  DELETE_SECCION,
  EDIT_SECCIONES,
  GET_SECCIONES,
  GET_SECCIONES_BY_ID,
} from './../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listaSecciones: [],
  seccionAEditar: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SECCIONES:
      return { ...state, listaSecciones: action.payload };
    case ADD_SECCIONES:
      return { ...state, listaSecciones: [...state.listaSecciones, action.payload] };
    case GET_SECCIONES_BY_ID:
      return { ...state, seccionAEditar: action.payload };
    case EDIT_SECCIONES:
      return {
        ...state,
        listaSecciones: state.listaSecciones.map(seccion =>
          seccion.id === action.payload.id ? action.payload : seccion
        ),
      };
    case DELETE_SECCION:
      return {
        ...state,
        listaSecciones: state.listaSecciones.filter(seccion => action.payload !== seccion.id),
      };
    default:
      return state;
  }
};
