import {fetchError, fetchStart, fetchSuccess} from "./Common";
import axios from "./config";

import {
  ADD_USER,
  ADD_PERMISSION,
  GET_USERS,
  GET_PROFILES,
  GET_PERMISSION,
  GET_LOCATIONS,
  EDIT_USER,
  DELETE_BULK_USERS,
  DELETE_BULK_PROFILES,
  DELETE_USER,
  ASSIGN_PERMISSION,
  SET_USER_DETAILS
} from "../../@jumbo/constants/ActionTypes";

axios.interceptors.request.use(
  config => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    };
    return config;
  },
  error => {
    //console.log("Error request Refresh Token:>", error);
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  res => {
    return res;
  },
  /*
  config => {
    //console.log("Refresh Token response->");
    var user = {
      data: {
        legajo: user.legajo,
        name: user.name,
        email: user.email,
        user_status_id: user.id_status,
        exchangeLocations: user.exchangeLocations.length > 0 ? user.exchangeLocations : '',
        roles: user.roles.length > 0 ? user.roles : '',
      },
    };
    return config;
  },*/
  error => {
    //console.log("Error Response Refresh Token>", error);
    const oldConf = error.config;

    if (oldConf.url !== "/authenticate/getToken" && error.response) {
      // Access Token was expired
      if (
        error.response.status === 401 &&
        !oldConf._retry &&
        error.response.statusText === "Unauthorized"
      ) {
        oldConf._retry = true;
        //console.log("get refresh token-->>", username, token);
        return oldConf;
      }
    }
    return Promise.reject(error);
  }
);

export const getProfiles = (
  filterOptions = [],
  searchTerm = "",
  callbackFun
) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get("/roles")
      .then(({data}) => {
        if (data) {
          dispatch(fetchSuccess());
          dispatch({type: GET_PROFILES, payload: data});
          if (callbackFun) callbackFun(data);
        } else {
          dispatch(fetchError("Error in responding server."));
        }
      })
      .catch(error => {
        dispatch(fetchError("Error de respuesta del server", error));
      });
  };
};

export const getEchangeLocations = (
  filterOptions = [],
  searchTerm = "",
  callbackFun
) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log('init EchangeLocations');
    const token = window.localStorage.getItem("token");
    axios
      .get("coreServices/v1/exchange-locations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(data => {
        //console.log('data echange->',data.data);
        if (data.data.status === "OK") {
          dispatch(fetchSuccess());
          dispatch({type: GET_LOCATIONS, payload: data.data.data});
          if (callbackFun) callbackFun(data.data.data);
        } else {
          dispatch(fetchError("Error in responding server."));
        }
      })
      .catch(error => {
        dispatch(fetchError("Error de respuesta del server", error));
      });
  };
};

