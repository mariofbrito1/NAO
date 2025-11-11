import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';  
import { Button, TextField , Switch , FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard'; 
import { addProvider,  updateProvider, getProviderById } from '../../../../redux/actions/Proveedores';
import { getProviders } from '../../../../redux/actions/Proveedores';
 

const useStyles = makeStyles(theme => ({
  pageFull: {
    width: '100%',
  },
  ProviderSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  ProviderMainContent: {
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
  label: {
    flexGrow: 1,
  },
  textStyle: {
    padding: theme.spacing(3),
  },
  nameImg: {
    display: 'contents',
    alignItems: 'center',
  },
}));

const ProviderAdd = () => {

  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [tabValue, setTabValue] = useState('');   

  const dispatch = useDispatch();
  const { provider: proveedor = null } = useSelector(state => state.provider); 
  

  const [providerDetail, setProviderDetail] = useState({
    title: 'Proveedores',
    location: id === 'add' ? '/providers/providers/add' : `/providers/providers/${id}`,
    provider_pic: '/images/logo-white.jpg',
  });

   
  const [provider, setProvider] = useState({
    descripcion: '' 
  });

  useEffect(() => {
     
    if (id !== 'add') dispatch(getProviderById(id));

    dispatch(getProviders()); 
  }, [dispatch]); 
 
 
  useEffect(() => {
    
    if (proveedor) {   
 
      setProviderDetail(prev => ({
        ...prev,
        provider_pic: provider.imagen || '/images/logo-white.jpg',
      })); 
      setProvider(proveedor);  
    }
    
    
    if (id === 'add') {
      setProvider({
        descripcion: '' 
      });
      
      setProviderDetail({
        title: 'Proveedores',
        location: '/providers/providers/add',
        provider_pic: '/images/logo-white-symbol.png',
      }); 
    
    }
  }, [proveedor]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProviderChange = event => {
    
    setProvider({
      ...provider,
      [event.target.name]: event.target.value,
    });
  }; 
  

  const onCreateProvider = e => {
    e.preventDefault();
    
    dispatch(
      addProvider(provider, () => {
        history.push('/providers/providers');
      })
    );
  };

  const onUpdateProvider = e => {
    e.preventDefault(); 
  
    dispatch(
      updateProvider(provider, () => {
        history.push('/providers/providers/');
      })
    );
  };

  return (
    <React.Fragment>
      <Box className={classes.pageFull}>
        <form
          encType="multipart/form-data"
          className={classes.root}
          onSubmit={e => {
            id !== 'add' ? onUpdateProvider(e) : onCreateProvider(e);
          }}>
          <Header
            classes={classes}
            tabValue={tabValue}
            providerDetail={providerDetail}
            handleTabChange={handleTabChange}
          />
          <GridContainer>
         
            <Grid item xs={12} lg={12} className={classes.profileSidebar}>
              <Box mb={12}>
                <CmtCard>
                  <CmtCardHeader title={id !== 'add' ? 'Editar Proveedor' : 'Nuevo Proveedor'} />
                  <CmtCardContent>
                    <Grid container spacing={5} columns={12}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="descripcion"
                          label="Descripción"
                          required
                          fullWidth
                          value={provider.descripcion || ''}
                          onChange={handleProviderChange}
                           InputLabelProps={{ shrink: true }}
                        />
                      </Grid>  
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={!!provider.esinterno} // asegúrate que sea booleano
                            onChange={(e) =>
                                setProvider((prev) => ({
                                  ...prev,
                                  esinterno: e.target.checked,
                                }))
                              }
                              name="esinterno"
                              color="primary"
                          />
                          }
                          label={provider.esinterno ? 'Interno' : 'Externo'}
                        />
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
                          onClick={() => history.push('/providers/providers')}>
                            Cancelar
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button type="submit" variant="contained" color="primary">
                          Aceptar
                        </Button>
                      </Grid>
                    </Grid>
                  </CmtCardContent>
                </CmtCard>
              </Box>
            </Grid> 
          </GridContainer>
        </form>
      </Box>
    </React.Fragment>
  );
};

export default ProviderAdd;
