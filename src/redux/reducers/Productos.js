import {
  ADD_PRODUCTS,
  DELETE_PRODUCTS,
  EDIT_PRODUCTS,
  GET_PRODUCTOS,
  GET_PRODUCTS_FOR_SALE,
  GET_PRODUCT_ID,
  UPDATE_UM,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listaProductosVenta: [],
  listaProductos: [],
  producto: null,
};

export default (state = INIT_STATE, action) => {
  
  switch (action.type) {
    case GET_PRODUCTS_FOR_SALE:
      //console.log("ACA", { ...state, listaProductosVenta: action.payload })
      return { ...state, listaProductosVenta: action.payload };
    case GET_PRODUCTOS:
      //console.log("ACA only oroi", action.payload)
      return { ...state, listaProductos: action.payload };
    case GET_PRODUCT_ID:
      return { ...state, producto: action.payload };
    case ADD_PRODUCTS:
      return { ...state, listaProductos: [...state.listaProductos, action.payload] };
    case EDIT_PRODUCTS:
      return {
        ...state,
        listaProductos: state.listaProductos.map(producto =>
          producto.id === action.payload.id ? action.payload : producto
        ),
      };
    case UPDATE_UM:
        return {
          ...state
        };
    case DELETE_PRODUCTS:
      return { ...state, listaProductos: state.listaProductos.filter(producto => producto.id !== action.payload) };
    default:
      return state;
  }
};
