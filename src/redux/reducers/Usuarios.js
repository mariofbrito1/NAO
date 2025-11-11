import {
  CLEAR_USUARIO_A_EDITAR,
  GET_USUARIOS,
  GET_USUARIO_BY_ID
} from "@jumbo/constants/ActionTypes";
import {ContactSupportOutlined} from "@material-ui/icons";

const INIT_STATE = {
  listaUsuarios: [],
  usuarioAEditar: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USUARIOS:
      //console.log("users: ", action.payload)
      return {...state, listaUsuarios: action.payload};

    case GET_USUARIO_BY_ID:
      return {...state, usuarioAEditar: action.payload};

    case CLEAR_USUARIO_A_EDITAR:
      return {...state, usuarioAEditar: null};

    default:
      return state;
  }
};
