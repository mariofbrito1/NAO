import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addNewRole, updateRole, getRolesById } from '../../../../redux/actions/Roles';

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

const AddEditRol = () => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { rolAEditar = null } = useSelector(state => state.roles);

  const [tabValue, setTabValue] = useState('');

  const perfilDetail = {
    name: 'Rol',
    location: id !== 'add' ? '/user/roles/edit' : '/user/roles/add',
    profile_pic: '/images/auth/profile.png',
  };
  // rol
  const [rol, setRol] = useState({
    nombre: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = event => {
    setRol({ ...rol, nombre: event.target.value });
  };

  useEffect(() => {
    if (id !== 'add') dispatch(getRolesById(id));
  }, [dispatch]);

  useEffect(() => {
    if (rolAEditar) {
      setRol(...rolAEditar);
    }
    if (id === 'add') {
      setRol({ nombre: '' });
    }
  }, [rolAEditar]);

  const onUpdateRole = event => {
    event.preventDefault();
    setRol({ ...rol, nombre: event.target.value });
    dispatch(updateRole(rol, () => history.push('/user/roles')));
  };

  const onCreateRol = event => {
    event.preventDefault();
    dispatch(addNewRole(rol, () => history.push('/user/roles')));
  };

  return (
    <React.Fragment>
      <Box className={classes.pageFull}>
        <Header classes={classes} tabValue={tabValue} perfilDetail={perfilDetail} handleTabChange={handleTabChange} />
        <GridContainer>
          <Grid item xs={12} lg={12} className={classes.profileSidebar}>
            <Box mb={12}>
              <CmtCard>
                <CmtCardHeader title={id !== 'add' ? 'Editar Rol' : 'Nuevo Rol'} />
                <CmtCardContent>
                  <form className={classes.root} onSubmit={e => (id !== 'add' ? onUpdateRole(e) : onCreateRol(e))}>
                    <Grid item xs={12} lg={12} styles={{ margin: '30px' }}>
                      <TextField name="nombre" value={rol.nombre || ''} label="Nombre de Rol" onChange={handleChange} />
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
                          onClick={() => history.push('/user/roles')}>
                          Cancelar
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button type="submit" variant="contained" color="primary">
                          Aceptar
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CmtCardContent>
              </CmtCard>
            </Box>
          </Grid>
        </GridContainer>
      </Box>
    </React.Fragment>
  );
};

export default AddEditRol;
