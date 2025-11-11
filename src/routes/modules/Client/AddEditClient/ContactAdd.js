import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import { alpha, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import UserIcon from '@material-ui/icons/AccountBox';
import LocIcon from '@material-ui/icons/LocationSearching';
import Switch from '@material-ui/core/Switch';
import StarIcon from '@material-ui/icons/Star';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import blue from '@material-ui/core/colors/blue';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';

///////////////////////
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getCiudad, getLocalidades, getClientById } from 'redux/actions/Clients';

const useStyles = makeStyles(theme => ({
  iconView: {
    backgroundColor: alpha(blue['500'], 0.1),
    color: blue['500'],
    padding: 8,
    borderRadius: 4,
    '& .MuiSvgIcon-root': {
      display: 'block',
    },
    '&.web': {
      backgroundColor: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
    },
    '&.phone': {
      backgroundColor: alpha(theme.palette.success.main, 0.15),
      color: theme.palette.success.dark,
    },
  },
  wordAddress: {
    wordBreak: 'break-all',
    cursor: 'pointer',
  },
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  profileMainContent: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {},
}));

const Contact = ({ client, setClient, paises = [], status, save, edit, isEdit, states = [] }) => {
  const dispatch = useDispatch();

  const {
    email,
    tel,
    last_name,
    first_name,
    doc_type,
    doc,
    birth_date,
    address,
    city_id,
    gender,
    id_status,
    user_state,
    client_type_id,
    pep,
    uif,
  } = client;

  //Localizaciones
  const [ciudades, setCiudades] = React.useState([]);
  const [localidades, setLocalidades] = React.useState([]);

  const [pais, setPais] = useState(11); // defecto Argentina
  const [ciudad, setCiudad] = useState(189); // defecto San Luis
  const [localidad, setLocalidad] = useState(1391); // defecto San Luis

  useEffect(() => {
    if (!isEdit) {
      //console.log(' NO EDIT');
      dispatch(
        getCiudad(pais, data => {
          //console.log("getCiudad--->", data);
          setCiudades(data);
        }),
      );

      dispatch(
        getLocalidades(ciudad, data => {
          //console.log("getLocalidades---->", data);
          setLocalidades(data);
        }),
      );

      setClient({ ...client, city_id: localidad });
    } else {
      //console.log(' buscando cliente->', client);
      dispatch(
        getClientById(client.id, data => {
          dispatch(
            getCiudad(data.city.country_id, data => {
              //console.log("getCiudad--->", data);
              setCiudades(data);
            }),
          );

          dispatch(
            getLocalidades(data.city.state_id, data => {
              //console.log("getLocalidades---->", data);
              setLocalidades(data);
            }),
          );

          //console.log("client api edit:", data);
          setClient(data);
          console.log('Edit estado->', data.user_status);

          setClient({
            ...client,
            user_state: data.user_status.status,
            id_status: data.user_status.id,
          });
          setSt(data.user_status);
          //console.log("Edit pais->", data.city.country_id);
          setPais(parseInt(data.city.country_id));
          //console.log("Edit ciudad->", parseInt(data.city.state_id));
          setCiudad(parseInt(data.city.state_id));
          //console.log("Edit loca->", data.city_id);
          setLocalidad(parseInt(data.city_id));
        }),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    //console.log("PAIS",pais);
    dispatch(
      getCiudad(pais, data => {
        //console.log("getCiudades->", data);
        setCiudades(data);
      }),
    );
  }, [pais]);

  useEffect(() => {
    //console.log("CIUDAD",ciudad);
    dispatch(
      getLocalidades(ciudad, data => {
        //console.log("getLocalidades->", data);
        setLocalidades(data);
      }),
    );
  }, [ciudad]);

  useEffect(() => {
    //console.log("Localidad", localidades)
  }, [localidades]);

  useEffect(() => {
    //console.log("LOCALIDAD-->", localidad);
    setClient({ ...client, city_id: localidad });
  }, [localidad]);

  //
  const classes = useStyles();

  const [st, setSt] = React.useState({
    id: '',
    name: '',
  });

  const addClient = e => {
    e.preventDefault();
    console.log('SAVE**');
    save();
  };

  const editClient = e => {
    e.preventDefault();
    console.log('EDIT**');
    edit();
  };

  const toggleChecked = () => {
    setClient({ ...client, uif: !uif });
  };

  const toggleChecked1 = () => {
    setClient({ ...client, pep: !pep });
  };

  useEffect(() => {
    //console.log("Status Asociado ->",st);
    //setClient({ ...client, ss: ciudad.id})
  }, [st]);

  const handleChange = event => {
    setSt({
      ...st,
      id: event.target.value,
    });
  };

  /// states

  const handleChangeSt = event => {
    //console.log("event state:", event.target.value);
    const st = states.find(st => st.status === event.target.value);
    setClient({
      ...client,
      user_state: event.target.value,
      id_status: st.id,
    });
  };

  const handleChangePais = event => {
    //console.log("event handleChangePais:", event.target.value);
    setPais(event.target.value);
  };

  const handleChangeCiudad = event => {
    //console.log("event handleChangeCiudad:", event.target.value);
    setCiudad(event.target.value);
  };

  const handleChangeLoc = event => {
    //console.log("event handleChangeLoc:", event.target.value);
    setLocalidad(event.target.value);
  };

  return (
    <CmtCard>
      <CmtCardContent>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              {isEdit ? <h2>Editar Cliente </h2> : <h2>Nuevo Cliente</h2>}
            </Box>
          </Box>
        </Box>

        <Divider variant="middle" />
        <Grid container spacing={2}>
          <form
            onSubmit={e => {
              isEdit ? editClient(e) : addClient(e);
            }}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }} style={{ marginTop: '30px' }}>
                <Box className={clsx(classes.iconView, 'web')}>
                  <UserIcon />
                </Box>
                <Box ml={6}>
                  <Box component="p" className={classes.wordAddress} fontSize={16}>
                    <Box>
                      <TextField
                        value={first_name}
                        required
                        style={{ width: '200px' }}
                        onChange={event => setClient({ ...client, first_name: event.target.value })}
                        label="Nombre"
                      />
                    </Box>
                  </Box>
                </Box>

                <Box className={clsx(classes.iconView, 'web')} style={{ marginLeft: '20px' }}>
                  <UserIcon />
                </Box>
                <Box ml={6}>
                  <Box component="p" className={classes.wordAddress} fontSize={16}>
                    <Box>
                      <TextField
                        value={last_name}
                        required
                        style={{ width: '200px' }}
                        onChange={event => setClient({ ...client, last_name: event.target.value })}
                        label="Apellido"
                      />
                    </Box>
                  </Box>
                </Box>

                <Box className={clsx(classes.iconView, 'phone')} style={{ marginLeft: '20px' }}>
                  <StarIcon />
                </Box>
                <Box ml={6}>
                  <Box component="span" fontSize={12} color="text.secondary">
                    Género:
                  </Box>
                  <Box>
                    <Select
                      value={gender}
                      required
                      onChange={event => setClient({ ...client, gender: event.target.value })}
                      displayEmpty
                      className={classes.selectEmpty}
                      inputProps={{ 'aria-label': 'Without label' }}>
                      <MenuItem value="">
                        <em>Seleccione Género</em>
                      </MenuItem>
                      <MenuItem value={'Masculino'}>Masculino</MenuItem>
                      <MenuItem value={'Femenino'}>Femenino</MenuItem>
                    </Select>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
                <Box className={classes.iconView}>
                  <MailOutlineIcon />
                </Box>
                <Box ml={6}>
                  <Box component="p" className={classes.wordAddress} fontSize={16}>
                    <Box>
                      <TextField
                        value={email}
                        required
                        style={{ width: '200px' }}
                        onChange={event => setClient({ ...client, email: event.target.value })}
                        label="Email"
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className={clsx(classes.iconView, 'phone')} style={{ marginLeft: '20px' }}>
                  <LocalPhoneIcon />
                </Box>
                <Box ml={6}>
                  <Box>
                    <TextField
                      type="number"
                      value={tel}
                      required
                      style={{ width: '200px' }}
                      onChange={event => setClient({ ...client, tel: event.target.value })}
                      label="Tel/Cel"
                    />
                  </Box>
                </Box>
                <Box className={clsx(classes.iconView, 'phone')} style={{ marginLeft: '20px' }}>
                  <StarIcon />
                </Box>
                <Box ml={6}>
                  <Box component="p" className={classes.wordAddress} fontSize={16}>
                    <Box>
                      <TextField
                        type="date"
                        required
                        className={classes.textField}
                        value={birth_date}
                        label="Fecha Nacimiento"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={event => setClient({ ...client, birth_date: event.target.value })}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" alignItems="left" mb={{ xs: 4, sm: 6 }}>
                <Box ml={6}>
                  <Box component="span" fontSize={12} color="text.secondary" style={{ marginLeft: '40px' }}>
                    Estado:
                  </Box>
                  <Box style={{ marginLeft: '40px' }}>
                    {states && states.length > 0 && (
                      <Select
                        native
                        required
                        style={{ width: '200px' }}
                        value={user_state}
                        onChange={handleChangeSt}
                        inputProps={{
                          name: '',
                          id: '',
                        }}>
                        {states.map(st => (
                          <option key={st.id} value={st.status}>
                            {st.status}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Divider variant="middle" />

            <Grid item xs={12}>
              <Divider variant="middle" />
              <Box display="flex" alignItems="left" mb={{ xs: 4, sm: 6 }}>
                <Box ml={6}>
                  <Box style={{ marginLeft: '40px', marginTop: '35px', width: '200px' }}>
                    <Select
                      value={doc_type}
                      style={{ width: '200px' }}
                      required
                      onChange={event => setClient({ ...client, doc_type: event.target.value })}
                      displayEmpty
                      className={classes.selectEmpty}
                      inputProps={{ 'aria-label': 'Without label' }}>
                      <MenuItem value="">
                        <em>Tipo de Documento</em>
                      </MenuItem>
                      <MenuItem value={'DNI'}>DNI</MenuItem>
                      <MenuItem value={'LC'}>LC</MenuItem>
                      <MenuItem value={'LE'}>LE</MenuItem>
                    </Select>
                  </Box>
                </Box>
                <Box style={{ marginLeft: '40px', marginTop: '20px' }}>
                  <TextField
                    value={doc}
                    required
                    type="number"
                    onChange={event => setClient({ ...client, doc: event.target.value })}
                    label="Documento de Identidad"
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
                <Box className={clsx(classes.iconView, 'web')}>
                  <LocIcon />
                </Box>
                <Box ml={6}>
                  <Box component="p" className={classes.wordAddress} fontSize={16}>
                    <Box>
                      {paises && (
                        <Grid item xs={12} lg={12}>
                          <FormControl className={classes.formControl}>
                            <InputLabel shrink={true}>Pais</InputLabel>
                            <Select
                              native
                              required
                              style={{ width: '200px' }}
                              onChange={handleChangePais}
                              value={pais}
                              inputProps={{
                                shrink: true,
                              }}>
                              {paises.map(pa => (
                                <option key={pa.id} value={pa.id}>
                                  {pa.name}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box className={clsx(classes.iconView, 'web')} style={{ marginLeft: '20px' }}>
                  <LocIcon />
                </Box>
                <Box ml={6}>
                  <Box component="p" className={classes.wordAddress} fontSize={16}>
                    <Box>
                      {ciudades && ciudades.length > 0 && (
                        <Grid item xs={12} lg={12}>
                          <FormControl className={classes.formControl}>
                            <InputLabel>Ciudad</InputLabel>
                            <Select
                              native
                              required
                              style={{ width: '200px' }}
                              value={ciudad}
                              onChange={handleChangeCiudad}
                              inputProps={{
                                name: '',
                                id: '',
                              }}>
                              {ciudades.map(ciu => (
                                <option key={ciu.id} value={ciu.id}>
                                  {ciu.name}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box className={clsx(classes.iconView, 'phone')} style={{ marginLeft: '20px' }}>
                  <LocIcon />
                </Box>
                <Box ml={6}>
                  <Box>
                    {localidades && localidades.length > 0 && (
                      <Grid item xs={12} lg={12}>
                        <FormControl className={classes.formControl}>
                          <InputLabel>Localidad</InputLabel>
                          <Select
                            native
                            required
                            value={localidad}
                            style={{ width: '200px' }}
                            onChange={handleChangeLoc}
                            inputProps={{
                              name: '',
                              id: '',
                            }}>
                            {localidades.map(loc => (
                              <option key={loc.id} value={loc.id}>
                                {loc.name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" alignItems="left" mb={{ xs: 4, sm: 6 }}>
                <Box ml={6}>
                  <Box style={{ marginLeft: '40px' }}>
                    <TextField
                      style={{ width: '200px' }}
                      required
                      value={address}
                      onChange={event => setClient({ ...client, address: event.target.value })}
                      label="Dirección"
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} lg={12}>
              <Box display="flex" alignItems="center" style={{ marginTop: '10px' }}>
                <Box ml={6}>
                  {status && (
                    <Grid item xs={12} lg={12} style={{ marginTop: '2px' }}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>Seleccione Estado</InputLabel>
                        <Select
                          native
                          required
                          value={st.id}
                          onChange={handleChange}
                          inputProps={{
                            name: '',
                            id: '',
                          }}>
                          {status.map(st => (
                            <option key={st.id} value={st.id}>
                              {st.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} lg={12}>
              <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }} style={{ marginTop: '30px' }}>
                <Box ml={6}>
                  <Box style={{ marginLeft: '20px' }} component="span" fontSize={12} color="text.secondary">
                    Uif
                  </Box>
                  <Box style={{ marginLeft: '20px' }}>
                    <FormControlLabel control={<Switch checked={uif} onChange={toggleChecked} />} label="Activado" />
                  </Box>
                </Box>
                <Box ml={6}>
                  <Box style={{ marginLeft: '20px' }} component="span" fontSize={12} color="text.secondary">
                    Pep
                  </Box>
                  <Box style={{ marginLeft: '20px' }}>
                    <FormControlLabel control={<Switch checked={pep} onChange={toggleChecked1} />} label="Activado" />
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} lg={12}>
              <Box display="flex" alignItems="center" mb={{ xs: 12, sm: 12 }} style={{ marginTop: '40px' }}>
                <Box ml={5}>
                  <Button type="submit" variant="contained" color="primary">
                    Aceptar
                  </Button>
                </Box>
              </Box>
            </Grid>
          </form>
        </Grid>
      </CmtCardContent>
    </CmtCard>
  );
};

export default Contact;

Contact.prototype = {};
