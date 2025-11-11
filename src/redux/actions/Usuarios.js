import {
  CLEAR_USUARIO_A_EDITAR,
  GET_ROLES,
  GET_USUARIOS, 
  GET_USUARIO_BY_ID,
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from './config'; 
import { getSectores } from './Sectores'; 

export const getUsuarios = () => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/user');
      dispatch({ type: GET_USUARIOS, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const initUsuariosTable = () => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data: usuarios } = await axios.get('/user');
      dispatch({ type: GET_USUARIOS, payload: usuarios }); 
     
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const initUsuariosForm = ({ id }) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      if (id !== 'add') {
        const { data: usuario } = await axios.get(`/user/${id}`);
        dispatch({ type: GET_USUARIO_BY_ID, payload: usuario });
      }
 
      const { data: roles } = await axios.get('/roles');
      dispatch({ type: GET_ROLES, payload: roles });
  
      dispatch(getSectores());
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const postUsuario = (user, cbFn) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.post('/user', user);
      dispatch(fetchSuccess());
      if (cbFn) cbFn();
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const clearUsuarioAEditar = () => ({
  type: CLEAR_USUARIO_A_EDITAR,
});

export const updateUsuario = (id, user, cbFn) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.put(`/user/${id}`, user, cbFn);
      dispatch(fetchSuccess());
      if (cbFn) cbFn();
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const deleteUser = (id, cbFn) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.delete(`/user/${id}`);
      dispatch(fetchSuccess());
      if (cbFn) cbFn();
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

 
export const changePassword = (data) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.post('/change', data);
      dispatch(fetchSuccess('Contraseña actualizada'));
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error Reset Password';
      dispatch(fetchError(errMsg));
    }
  };
}
