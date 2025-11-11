import {
  ADD_PEDIDO,
  GET_PEDIDOS, 
  UPDATE_PEDIDOS, 
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from './config';

axios.interceptors.request.use(
  config => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    };
    return config;
  },
  error => {
    
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  res => {
    return res;
  },
   
  error => { 
    const oldConf = error.config;
    if (oldConf.url !== '/authenticate/getToken' && error.response) { 
      if (error.response.status === 401 && !oldConf._retry && error.response.statusText === 'Unauthorized') {
        oldConf._retry = true; 
        return oldConf;
      }
    }
    return Promise.reject(error);
  }
);


export const getOrders = () => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data: pedidos } = await axios.get(`/pedidos`);
 
      dispatch({ type: GET_PEDIDOS, payload: pedidos });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const addOrder = (order, callbackFun) => {  
  return async dispatch => { 
    try {
      dispatch(fetchStart());  
      axios
        .post("/pedido", order)
        .then(data => {
        if (data) {
          dispatch(fetchSuccess());
          console.log("ped", data.data)
          dispatch({type: ADD_PEDIDO, payload: data.data}); 
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


export const updatePedidos = (id, order, cbFn) => { 
   
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const res = await axios.put(`/pedido/${id}`, order, cbFn);
      dispatch({ type: UPDATE_PEDIDOS, payload: res });
      dispatch(fetchSuccess());
      if (cbFn) cbFn();
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

 
