import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Header from './Header';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button } from '@material-ui/core';

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
}));

const AddEditUser = () => {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState('about');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const perfilDetail = {
    name: 'Usuarios',
    location: '/user/users/add',
    profile_pic: '/images/auth/profile.png',
  };

  const [per, setPer] = React.useState('');

  const handleChange = event => {
    setPer(event.target.value);
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
                  <CmtCardHeader title="Nuevo Usuario" />
                  <CmtCardContent>
                    <form className={classes.root} noValidate autoComplete="off">
                      <Grid item xs={12} lg={6} className={classes.profileSidebar}>
                        <Divider variant="middle" />
                        <Grid container spacing={2}>
                          <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <h4>Datos Personales</h4>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField id="standard-basic" label="Id Usuario Legajo" />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField id="standard-basic" label="Nombre y Apellido" />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField id="standard-basic" label="Teléfono" />
                          </Grid>

                          <Grid item xs={12} style={{ marginTop: '30px', marginBottom: '20px' }}>
                            <Divider variant="middle" />
                            <h4 style={{ marginTop: '20px' }}>Datos de Acceso</h4>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField id="standard-basic" label="Email" />
                          </Grid>

                          <Grid item xs={6}>
                            <Button variant="outlined" color="secondary">
                              Resetear Contraseña
                            </Button>
                          </Grid>

                          <Grid item xs={6}>
                            <h2>ACA select</h2>
                          </Grid>

                          <Grid item xs={12} style={{ marginTop: '50px' }}>
                            <Button variant="contained" color="primary">
                              Aceptar
                            </Button>
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
      )}
    </React.Fragment>
  );
};

export default AddEditUser;
