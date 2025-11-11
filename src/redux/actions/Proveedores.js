import { 
  GET_PROVIDERS,
  GET_PROVIDER_ID, 
  ADD_PROVIDER, 
  UPDATE_PROVIDER,   
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess, fetchWarning } from './Common';
import axios from './config';

export const getProviders = data1 => { 
 
  return async dispatch => {
    try {
       
      dispatch(fetchStart());
      const { data } = await axios.get('/providers'); 
      dispatch(fetchSuccess());
      dispatch({ type: GET_PROVIDERS, payload: data });
     
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
}; 

export const getProviderById = id => {
  return dispatch => { 
    dispatch(fetchStart());
    const token = window.localStorage.getItem('token');
    var config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    axios
      .get(`provider/${id}`, config)
      .then(res => {
        if (res.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_PROVIDER_ID, payload: res.data });
        } else {
          dispatch(fetchError('Error de respuesta del Servidor.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del Servidor:', error.message));
      });
  };
};

export const addProvider = (provider, callbackFun) => {  
  return async dispatch => { 
    try {
      dispatch(fetchStart());  
      axios
        .post("/provider", provider)
        .then(data => {
        if (data) {
          dispatch(fetchSuccess("Proveedor Creado!"));
          dispatch({type: ADD_PROVIDER, payload: data.data}); 
          if (callbackFun) callbackFun(data.data);
                
        } else {
          dispatch(fetchError("Error de respuesta del Servidor."));
        }    
      }).catch(error => {  
        dispatch(fetchError("Error! ", error)); 
      }); 
    } catch (_error) { 
      dispatch(fetchError("Error >> ", _error.message)); 
    }; 
       
  };
}

 

export const updateProvider = (provider, callbackFun) => {

  console.log("updae ", provider)
   return async dispatch => {
      try {
        dispatch(fetchStart());
        await axios.put(`/provider/${provider.id}`, provider);
        dispatch({ type: UPDATE_PROVIDER, payload: provider });
        dispatch(fetchSuccess('Proveedor actualizado correctamente'));
        if (callbackFun) callbackFun();
      } catch (error) {
        const errMsg = error.response || 'Server Error';
        dispatch(fetchError(errMsg));
      }
    };

}
  

 
 