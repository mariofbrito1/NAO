import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from './config';
import {
  ADD_CLIENT,
  GET_CLIENTS,
  EDIT_CLIENT,
  DELETE_CLIENT,
  GET_LOCATIONS,
  GET_CITY,
  GET_STATUS,
} from '../../@jumbo/constants/ActionTypes';

export const getClients = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log('init get Clients');
    const token = window.localStorage.getItem('token');
    //console.log("tk", token);
    axios
      .get('coreServices/v1/clients', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(data => {
        //console.log('data->',data.data);
        if (data.data.code === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CLIENTS, payload: data.data.data });
          if (callbackFun) callbackFun(data.data.data);
        } else {
          dispatch(fetchError('Error de respuesta del server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del server', error));
      });
  };
};

export const getClientById = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log('getClientById', id);
    const token = window.localStorage.getItem('token');
    //console.log("tk", token);
    axios
      .get(`coreServices/v1/clients/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(data => {
        //console.log('data->',data.data);
        if (data.data.code === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CLIENTS, payload: data.data.data });
          if (callbackFun) callbackFun(data.data.data);
        } else {
          dispatch(fetchError('Error de respuesta del server.'));
        }
      })
      .catch(error => {
        //console.log('error->',error);
        dispatch(fetchError('Error de respuesta del server', error));
      });
  };
};

export const getStatesClients = callbackFun => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log('init getStatesClient');
    const token = window.localStorage.getItem('token');
    axios
      .get('coreServices/v1/user-statuses/?filter[admin_user]=false', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(data => {
        //console.log('data cliecs->',data.data);
        if (data.data.code === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CLIENTS, payload: data.data.data });
          if (callbackFun) callbackFun(data.data.data);
        } else {
          dispatch(fetchError('Error de respuesta del server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del server', error));
      });
  };
};

export const getEchangeLocation = callbackFun => {
  return dispatch => {
    dispatch(fetchStart());

    const token = window.localStorage.getItem('token');

    axios
      .get('coreServices/v1/exchange-locations', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(data => {
        if (data.data.code === 201) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_LOCATIONS, payload: data.data.data });
          if (callbackFun) callbackFun(data.data.data);
        } else {
          dispatch(fetchError('Error de respuesta del server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del server', error));
      });
  };
};

export const getLocalidades = (id_ciudad, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log('getLocalidades', id_ciudad);
    const token = window.localStorage.getItem('token');
    //console.log("tk", token);
    axios
      .get(`coreServices/v1/cities/${id_ciudad}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(data => {
        //console.log('data GET_CITY locat->',data.data);
        if (data.data.code === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CITY, payload: data.data.data });
          if (callbackFun) callbackFun(data.data.data);
        } else {
          dispatch(fetchError('Error de respuesta del server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del server', error));
      });
  };
};

export const getCiudad = (id_pais, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log('GET_CITY', id_pais);
    const token = window.localStorage.getItem('token');
    //console.log("tk", token);
    axios
      .get(`coreServices/v1/states/${id_pais}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(data => {
        //console.log('data getCiudad locat->',data.data);
        if (data.data.code === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CITY, payload: data.data.data });
          if (callbackFun) callbackFun(data.data.data);
        } else {
          dispatch(fetchError('Error de respuesta del server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del server', error));
      });
  };
};

export const getPais = callbackFun => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log('getPais');
    const token = window.localStorage.getItem('token');
    //console.log("tk", token);
    axios
      .get('coreServices/v1/countries', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(data => {
        //console.log('data getPais locat->',data.data);
        if (data.data.code === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CITY, payload: data.data.data });
          if (callbackFun) callbackFun(data.data.data);
        } else {
          dispatch(fetchError('Error de respuesta del server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del server', error));
      });
  };
};

export const getStatus = callbackFun => {
  return dispatch => {
    //PENDIENTE IMPLEMENTACION
    dispatch(fetchStart());
    //console.log('GET_STATUS');
    const data = [
      { id: 1, name: 'Verificado' },
      { id: 2, name: 'Pendiente' },
    ];
    dispatch(fetchSuccess());
    dispatch({ type: GET_STATUS, payload: data });
    if (callbackFun) callbackFun(data);
    //const token=window.localStorage.getItem("token");
    //console.log("tk", token);
    /*axios
      .get('NO IMPLEMENTADA AUN',{ 
          headers: {  
            "Content-Type" : 'application/json',
            "Authorization" : "Bearer "+token,
          }
      })
      .then(data => {
        console.log('data GET_STATUS locat->',data.data);
        if (data.data.code === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_STATUS, payload: data.data.data });
          if (callbackFun) callbackFun(data.data.data);
        } else {
          dispatch(fetchError('Error de respuesta del server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del server', error));
      });*/
  };
};

export const addNewClient = (client, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());

    const token = window.localStorage.getItem('token');

    var data = {
      data: {
        first_name: client.first_name,
        last_name: client.last_name,
        email: client.email,
        doc_type: client.doc_type,
        user_status_id: client.id_status,
        doc: client.doc,
        birth_date: client.birth_date + ' 11:40:00',
        address: client.address,
        city_id: client.city_id,
        tel: client.tel,
        gender: client.gender,
        client_type_id: 1,
        pep: client.pep,
        uif: client.uif,
      },
    };

    var config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };

    axios
      .post('coreServices/v1/clients', data, config)
      .then(data => {
        if (data.data.code === 201) {
          dispatch(fetchSuccess('Nuevo Cliente Creado!'));
          dispatch({ type: ADD_CLIENT, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('Error de respuesta del Servidor.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del Servidor:', error));
      });
  };
};

export const addEditClient = (client, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log('client add', client);
    const token = window.localStorage.getItem('token');
    const id = client.id;

    var data = {
      data: {
        id: id,
        first_name: client.first_name,
        last_name: client.last_name,
        email: client.email,
        doc_type: client.doc_type,
        user_status_id: client.id_status,
        doc: client.doc,
        birth_date: client.birth_date + ' 11:40:00',
        address: client.address,
        city_id: client.city_id,
        tel: client.tel,
        gender: client.gender,
        client_type_id: 1,
        pep: client.pep,
        uif: client.uif,
      },
    };

    var config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    axios
      .put(`coreServices/v1/clients/${id}`, data, config)
      .then(data => {
        if (data.data.code === 200) {
          dispatch(fetchSuccess('Configuración Guardada!'));
          dispatch({ type: EDIT_CLIENT, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('Error de respuesta del Servidor.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Error de respuesta del Servidor:', error));
      });
  };
};

export const deleteClient = (client, callbackFun) => {
  // NO IMPLEMEMTADO
  return dispatch => {
    dispatch(fetchStart());
    const token = window.localStorage.getItem('token');
    var config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: {
        name: client.name,
      },
    };
    axios
      .delete('userServices/admin/client/destroy', config)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('El perfil selecionado fue elimninado.'));
          dispatch({ type: DELETE_CLIENT, payload: '' });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

///////////////////////////////////////////////////////////////////////////////

export const updateClient = (client, callbackFun) => {
  // NO IMPLEMEMTADO
  //console.log("update client mario");
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/client', client)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected client was updated successfully.'));
          dispatch({ type: EDIT_CLIENT, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
