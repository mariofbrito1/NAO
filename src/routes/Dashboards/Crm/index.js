import React from 'react';

import { Grid } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import WeatherDetail from '../../../routes/Widgets/Classic/Weather/WeatherDetail';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
  orderLg2: {
    [theme.breakpoints.up('lg')]: {
      order: 2,
    },
  },
  orderLg1: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
    },
  },
}));

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Crm', isActive: true },
];

const CrmDashboard = () => {
  const usuario = useSelector(state => state.auth.authUser)
  const classes = useStyles();

  return (
    <PageContainer heading="" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <h1>Te damos la bienvenida! {usuario.nombre}{' '}{usuario.apellido}</h1>
           <img 
              src="/images/bienvenida.jpg" 
              alt="Bienvenida" 
              style={{ width: '100%', maxWidth: '600px', height: 'auto', marginTop: '20px' }} 
            />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default CrmDashboard;
