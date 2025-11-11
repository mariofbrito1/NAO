import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';
import {
  setAuthUser,
  setForgetPassMailSent,
  setResetPasswordEmail,
  setResetPasswordEmailSuccess,
  updateLoadUser,
} from '../../../redux/actions/Auth';
import React from 'react';
import jwtDecode from 'jwt-decode';
import axios from './config';
import { history } from 'redux/store';

const JWTAuth = {
  onRegister: ({ name, email, password }) => {
    return dispatch => {
      dispatch(fetchStart());
      axios
        .post('auth/register', {
          email: email,
          password: password,
          name: name,
        })
        .then(({ data }) => {
          if (data.result) {
            sessionStorage.setItem('token', data.token.access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token.access_token;
            dispatch(fetchSuccess());
            //dispatch(JWTAuth.getAuthUser(true, data.token.access_token));
          } else {
            dispatch(fetchError(data.error));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(error.message));
        });
    };
  },

  onLogin: ({ email, password }) => {

    
    return async dispatch => {
      try {
        dispatch(fetchStart());

        const { data: userData } = await axios.post('/login', {
          username: email,
          password: password,
        });
 

        if (userData.changePassword) {
          dispatch(setResetPasswordEmail(email));
          history.push('/reset-password');
          dispatch(fetchSuccess());
          return;
        }

        const { data: userRoles } = await axios.get(`/rol_seccion/${userData.id}`);

        sessionStorage.setItem('user', JSON.stringify({ ...userData, secciones: [...userRoles] }));

        const { id, nombre, apellido, id_categoria, token, legajo } = userData;

        dispatch(
          setAuthUser({
            id,
            legajo,
            nombre,
            apellido,
            email,
            id_categoria, 
            token,
            secciones: userRoles,
          })
        );

        dispatch(fetchSuccess());
      } catch (error) {
        dispatch(fetchError(error.response?.data?.message || 'Ocurrió un error al intentar iniciar sesión'));
      }
    };
  },

  onLogout: () => {
    sessionStorage.clear();
    return dispatch => {
      try {
        dispatch(setAuthUser(null));
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },

  getAuthUser: () => {
    return dispatch => {
      try {
        const user = sessionStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        const decoded = jwtDecode(parsedUser.token);
        if (decoded.exp * 1000 > Date.now()) {
          dispatch(setAuthUser(parsedUser));
        } else {
          sessionStorage.setItem('user', '');
          history.push('/signin');
        }
      } catch (error) {
        // console.error(error);
      } finally {
        dispatch(updateLoadUser(true));
      }
    };
  },

  onForgotPassword: email => {
    return async dispatch => {
      try {
        dispatch(fetchStart());
        await axios.post('/reset', { email });
        dispatch(setForgetPassMailSent(true));
        dispatch(fetchSuccess());
      } catch (error) {
        dispatch(fetchError(error.response?.data?.message || 'Ocurrió un error al intentar recuperar la contraseña'));
      }
    };
  },

  onChangePassword: (email, password, repeatPassword) => {
    return async dispatch => {
      try {
        dispatch(fetchStart());
        await axios.post('/change', { email, password, repeatPassword });
        dispatch(setResetPasswordEmailSuccess(true));
        dispatch(fetchSuccess());
      } catch (error) {
        dispatch(fetchError(error.response?.data?.message || 'Ocurrió un error al intentar crear la nueva contraseña'));
      }
    };
  },

  getSocialMediaIcons: () => {
    return <React.Fragment> </React.Fragment>;
  },
};

export default JWTAuth;
