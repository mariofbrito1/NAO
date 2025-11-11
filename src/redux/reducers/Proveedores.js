import {
  GET_PROVIDERS ,
  GET_PROVIDER_ID,
  ADD_PROVIDER,
  UPDATE_PROVIDER,
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = { 
  providers: [], 
  provider: null
};

export default (state = INIT_STATE, action) => {
  
  switch (action.type) {
    
    case GET_PROVIDERS: 
     console.log("providers GETTT");
      return { ...state, providers: action.payload }; 
    case GET_PROVIDER_ID:
      return { ...state, provider: action.payload };
    case ADD_PROVIDER:
      return { ...state, providers: [...state.providers, action.payload] };
    case UPDATE_PROVIDER:
      return {
        ...state,
        providers: state.providers.map(provider =>
          provider.id === action.payload.id ? action.payload : provider
        ),
      };
    
    default:
      return state;
  }
};





