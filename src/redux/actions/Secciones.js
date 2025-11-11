import {
  ADD_SECCIONES,
  DELETE_SECCION,
  EDIT_SECCIONES,
  GET_SECCIONES,
  GET_SECCIONES_BY_ID,
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from './config';

export const getSecciones = () => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/seccion');
      dispatch({ type: GET_SECCIONES, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const getSeccionById = id => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get(`/seccion/${id}`);
      dispatch({ type: GET_SECCIONES_BY_ID, payload: data });
      dispatch(fetchSuccess());
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const createSeccion = (seccion, callback) => {
  const data = {
    nombre: seccion.nombre,
    ruta: seccion.ruta,
  };
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.post('/seccion', data);
      dispatch({ type: ADD_SECCIONES, payload: data });
      dispatch(fetchSuccess('Sección creada exitosamente'));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const updateSeccion = (seccion, callback) => {
  const data = {
    nombre: seccion.nombre,
    ruta: seccion.ruta,
  };
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.put(`/seccion/${seccion.id}`, data);
      dispatch({ type: EDIT_SECCIONES, payload: { ...data, id: seccion.id } });
      dispatch(fetchSuccess('Sección actualizada exitosamente'));
      if (callback) callback();
    } catch (error) {
      const errMsg = error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const deleteSeccion = (id, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.delete(`/seccion/${id}`);
      dispatch({ type: DELETE_SECCION, payload: id });
      dispatch(fetchSuccess('Sección eliminada exitosamente'));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};
