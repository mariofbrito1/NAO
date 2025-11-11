import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Header from './Header';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { getSeccionById, updateSeccion } from 'redux/actions/Secciones';

import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button } from '@material-ui/core';
import { createSeccion } from 'redux/actions/Secciones';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
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
}));

const AddEditPermision = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { seccionAEditar = null } = useSelector(state => state.secciones);

  const [tabValue, setTabValue] = useState('about');
  const [section, setSection] = useState({
    nombre: '',
    ruta: '',
  });

  useEffect(() => {
    if (id !== 'add') dispatch(getSeccionById(id));
  }, [dispatch]);

  useEffect(() => {
    if (seccionAEditar) setSection(...seccionAEditar);
    if (id === 'add') setSection({ nombre: '', ruta: '' });
  }, [seccionAEditar]);

  const perfilDetail = {
    name: 'Secciones',
    location: id !== 'add' ? `/user/section/${id}` : '/user/section/add',
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = event => {
    setSection({ ...section, [event.target.name]: event.target.value });
  };

  const onCreateSection = e => {
    e.preventDefault();
    dispatch(createSeccion(section, () => history.push('/user/section')));
  };

  const onUpdateSection = event => {
    event.preventDefault();
    setSection({ ...section, [event.target.name]: event.target.value });
    dispatch(updateSeccion(section, () => history.push('/user/section')));
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
                  <CmtCardHeader title={id !== 'add' ? 'Editar Sección' : 'Nuevo Sección'} />
                  <CmtCardContent>
                    <form
                      className={classes.root}
                      autoComplete="off"
                      onSubmit={e => (id !== 'add' ? onUpdateSection(e) : onCreateSection(e))}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            name="nombre"
                            label="Nombre de sección"
                            required
                            fullWidth
                            value={section.nombre || ''}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                          <TextField
                            name="ruta"
                            label="Ruta"
                            required
                            fullWidth
                            value={section.ruta || ''}
                            onChange={handleChange}
                          />
                        </Grid>
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
                            onClick={() => history.push('/user/section')}>
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
      )}
    </React.Fragment>
  );
};

export default AddEditPermision;
