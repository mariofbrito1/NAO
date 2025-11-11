import {
  GET_RECEIPTS,
  GET_RECEIPT_ID, 
  ADD_RECEIPT, 
  UPDATE_RECEIPT,
  DEL_RECEIPT,  
  
  GET_NOTAS,
  GET_NOTA_ID, 
  ADD_NOTA, 
  UPDATE_NOTA,
  DEL_NOTA,  
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = { 
  receipts: [], 
  receipt: null,
  notas: [], 
  nota: null
};

export default (state = INIT_STATE, action) => {
  
  switch (action.type) {
    
    case GET_RECEIPTS: 
     console.log("GET_RECEIPTS");
      return { ...state, receipts: action.payload }; 
    case GET_RECEIPT_ID:
      return { ...state, receipt: action.payload };
    case ADD_RECEIPT:
      return { ...state, receipt: [...state.receipts, action.payload] };
    case UPDATE_RECEIPT:
      return {
        ...state,
        receipts: state.receipts.map(r =>
          r.id === action.payload.id ? action.payload : r
        ),
      };
     case DEL_RECEIPT:
          return { ...state, receipts: state.receipts.filter(r => r.id !== action.payload) };
    

    case GET_NOTAS: 
     console.log("GET_NOTAS");
      return { ...state, notas: action.payload }; 
    case GET_NOTA_ID:
      return { ...state, nota: action.payload };
    case ADD_NOTA:
      return { ...state, nota: [...state.notas, action.payload] };
    case UPDATE_NOTA:
      return {
        ...state,
        notas: state.notas.map(r =>
          r.id === action.payload.id ? action.payload : r
        ),
      };
    case DEL_NOTA:
       return { ...state, notas: state.notas.filter(r => r.id !== action.payload) };
    default:
      return state;
  }
};





