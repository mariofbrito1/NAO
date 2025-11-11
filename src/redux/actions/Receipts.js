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
import { fetchError, fetchStart, fetchSuccess, fetchWarning } from './Common';
import axios from './config';

export const getReceipts = data1 => { 
 
  return async dispatch => {
    try {
       
      dispatch(fetchStart());
      const { data } = await axios.get('/pedido_recibos'); 
      dispatch(fetchSuccess());
      dispatch({ type: GET_RECEIPTS, payload: data });
     
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
}; 

export const getReceiptById = id => {
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
      .get(`pedido_recibo/${id}`, config)
      .then(res => {
        if (res.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_RECEIPT_ID, payload: res.data });
        } else {
          dispatch(fetchError('Error de respuesta del Servidor.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del Servidor:', error.message));
      });
  };
};

export const addReceipt = (receipt, callbackFun) => {  
  return async dispatch => { 
    try {
      dispatch(fetchStart());  
      console.log("receipt", receipt);
      axios
        .post("/pedido_recibo", receipt)
        .then(data => {
        if (data) {
          dispatch(fetchSuccess("Recibo Creado!"));
          dispatch({type: ADD_RECEIPT, payload: data.data}); 
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

 

export const updateReceipt = (receipt, callbackFun) => { 
   console.log("rec update",receipt, receipt.idrecibo);
   const id = receipt.idrecibo; 
   return async dispatch => {
      try {
        dispatch(fetchStart());
        await axios.put(`/pedido_recibo/${id}`, receipt);
        dispatch({ type: UPDATE_RECEIPT, payload: receipt });
        dispatch(fetchSuccess('Recibo actualizado correctamente'));
        if (callbackFun) callbackFun();
      } catch (error) {
        const errMsg = error.response || 'Server Error';
        dispatch(fetchError(errMsg));
      }
    };

}

export const deleteReceipt = (id, callbackFun) => {
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
      .delete(`/pedido_recibo/${id}`, config)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess("Deleted successfully."));
          dispatch({type: DEL_RECEIPT, payload: id});
          if (callbackFun) callbackFun();
        } else {
          dispatch(
            fetchError("There was something issue in responding server.")
          );
        }
      })
      .catch(error => {
        dispatch(fetchError("Server Error", error));
      });
  };
};
  

/*
*
* NOTAS
* 
*/

export const getNotas = () => { 
 
  return async dispatch => {
    try {
       
      dispatch(fetchStart());
      const { data } = await axios.get('/pedido_notas'); 
      dispatch(fetchSuccess());
      dispatch({ type: GET_NOTAS, payload: data });
     
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
}; 

export const getNotaById = id => {
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
      .get(`pedido_nota/${id}`, config)
      .then(res => {
        if (res.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_NOTA_ID, payload: res.data });
        } else {
          dispatch(fetchError('Error de respuesta del Servidor.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del Servidor:', error.message));
      });
  };
};

export const addNota = (nota, callbackFun) => {  
  return async dispatch => { 
    try {
      dispatch(fetchStart());  
      axios
        .post("/nota", nota)
        .then(data => {
        if (data) {
          dispatch(fetchSuccess("Nota Creada!"));
          dispatch({type: ADD_NOTA, payload: data.data}); 
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

 

export const updateNota = (nota, callbackFun) => { 
   
   return async dispatch => {
      try {
        dispatch(fetchStart());
        await axios.put(`/nota/${nota.id}`, nota);
        dispatch({ type: UPDATE_NOTA, payload: nota });
        dispatch(fetchSuccess('Nota actualizada'));
        if (callbackFun) callbackFun();
      } catch (error) {
        const errMsg = error.response || 'Server Error';
        dispatch(fetchError(errMsg));
      }
    };

}

export const deleteNota = (id, callbackFun) => {
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
      .delete(`/nota/${id}`, config)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess("Deleted successfully."));
          dispatch({type: DEL_NOTA, payload: id});
          if (callbackFun) callbackFun();
        } else {
          dispatch(
            fetchError("There was something issue in responding server.")
          );
        }
      })
      .catch(error => {
        dispatch(fetchError("Server Error", error));
      });
  };
};

 
 