export const addNewPermision = (permision, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log('permision add', permision.name);
    const token = window.localStorage.getItem("token");

    var data = {
      name: permision.name
    };
    var config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    };

    axios
      .post("userServices/admin/permission/create", data, config)
      .then(data => {
        //console.log("permission res", data.data)
        if (data.data.status === 200) {
          dispatch(fetchSuccess("New user was added successfully."));
          dispatch({type: ADD_PERMISSION, payload: data.data});
          if (callbackFun) callbackFun(data.data);
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

export const assignPermissionTo = (profilepermission, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log('assignPermissionTo ·······>', profilepermission.name, profilepermission.roleName);
    const token = window.localStorage.getItem("token");

    var data = {
      name: profilepermission.name,
      roleName: profilepermission.roleName
    };
    var config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    };

    axios
      .post("userServices/admin/role/assignPermissionTo", data, config)
      .then(data => {
        //console.log("res", data.data)
        if (data.data.code === 201) {
          dispatch(fetchSuccess("El permiso fue agregado."));
          dispatch({type: ASSIGN_PERMISSION, payload: data.data});
          if (callbackFun) callbackFun(data.data);
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

export const deleteBulkProfiles = (profile, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete(`/rol/${profile.name}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess("El perfil selecionado fue elimninado."));
          dispatch({type: DELETE_BULK_PROFILES, payload: ""});
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

export const getUsers = (filterOptions = [], searchTerm = "", callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get("/user")
      .then(data => {
        //console.log('data users->', data.data);
        if (data.data) {
          dispatch(fetchSuccess());
          dispatch({type: GET_USERS, payload: data.data});
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError("Error de respuesta del server."));
        }
      })
      .catch(error => {
        dispatch(fetchError("Error de respuesta del server", error));
      });
  };
};

export const getUsersById = (user, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = window.localStorage.getItem("token");
    var config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    };
    axios
      .get(`coreServices/v1/admin-users/${user.id}`, config)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({type: GET_USERS, payload: data.data.data});
          if (callbackFun) callbackFun(data.data.data);
        } else {
          dispatch(fetchError("Error de respuesta de usuario por id."));
        }
      })
      .catch(error => {
        dispatch(fetchError("Error de respuesta del server", error));
      });
  };
};

export const getStatesUsers = callbackFun => {
  return dispatch => {
    dispatch(fetchStart());
    const token = window.localStorage.getItem("token");
    axios
      .get("coreServices/v1/user-statuses/?filter[admin_user]=true", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(data => {
        if (data.data.code === 200) {
          dispatch(fetchSuccess());
          dispatch({type: GET_USERS, payload: data.data.data});
          if (callbackFun) callbackFun(data.data.data);
        } else {
          dispatch(fetchError("Error de respuesta del server."));
        }
      })
      .catch(error => {
        dispatch(fetchError("Error de respuesta del server", error));
      });
  };
};

export const setCurrentUser = user => {
  return dispatch => {
    dispatch({type: SET_USER_DETAILS, payload: user});
  };
};

export const addNewUser = (user, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    var data = {
      nombre: user.nombre,
      apellido: user.apellido,
      legajo: user.legajo,
      usuario: user.usuario,
      email: user.email,
      password: user.password,
      activo: user.activo
    };
    try {
      axios
        .post("/user", data)
        .then(data => {
          if (data) {
            dispatch(fetchSuccess("Usuario Creado!"));
            dispatch({type: ADD_USER, payload: data.data});
            if (callbackFun) callbackFun(data.data);
          } else {
            dispatch(fetchError("Error de respuesta del Servidor."));
          }
        })
        .catch(error => {
          dispatch(fetchError("Error! ", error));
        });
    } catch (_error) {
      dispatch(fetchError("Error >> ", _error.message));
    }
  };
};

export const sentMailToUser = () => {
  return dispatch => {
    dispatch(fetchSuccess("El Email ha sido enviado correctamente"));
  };
};

export const updateUser = (user, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const id = user.id;
    var data = {
      id: id,
      legajo: user.legajo,
      nombre: user.nombre,
      email: user.email,
      apellido: user.apellido,
      password: user.password,
      usuario: user.usuario,
      activo: user.activo
    };
    axios
      .put(`user/${id}`, data)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess("Usuario Modificado!"));
          dispatch({type: ADD_USER, payload: data.data});
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError("Error de respuesta del Servidor."));
        }
      })
      .catch(error => {
        dispatch(fetchError("Server Error", error));
      });
  };
};

export const updateUserStatus = (data, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put("/users/update-status", data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess("User status was updated successfully."));
          dispatch({type: EDIT_USER, payload: response.data});
          if (callbackFun) callbackFun(response.data);
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

export const deleteBulkUsers = (user, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = window.localStorage.getItem("token");
    var config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      data: {
        name: user.name
      }
    };
    axios
      .delete("userServices/admin/user/destroy", config)
      .then(response => {
        //console.log('respos', response);
        if (response.status === 200) {
          dispatch(fetchSuccess("El Usuario selecionado fue elimninado."));
          dispatch({type: DELETE_BULK_USERS, payload: ""});
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

//////////////////////////
export const deleteUser = (userId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete("/users", {params: {id: userId}})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess("Selected user was deleted successfully."));
          dispatch({type: DELETE_USER, payload: userId});
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

////////// OTHERS ////////

export const getRolesByUserId = (user, callbackFun) => {
  //console.log('520 ', user);
  return dispatch => {
    dispatch(fetchStart());
    //console.log('getRolesByUserId ', user);
    const id = user.id;
    axios
      .get(`/rol/${id}`)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess("Roles actualizados!"));
          dispatch({type: GET_PROFILES, payload: data.data});
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError("Error al traer roles."));
        }
      })
      .catch(error => {
        dispatch(fetchError("Server Error", error));
      });
  };
};

export const getPermissionFromRoleName = (name, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = window.localStorage.getItem("token");
    var config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    };
    axios
      .get(`userServices/admin/role/permissionXRole/?name=${name}`, config)
      .then(data => {
        if (data.data.code === 200) {
          dispatch(fetchSuccess("Roles actualizados!"));
          dispatch({type: GET_PROFILES, payload: data.data.data.permissions});
          if (callbackFun) callbackFun(data.data.data.permissions);
        } else {
          dispatch(fetchError("Error al traer roles."));
        }
      })
      .catch(error => {
        dispatch(fetchError("Server Error", error));
      });
  };
};

export const resetPassword = (email, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const token = window.localStorage.getItem("token");
    var config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      data: {
        email: email
      }
    };
    axios
      .put(`userServices/admin/users/resetPassword`, config)
      .then(data => {
        if (data.data.code === 200) {
          dispatch(
            fetchSuccess(
              "Se envió el pedido, al reiniciar debera colocar la clave nueva"
            )
          );
          dispatch({type: GET_PROFILES, payload: data.data});
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError("Error al traer roles."));
        }
      })
      .catch(error => {
        dispatch(fetchError("Server Error", error));
      });
  };
};
