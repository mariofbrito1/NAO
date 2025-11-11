import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import { initUsuariosForm, postUsuario, updateUsuario } from 'redux/actions/Usuarios';
import FormChangePassword from '../ChangePassword';
import Header from '../AddEditUser/Header';


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

const Account = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const { usuarioAEditar = null } = useSelector(state => state.usuarios); 
  const { listaRoles = [] } = useSelector(state => state.roles);
  const { listaCategorias = [] } = useSelector(state => state.categorias);
  const { listaSectores = [] } = useSelector(state => state.sectores);

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
    id_categoria: '',
    id_sector: '',
  });

  const [resetPasswordSent, setResetPasswordSent] = useState(false);

  useEffect(() => {
    if (usuarioAEditar) {
      const {
        nombre,
        apellido,
        legajo,
        usuario,
        email,
        id_rol, 
        id_categoria,
        id_sector,
        restaurar,
      } = usuarioAEditar;
      setUser(prevState => ({
        ...prevState,
        nombre,
        apellido,
        legajo,
        usuario,
        email,
        id_rol, 
        id_categoria,
        id_sector,
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
    const { nombre, apellido, legajo, id_rol, id_categoria, id_sector, email } = user;
    dispatch(
      updateUsuario(
        id,
        {
          nombre,
          apellido,
          legajo,
          id_rol,
          id_categoria,
          id_sector,
          email
        },
        onSuccess
      )
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const perfilDetail = {
    name: '',
    location: '',
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
                <CmtCardHeader title='Datos de cuenta' />
                <CmtCardContent>
                  <form
                    id="form-user"
                    onSubmit={e => {
                      id !== 'add' ? onUpdateUser(e) : onSaveUser(e);
                    }}>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        name="legajo"
                        label="Legajo"
                        required
                        disabled={id !== 'add'}
                        fullWidth
                        value={user.legajo}
                        onChange={handleChange}
                      />
                    </Grid>
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
                            inputProps={{ readOnly:id !== '1' }}
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
                            inputProps={{ readOnly:id !== '1' }}
                            fullWidth
                            value={user.apellido}
                            onChange={handleChange}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <FormControl fullWidth>
                            <InputLabel id="sector-dropdown">Sectores *</InputLabel>
                            <Select
                              name="id_sector"
                              label="Seleccione Sector"
                              labelId="sector-dropdown"
                              required
                              inputProps={{ readOnly:id !== '1' }}
                              value={user.id_sector}
                              onChange={handleChange}>
                              {listaSectores.map(sector => (
                                <MenuItem key={sector.id} value={sector.id}>
                                  {sector.descripcion}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <FormControl fullWidth>
                            <InputLabel id="roles-dropdown">Rol</InputLabel>
                            <Select
                              name="id_rol"
                              label="Seleccione Rol"
                              labelId="roles-dropdown"
                              required
                              inputProps={{ readOnly:id !== '1' }}
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

                        <Grid item xs={12} sm={4}>
                          <FormControl fullWidth>
                            <InputLabel id="categoria-dropdown">Categoria</InputLabel>
                            <Select
                              name="id_categoria"
                              label="Seleccione Categoria"
                              labelId="categoria-dropdown"
                              required
                              inputProps={{ readOnly:id !== '1' }}
                              value={user.id_categoria}
                              onChange={handleChange}>
                              {listaCategorias.map(categoria => (
                                <MenuItem key={categoria.id} value={categoria.id}>
                                  {categoria.descripcion}
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
                            inputProps={{ readOnly:id !== '1' }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <TextField
                            name="email"
                            label="Email"
                            type="email"
                            required
                            inputProps={{ readOnly:id !== '1' }}
                            fullWidth
                            onChange={handleChange}
                            value={user.email}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
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
                              onClick={() => history.push('/dash')}>
                              Cancelar
                            </Button>
                          </Grid>
                          <Grid item>
                          {id === '1' && (
                            <Button type="submit" variant="contained" color="primary">
                              Aceptar
                            </Button>
                          )}
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
      {open && (<FormChangePassword open={open} setOpen={setOpen}/> )}
    </React.Fragment>
  );
};

export default Account;
