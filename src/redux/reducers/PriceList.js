import {
    GET_PRECIOS,
    EDIT_PRECIO,
    GET_PRECIO_BY_MATERIAL,
    UPDATE_PRECIO_SUCCESS,
    UPDATE_PRECIO_FAILURE
  } from "@jumbo/constants/ActionTypes";
  
  const initialState = {
    precios: [],
    exitoActualizacion: false,
    errorActualizacion: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_PRECIOS:
        return {
          ...state,
          precios: action.payload,
          exitoActualizacion: false,
          errorActualizacion: null
        };
      case GET_PRECIO_BY_MATERIAL:
          return {
            ...state,
            precio: action.payload
          };
      case UPDATE_PRECIO_SUCCESS:
        return {
          ...state,
          exitoActualizacion: true,
          errorActualizacion: null
        };
      case UPDATE_PRECIO_FAILURE:
        return {
          ...state,
          exitoActualizacion: false,
          errorActualizacion: action.payload
        };
      default:
        return state;
    }
  };
  