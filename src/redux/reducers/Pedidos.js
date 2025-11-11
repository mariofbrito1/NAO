import {
  ADD_PEDIDO,
  GET_PEDIDOS, 
  UPDATE_PEDIDOS,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  pedidos: [], 
};

export default (state = INIT_STATE, action) => { 
   
  switch (action.type) { 
    case GET_PEDIDOS: 
      return { ...state, pedidos: action.payload };
    case ADD_PEDIDO: 
      return { ...state, pedidos: [...state.pedidos, action.payload] };
    case UPDATE_PEDIDOS:
      //console.log("action.payload UPDATE Pedidos",action.payload);   
      return {
        ...state,
        pedidos: state.pedidos.map(pedido =>
          pedido.id === action.payload.id ? action.payload : pedido
        ),
      };
    default:
      return state;
  }
};
