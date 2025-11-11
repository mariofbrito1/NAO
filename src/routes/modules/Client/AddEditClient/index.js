import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './index.style';

/////////////////// HEADER
import Header from './Header';

/////////////////// CONTACT
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import ContactAdd from './ContactAdd';
import Box from '@material-ui/core/Box';
import { getPais, addNewClient, addEditClient, getStatesClients } from '../../../../redux/actions/Clients';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const ClientAddEdit = () => {
  const classes = useStyles();

  ////////////////////////////////
  const history = useHistory();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const edit = localStorage.getItem('clientedit');
    setIsEdit(edit === 'true');
  }, [dispatch]);

  //////////////////////////// HEADERS //////////

  const [tabValue, setTabValue] = useState('about');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const perfilDetail = {
    name: 'Clientes',
    location: '/client/client/add',
    profile_pic: '/images/auth/profile.png',
  };

  const [status, setStatus] = useState();
  const [states, setStates] = useState(null);

  //ubicacion
  const [paises, setPaises] = React.useState(null);

  const [client, setClient] = useState({
    id: null,
    email: '',
    tel: '',
    last_name: '',
    first_name: '',
    doc_type: '',
    doc: '',
    birth_date: '',
    address: '',
    city_id: '',
    id_status: 0,
    user_state: 'Pendiente',
    id_status: 0,
    gender: '',
    client_type_id: 1,
    pep: false,
    uif: false,
  });

  useEffect(() => {
    if (isEdit) {
      const client_ = localStorage.getItem('client_');
      const objC = JSON.parse(client_);
      console.log('IS EDIT client->', objC);
      setClient(objC);
      //buscar todos los datos del cliente
    }

    dispatch(
      getPais(data => {
        //console.log("getPaises->", data);
        setPaises(data);
      }),
    );

    dispatch(
      getStatesClients(data => {
        //console.log("getStatesUsers", data.user_status);
        setStates(data.user_status);
      }),
    );
  }, [isEdit]);

  const onSave = () => {
    console.log('SAVE->', client);
    dispatch(
      addNewClient(client, data => {
        console.log('Return add', data);
        history.push('/client/client');
      }),
    );
  };

  const onEdit = () => {
    console.log('SAVE EDIT->', client);
    dispatch(
      addEditClient(client, data => {
        console.log('Return edit', data);
        history.push('/client/client');
      }),
    );
  };

  return (
    <div className={classes.root}>
      <Header classes={classes} tabValue={tabValue} perfilDetail={perfilDetail} handleTabChange={handleTabChange} />

      {paises && states && (
        <GridContainer>
          <Grid item xs={12} lg={12} className={classes.profileSidebar}>
            <Box mb={12}>
              <ContactAdd
                states={states}
                setClient={setClient}
                client={client}
                paises={paises}
                status={status}
                save={onSave}
                edit={onEdit}
                isEdit={isEdit}
              />
            </Box>
          </Grid>
        </GridContainer>
      )}
      {false && (
        <GridContainer style={{ marginBottom: '20px' }}>
          <Grid item xs={12} lg={12} className={classes.profileSidebar}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputBase
                  className={classes.input}
                  placeholder="Buscar Transacciones"
                  inputProps={{ 'aria-label': 'Buscar...' }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="date"
                  label="Desde"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="date"
                  label="Hasta"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </GridContainer>
      )}
    </div>
  );
};

export default ClientAddEdit;
