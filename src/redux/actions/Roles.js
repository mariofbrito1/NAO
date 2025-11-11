import { ADD_ROL, EDIT_ROL, GET_ROLES, GET_ROLES_BY_ID } from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from './config';

export const getRoles = () => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/roles');
      dispatch({ type: GET_ROLES, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const getRolesById = (id, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get(`/rol/${id}`);
      dispatch({ type: GET_ROLES_BY_ID, payload: data });
      if (callback) callback(data);
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const addNewRole = (rol, callbackFun) => {
  return async dispatch => {
    dispatch(fetchStart());
    let data = {
      nombre: rol.nombre,
    };

    await axios.post('/rol', data);
    try {
      dispatch(fetchSuccess('Nuevo Rol Creado!'));
      dispatch({ type: ADD_ROL, payload: data.nombre });
      if (callbackFun) callbackFun();
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const updateRole = (rol, callbackFun) => {
  return async dispatch => {
    dispatch(fetchStart());
    let data = {
      nombre: rol.nombre,
      id: rol.id,
    };
    try {
      dispatch(fetchStart());
      await axios.put(`/rol/${rol.id}`, data);
      dispatch({ type: EDIT_ROL, payload: data });
      dispatch(fetchSuccess());
      if (callbackFun) callbackFun();
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};
