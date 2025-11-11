import { 
  GET_MATERIAL,
  GET_TIPO_MATERIAL,  
  GET_LINEAS,
  GET_TIPO_ABERTURA,
  GET_COLORES, 
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess, fetchWarning } from './Common';
import axios from './config';

/*
router.get('/material', getMateriales );
router.get('/tipo_material', getTipoMateriales );
router.get('/tipo_material/:id', getTipoMaterialById );
router.get('/lineas', getLineas );
router.get('/linea/:id', getLineaById );
router.get('/tipo_abertura', getTipoAbertura );
router.get('/tipo_abertura/:id', getTipoAberturaById );
router.get('/colores', getColores );
router.get('/color/:id', getColorById );
*/

export const getMaterial = () => { 
   
  return async dispatch => {
    try {
      dispatch(fetchStart()); 
      const { data } = await axios.get('/materiales'); 
      dispatch(fetchSuccess());
      dispatch({ type: GET_MATERIAL, payload: data });
     
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
  
}; 

export const getTipoMaterial = () => { 
   
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/tipo_material');
      
      dispatch(fetchSuccess());
      dispatch({ type: GET_TIPO_MATERIAL, payload: data });
     
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
  
}; 

export const getLineas = () => { 
   
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/lineas');
      
      dispatch(fetchSuccess());
      dispatch({ type: GET_LINEAS, payload: data });
     
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
  
}; 

export const getTipoAberturas = () => { 
   
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/tipo_abertura');
      
      dispatch(fetchSuccess());
      dispatch({ type: GET_TIPO_ABERTURA, payload: data });
     
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
  
}; 

export const getColores = () => { 
   
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/colores');
      
      dispatch(fetchSuccess());
      dispatch({ type: GET_COLORES, payload: data });
     
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
  
}; 

  

 
 