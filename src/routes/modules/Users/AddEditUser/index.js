import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchError, fetchStart, fetchSuccess } from 'redux/actions';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormChangePassword from '../ChangePassword';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Header from './Header';
import { initUsuariosForm, postUsuario, updateUsuario } from 'redux/actions/Usuarios';

const useStyles = makeStyles(() => ({
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
}));

const AddEditUser = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const { usuarioAEditar = null } = useSelector(state => state.usuarios); 
  const { listaRoles = [] } = useSelector(state => state.roles); 
  const { listaSectores = [] } = useSelector(state => state.sectores);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsuariosForm({ id }));
  }, [dispatch]);

  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    legajo: '',
    usuario: '',
    email: '',
    password: '',
    id_rol: '', 
    id_sector: '',
    activo: true,
  });

  const [resetPasswordSent, setResetPasswordSent] = useState(false);

  useEffect(() => {
    if (usuarioAEditar) {
      const {
        nombre,
        apellido, 
        usuario,
        email,
        id_rol,  
        id_sector,
        restaurar,
        activo,
      } = usuarioAEditar;
      setUser(prevState => ({
        ...prevState,
        nombre,
        apellido, 
        usuario,
        email,
        id_rol,  
        id_sector,
        activo,
      }));
      if (restaurar !== null) {
        setResetPasswordSent(true);
      }
    }
  }, [usuarioAEditar]);

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSuccess = () => history.push('/user/users');

  const onSaveUser = e => {
    e.preventDefault(); 
    dispatch(postUsuario(user, onSuccess));
  };

  const onUpdateUser = e => {
    e.preventDefault();
    const { nombre, apellido, id_rol, id_sector, email, activo } = user;
    dispatch(
      updateUsuario(
        id,
        {
          nombre,
          apellido, 
          id_rol,  
          id_sector,
          email,
          activo,
        },
        onSuccess
      )
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  /* const handleResetPassword = async () => {
    const { email } = user;
    try {
      dispatch(fetchStart());
      await axios.post('/reset', { email });
      setResetPasswordSent(true);
      dispatch(fetchSuccess(`Enviamos un correo a ${email} con la nueva contraseña.`));
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Server Error';
      dispatch(fetchError(errMsg));
    }
  };
 */
  const perfilDetail = {
    name: 'Usuarios',
    location: '/user/users/add',
    profile_pic: '/images/auth/profile.png',
  };

  return (
    <React.Fragment>
      <Box className={classes.pageFull}>
        <Header perfilDetail={perfilDetail} />
        <GridContainer>
          <Grid item xs={12} lg={12} className={classes.profileSidebar}>
            <Box mb={12}>
              <CmtCard>
                <CmtCardHeader title={id !== 'add' ? 'Editar Usuario' : 'Nuevo Usuario'} />
                <CmtCardContent>
                  <form
                    id="form-user"
                    onSubmit={e => {
                      id !== 'add' ? onUpdateUser(e) : onSaveUser(e);
                    }}>
                     
                    <Grid item xs={12} className={classes.profileSidebar}>
                      <Grid container spacing={3} columns={12}>
                        <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px' }}>
                          <h4>Datos Personales</h4>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            name="nombre"
                            label="Nombre"
                            required
                            fullWidth
                            value={user.nombre}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            name="apellido"
                            label="Apellido"
                            required
                            fullWidth
                            value={user.apellido}
                            onChange={handleChange}
                          />
                        </Grid> 
                        <Grid item xs={12} sm={4}>
                          <FormControl fullWidth>
                            <InputLabel id="roles-dropdown">Rol</InputLabel>
                            <Select
                              name="id_rol"
                              label="Seleccione Rol"
                              labelId="roles-dropdown"
                              required
                              value={user.id_rol}
                              onChange={handleChange}>
                              {listaRoles.map(rol => (
                                <MenuItem key={rol.id} value={rol.id}>
                                  {rol.nombre}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid> 
                         
                        <Grid item xs={12} style={{ marginTop: '30px', marginBottom: '20px' }}>
                          <Divider variant="middle" />
                          <h4 style={{ marginTop: '20px' }}>Datos de Acceso</h4>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            name="usuario"
                            label="Usuario"
                            required
                            fullWidth
                            onChange={handleChange}
                            value={user.usuario || user.email}
                            disabled={id !== 'add'}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            name="email"
                            label="Email de Notificación"
                            type="email"
                            required
                            fullWidth
                            onChange={handleChange}
                            value={user.email}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <FormControl fullWidth>
                            <InputLabel id="active-select-label">Activo</InputLabel>
                            <Select name="activo" label="Activo" value={user.activo} onChange={handleChange}>
                              <MenuItem value={true}>Si</MenuItem>
                              <MenuItem value={false}>No</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          {id !== 'add' ? (
                            <Button
                              type="button"
                              variant="outlined"
                              color="primary"
                              size="large"
                              fullWidth
                              style={{ height: '100%' }}
                              onClick={handleClickOpen}>
                              Restaurar Contraseña
                            </Button>
                          ) : (
                            <TextField
                              name="password"
                              label="Contraseña"
                              type="password"
                              required
                              fullWidth
                              onChange={handleChange}
                              value={user.password}
                            />
                          )}
                        </Grid>
                        <Grid
                          container
                          columns={12}
                          spacing={3}
                          style={{
                            marginTop: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}>
                          <Grid item>
                            <Button
                              type="button"
                              variant="contained"
                              color="secondary"
                              onClick={() => history.push('/user/users')}>
                              Cancelar
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button type="submit" variant="contained" color="primary">
                              Aceptar
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </CmtCardContent>
              </CmtCard>
            </Box>
          </Grid>
        </GridContainer>
      </Box>
      {open && <FormChangePassword open={open} setOpen={setOpen} />}
    </React.Fragment>
  );
};

export default AddEditUser;
