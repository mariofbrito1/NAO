import {
  ADD_PRODUCTS,
  EDIT_PRODUCTS,
  GET_PRODUCTOS, 
  GET_PRODUCT_ID, 
  DELETE_PRODUCTS, 
} from '@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess, fetchWarning } from './Common';
import axios from './config';

export const getProductos = data1 => {
  return async dispatch => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.post('/productos',data1);
      
      dispatch(fetchSuccess());
      dispatch({ type: GET_PRODUCTOS, payload: data });
     
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
}; 

export const getProductById = id => {
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
      .get(`producto/${id}`, config)
      .then(res => {
        if (res.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_PRODUCT_ID, payload: res.data });
        } else {
          dispatch(fetchError('Error de respuesta del Servidor.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del Servidor:', error.message));
      });
  };
};

export const addProduct = (product, callbackFun) => {
  return async dispatch => {
    const formData = new FormData();
    let hasData = false;
    let hasMessage = false;

    
    try {
      dispatch(fetchStart());
      formData.append('descripcion', product.descripcion);
      formData.append('imagen', product.imagen);
      formData.append('precio', product.precio);
      formData.append('stock', product.stock); 
      formData.append('idproveedor', product.idProveedor?product.idProveedor:1);
      
      const config = {
        headers: {
          contentType: 'multipart/form-data',
        },
        //https://github.com/axios/axios/issues/4406#issuecomment-1073066354
        transformRequest: formData => formData,
      };
      const { data } = await axios.post('/producto', formData, config);
      if (data.productoCreado) {
        dispatch({ type: ADD_PRODUCTS, payload: data.productoCreado });
        hasData = true;
      }
      data?.message && (hasMessage = true);
      hasData && dispatch(fetchSuccess('El producto fue creado con éxito!'));
      hasMessage && dispatch(fetchWarning(data.message));
    } catch (error) {
      const errMsg = error.response || 'Server Error';
      dispatch(fetchError(errMsg));
    } finally {
      setTimeout(() => {
        if (callbackFun && hasData) callbackFun();
      }, 1500);
    }
  };
};

 

export const updateProduct = (product, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = window.localStorage.getItem('token');
    const { id, descripcion, imagen, precio, idproveedor, stock } = product;
  

    const formData = new FormData();
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagen);
    formData.append('precio', precio);
    formData.append('idproveedor', idproveedor);
    formData.append('stock', stock);  

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: formData => formData,
    };

    console.log("formData",formData);
    console.log(`/producto/${id}`);
    axios
      .put(`/producto/${id}`, formData, config)
      .then(({ data }) => {
        const { success, productoActualizado } = data;
        dispatch(fetchSuccess(success));
        dispatch({ type: EDIT_PRODUCTS, payload: productoActualizado });
        if (callbackFun) callbackFun(data);
      })
      .catch(error => {
        const errMsg = error.response || 'Server Error';
        dispatch(fetchError(errMsg));
      });
  };
};

export const deleteProduct = (id, callbackFun) => {

  console.log("delete api id", id , callbackFun);
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete(`producto/${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('El producto fue elimninado.'));
          dispatch({ type: DELETE_PRODUCTS, payload: id });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        const errMsg = error.response?.data?.error || 'Server Error';
        dispatch(fetchError(errMsg));
      });
  };
};

 
 