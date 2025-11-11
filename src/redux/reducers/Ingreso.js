import {
  GET_MATERIAL,
  GET_TIPO_MATERIAL,  
  GET_LINEAS,
  GET_TIPO_ABERTURA,
  GET_COLORES, 
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  materiales: [],  
  tipos_material: [], 
  lineas: [], 
  tipos_aberturas: [], 
  colores: [], 
};

export default (state = INIT_STATE, action) => {
  
  switch (action.type) {
    case GET_MATERIAL: 
      return { ...state, materiales: action.payload };
    case GET_TIPO_MATERIAL: 
      return { ...state, tipos_material: action.payload };
    case GET_LINEAS: 
      return { ...state, lineas: action.payload };
    case GET_TIPO_ABERTURA: 
      return { ...state, tipos_aberturas: action.payload };
    case GET_COLORES: 
      return { ...state, colores: action.payload };
    
    default:
      return state;
  }
};
