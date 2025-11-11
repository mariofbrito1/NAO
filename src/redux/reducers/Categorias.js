import {
  ADD_CATEGORIA,
  DELETE_CATEGORIA,
  EDIT_CATEGORIA,
  GET_CATEGORIAS,
  GET_CATEGORIA_BY_ID,
} from './../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listaCategorias: [],
  categoria: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIAS:
      return { ...state, listaCategorias: action.payload };
    case GET_CATEGORIA_BY_ID:
      return { ...state, categoria: action.payload };
    case ADD_CATEGORIA:
      return { ...state, listaCategorias: [...state.listaCategorias, action.payload] };
    case EDIT_CATEGORIA:
      return {
        ...state,
        listaCategorias: state.listaCategorias.map(categoria =>
          categoria.id === action.payload.id ? action.payload : categoria
        ),
      };
    case DELETE_CATEGORIA:
      return { ...state, listaCategorias: state.listaCategorias.filter(categoria => categoria.id !== action.payload) };
    default:
      return state;
  }
};
