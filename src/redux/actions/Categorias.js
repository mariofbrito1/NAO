import {
  ADD_CATEGORIA,
  DELETE_CATEGORIA,
  EDIT_CATEGORIA,
  GET_CATEGORIAS,
  GET_CATEGORIA_BY_ID,
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from './config';

export const getCategorias = () => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get('/categorias');
      dispatch({ type: GET_CATEGORIAS, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const getCategoriaById = id => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get(`/categoria/${id}`);
      dispatch({ type: GET_CATEGORIA_BY_ID, payload: data });
      dispatch(fetchSuccess());
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const addCategoria = (categoria, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.post('/categoria', { ...categoria });
      dispatch({ type: ADD_CATEGORIA, payload: data });
      dispatch(fetchSuccess(data.success));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const editCategoria = (data, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      await axios.put(`/categoria/edit/${data.id}`, data);
      dispatch({ type: EDIT_CATEGORIA, payload: data });
      dispatch(fetchSuccess('Categoria editada correctamente'));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};

export const deleteCategoria = (id, callback) => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.delete(`/categoria/delete/${id}`);
      dispatch({ type: DELETE_CATEGORIA, payload: id });
      dispatch(fetchSuccess(data.success));
      if (callback) callback();
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
};
