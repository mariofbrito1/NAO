import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard';
import { useDispatch } from 'react-redux';
import { getPermission, getPermissionFromRoleName } from '../../../../redux/actions/Users';
import { assignPermissionTo } from '../../../../redux/actions/Users';
import ProfileDetail from './ProfileDetail';
import Header from './Header';

import { Button } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

///////////////////////////

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

const PermissionProfile = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState('about');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const profile = window.localStorage.getItem('permissionprofile');
    // poner para usuario nuevo

    setPerfil(JSON.parse(profile));

    dispatch(
      getPermission(null, null, data => {
        setPermisos(data);
      })
    );
  }, []);

  const [permission_profile, setPermissionProfile] = useState({
    name: '',
    roleName: '',
  });

  const [permisos, setPermisos] = useState([]);
  const [permiso, setPermiso] = useState();
  const [perfil, setPerfil] = useState();

  useEffect(() => {
    if (perfil && perfil.name) {
      setPermissionProfile({ ...permission_profile, roleName: perfil.name });
    }
  }, [perfil]);

  useEffect(() => {
    if (permisos && permisos.length > 1) {
      const dato = permisos.filter(d => d.id === permiso);
      if (dato.length > 0) {
        setPermissionProfile({ ...permission_profile, name: dato[0].name });
      }
    }
  }, [permiso]);

  useEffect(() => {
    

    if (permission_profile.roleName)
      dispatch(
        getPermissionFromRoleName(permission_profile.roleName, data => {
          console.log('getPermissionFromRoleName:', data);
          setPermisosAsociados(data);
        })
      );
  }, [permission_profile]);

  const onSubmit = () => {
    
    // if(profile.name.length>=3)
    permisosAsociados.forEach(namePermission => {
    
      dispatch(
        assignPermissionTo({ ...permission_profile, name: namePermission }, data => {
          
        })
      );
    });
    history.push('/user/roles/');
  };

  const perfilDetail = {
    name: 'Permisos / Roles',
    location: '/user/roles/permission',
  };

  ///////////////////////////

  function getStyles(name, permisosAsociados, theme) {
    return {
      fontWeight:
        permisosAsociados.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();
  const [permisosAsociados, setPermisosAsociados] = React.useState([]);

  useEffect(() => {
    //console.log("permisosAsociados", permisosAsociados)
  }, [permisosAsociados]);

  const handleChange = event => {
    //console.log("as", event.target.value);
    setPermisosAsociados(event.target.value);
  };

  const handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPermisosAsociados(value);
  };

  return (
    <React.Fragment>
      {true && (
        <Box className={classes.pageFull}>
          <Header classes={classes} tabValue={tabValue} perfilDetail={perfilDetail} handleTabChange={handleTabChange} />
          <GridContainer>
            <Grid item xs={12} lg={12} className={classes.profileSidebar}>
              <Box mb={12}>
                <CmtCard>
                  <CmtCardHeader title="Agregar/Quitar Permisos" />
                  <CmtCardContent>
                    <form className={classes.root} noValidate autoComplete="off">
                      <h4>Roles</h4>
                      <Box mb={6}>
                        <ProfileDetail profileDetail={perfil} />
                      </Box>
                      {permisos && (
                        <>
                          <h4 styles={{ marginBottom: '30px' }}>Selección de Permisos</h4>
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-multiple-chip-label">Permisos</InputLabel>
                            <Select
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              multiple
                              value={permisosAsociados}
                              onChange={handleChange}
                              input={<Input id="select-multiple-chip" />}
                              renderValue={selected => (
                                <div className={classes.chips}>
                                  {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                  ))}
                                </div>
                              )}
                              MenuProps={MenuProps}>
                              {permisos.map(d => (
                                <MenuItem
                                  key={d.name}
                                  value={d.name}
                                  style={getStyles(d.name, permisosAsociados, theme)}>
                                  {d.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </>
                      )}

                      <Grid item xs={12} lg={12} style={{ marginTop: '45px' }}>
                        <Button onClick={onSubmit} variant="contained" color="primary">
                          Aceptar
                        </Button>
                      </Grid>
                    </form>
                  </CmtCardContent>
                </CmtCard>
              </Box>
            </Grid>
          </GridContainer>
        </Box>
      )}
    </React.Fragment>
  );
};

export default PermissionProfile;
