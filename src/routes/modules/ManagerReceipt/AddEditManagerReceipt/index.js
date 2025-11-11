import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';   
import { Button, Switch , FormControlLabel, TextField ,  FormControl, RadioGroup, Radio, Typography} from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard'; 
import { addReceipt,  updateReceipt, getReceiptById, getReceipts } from '../../../../redux/actions/Receipts'; 

const useStyles = makeStyles(theme => ({
  pageFull: {
    width: '100%',
  },
  ReceiptSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  ReceiptMainContent: {
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

const ReceiptAdd = () => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [tabValue, setTabValue] = useState('');   
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { receipt: recibo = {}, loading } = useSelector(state => state.receipts); 

  const [receiptDetail, setReceiptDetail] = useState({
    title: 'Recibos',
    location: id === 'add' ? '/receipt/receipt/add' : `/receipt/receipt/${id}`,
    receipt_pic: '/images/logo-white.jpg',
  });

  // Estado inicial con valores por defecto
  const [receipt, setReceipt] = useState({
    idrecibo: '',
    idpedido: '',
    monto: '',
    pagoparcial: false,
    idtipopago: '1'
  });

  useEffect(() => {
    if (id !== 'add') {
      setIsLoading(true);
      dispatch(getReceiptById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log('recibo recibido:', recibo); // DEBUG
    console.log('id:', id); // DEBUG
    
    if (id !== 'add' && recibo && Object.keys(recibo).length > 0) {
      console.log('Setting receipt data:', recibo); // DEBUG
      
      // Mapear los campos correctamente
      const mappedReceipt = {
        id: recibo.id || '',
        idrecibo: recibo.idrecibo || '',
        idpedido: recibo.idpedido || '',
        monto: recibo.monto || '',
        pagoparcial: Boolean(recibo.pagoparcial),
        idtipopago: recibo.idtipopago?.toString() || '1',
        observacion: recibo.observacion || '',
        // Incluir cualquier otro campo que necesites
      };

      setReceipt(mappedReceipt);
      setIsLoading(false);

      setReceiptDetail(prev => ({
        ...prev,
        receipt_pic: recibo.imagen || '/images/logo-white.jpg',
      }));
    } else if (id === 'add') {
      // Resetear para modo creación
      setReceipt({
        idpedido: '',
        monto: '',
        pagoparcial: false,
        idtipopago: '1'
      });
      setIsLoading(false);
    }
  }, [recibo, id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReceiptChange = event => {
    setReceipt({
      ...receipt,
      [event.target.name]: event.target.value,
    });
  };

  // Función específica para el switch
  const handleSwitchChange = (event) => {
    setReceipt(prev => ({
      ...prev,
      pagoparcial: event.target.checked,
    }));
  };

  const onCreateReceipt = e => {
    e.preventDefault();
    dispatch(
      addReceipt(receipt, () => {
        history.push('/receipt/receipts');
      })
    );
  };

  const onUpdateReceipt = e => {
    e.preventDefault(); 
    dispatch(
      updateReceipt(receipt, () => {
        history.push('/receipt/receipts/');
      })
    );
  };

  if (isLoading) {
    return (
      <Box className={classes.pageFull}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Typography variant="h6">Cargando recibo...</Typography>
        </div>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Box className={classes.pageFull}>
        <form
          encType="multipart/form-data"
          className={classes.root}
          onSubmit={e => {
            id !== 'add' ? onUpdateReceipt(e) : onCreateReceipt(e);
          }}>
          <Header
            classes={classes}
            tabValue={tabValue}
            receiptDetail={receiptDetail}
            handleTabChange={handleTabChange}
          />
          <GridContainer>
            <Grid item xs={12} lg={12} className={classes.profileSidebar}>
              <Box mb={12}>
                <CmtCard>
                  <CmtCardHeader title={id !== 'add' ? 'Editar Recibo' : 'Nuevo Recibo'} />
                  <CmtCardContent> 
                     

                    {/* Sección: Información básica del recibo */}
                    <Grid container spacing={1} alignItems="center">
                      {/* Número de Pedido */}
                      <Grid item xs={12} sm={4} md={4}>
                        <TextField
                          name="idpedido"
                          label="Nª Pedido"
                          disabled={id != 'add'}
                          style={{margin: '10px' , padding: '10px'}}
                          required
                          fullWidth
                          value={receipt.idpedido || ''}
                          onChange={handleReceiptChange}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4} md={4}>
                        <TextField
                          name="monto"
                          label="Monto"
                          style={{margin: '10px', padding: '10px'}}
                          required
                          fullWidth
                          value={receipt.monto || ''}
                          onChange={handleReceiptChange}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>

                      {/* Tipo de Pago */}
                      <Grid item xs={12} sm={4} md={4}>
                        <FormControlLabel
                          style={{margin: '10px', padding: '10px'}}
                          control={
                            <Switch
                              checked={receipt.pagoparcial}
                              onChange={handleSwitchChange}
                              name="pagoparcial"
                              color="primary"
                            />
                          }
                          label={receipt.pagoparcial ? 'Pago Parcial' : 'Cancelación'}
                        />
                      </Grid>
                    </Grid>

                    {/* Sección: Forma de Pago */}
                    <Box mt={4} mb={2}>
                      <Typography variant="h6" gutterBottom>
                        <b>Forma de Pago</b>
                      </Typography>
                      
                      <Grid container>
                        <Grid item xs={12}>
                          <FormControl component="fieldset" fullWidth>
                            <RadioGroup
                              row
                              name="idtipopago"
                              value={receipt.idtipopago || "1"}
                              onChange={handleReceiptChange}
                            >
                              <FormControlLabel 
                                value="1" 
                                control={<Radio />} 
                                label="Efectivo" 
                              />
                              <FormControlLabel 
                                value="2" 
                                control={<Radio />} 
                                label="Tarjeta" 
                              />
                              <FormControlLabel 
                                value="3" 
                                control={<Radio />} 
                                label="Depósito/Transferencia" 
                              />
                              <FormControlLabel 
                                value="4" 
                                control={<Radio />} 
                                label="Pago Combinado" 
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Sección: Botones de acción */}
                    <Grid 
                      container 
                      spacing={2}
                      justifyContent="flex-end"
                      alignItems="center"
                      style={{ marginTop: '30px' }}
                    >
                      <Grid item>
                        <Button
                          type="button"
                          variant="contained"
                          color="secondary"
                          onClick={() => history.push('/receipt/receipts')}
                        >
                          Cancelar
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button 
                          type="submit" 
                          variant="contained" 
                          color="primary"
                        >
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

export default ReceiptAdd;