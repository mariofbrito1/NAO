import React, { useEffect, useState } from 'react';
import {
  Paper,
  Switch,
  FormControlLabel,
  Typography,
  TextField,
  Divider,
  FormControl,
  RadioGroup,
  Radio,
} from '@material-ui/core';

import Button from '@mui/material/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Header from './Header';
import DialogProducto from './DialogProducto';
import GridContainer from '../../../@jumbo/components/GridContainer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addOrder } from '../../../redux/actions/Pedidos';
import { logic_btn_parent } from './logic.js';
import { DialogPrint } from './DialogPrint';

const useStyles = makeStyles(theme => ({
  pageFull: {
    width: '100%',
  },
  ProductSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
    '@media print': {
      display: 'none !important',
    },
  },
  ProductMainContent: {
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

export const Ingreso = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [pedido, setPedido] = useState({
    es_presupuesto: false,
    pago_parcial: false,
    idtipopago: '1',
    porcentaje_recargo: '',
    porcentaje_descuento: '',
  });

  const [products, setProducts] = useState([]);
  const [btn_enable, setBtnEnable] = useState(false);
  const [openRecibo, setOpenRecibo] = useState(false);
  const [pedidoGuardado, setPedidoGuardado] = useState(null);
  const [open, setOpen] = useState(false);

  const productDetail = {
    title: 'Generar Pedido o Presupuesto',
    product_pic: '/images/logo-white.jpg',
  };

  const toNumber = value => {
    const n = parseFloat(value);
    return isNaN(n) ? 0 : n;
  };

  const handlePedidoChange = event => {
    const { name, value } = event.target;

    setPedido(prev => {
      const next = {
        ...prev,
        [name]: value,
      };

      // Si cambia la forma de pago, limpiamos el porcentaje que no aplica
      if (name === 'idtipopago') {
        if (value === '2') {
          next.porcentaje_descuento = '';
        } else if (value === '1') {
          next.porcentaje_recargo = '';
        } else {
          next.porcentaje_recargo = '';
          next.porcentaje_descuento = '';
        }
      }

      return next;
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSaveComponente = prod => {
    setProducts(prevProducts => [...prevProducts, prod]);
    setOpen(false);
  };

  const handleRemoveProduct = index => {
    setProducts(prev => prev.filter((_, i) => i !== index));
  };

  const totalProductos = products.reduce((acc, prod) => {
    return acc + toNumber(prod.cantidad) * toNumber(prod.subtotal);
  }, 0);

  const porcentajeRecargo = pedido.idtipopago === '2' ? toNumber(pedido.porcentaje_recargo) : 0;
  const porcentajeDescuento = pedido.idtipopago === '1' ? toNumber(pedido.porcentaje_descuento) : 0;

  const importeRecargo = totalProductos * (porcentajeRecargo / 100);
  const importeDescuento = totalProductos * (porcentajeDescuento / 100);

  const totalFinal = totalProductos + importeRecargo - importeDescuento;

  // Si no es pago parcial, el total ingresado por el usuario se compara contra el total final
  const diferencia = (toNumber(pedido.total) || 0) - totalFinal;

  const onCreatePedido = () => {
    const prodFinal = {
      ...pedido,
      products,
      diferencia,
      totalProductos,
      porcentaje_recargo: porcentajeRecargo,
      porcentaje_descuento: porcentajeDescuento,
      importe_recargo: importeRecargo,
      importe_descuento: importeDescuento,
      total_final: totalFinal,
    };

    dispatch(
      addOrder(prodFinal, ped => {
        setPedidoGuardado({ ...prodFinal, idrec: ped.id });
        setOpenRecibo(true);
        history.push('/create_orders');
      })
    );
  };

  useEffect(() => {
    if (products && products.length > 0 && logic_btn_parent(pedido)) {
      setBtnEnable(true);
    } else {
      setBtnEnable(false);
    }
  }, [products, pedido]);

  return (
    <>
      <Box className={classes.pageFull}>
        <form
          encType="multipart/form-data"
          className={classes.root}
          onSubmit={e => {
            e.preventDefault();
            onCreatePedido();
          }}>
          <Header classes={classes} productDetail={productDetail} />

          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Typography
                className={classes.title}
                variant="h3"
                id="tableTitle"
                component="div"
                style={{ margin: '10px', padding: '20px' }}>
                <h3>Pedido de Compra / Presupuesto</h3>
              </Typography>

              <Grid item xs={12}>
                <Divider style={{ margin: '10px 0' }} />
              </Grid>

              <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                  <Box px={10} mb={1} mt={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={!!pedido.es_presupuesto}
                          onChange={e =>
                            setPedido(prev => ({
                              ...prev,
                              es_presupuesto: e.target.checked,
                            }))
                          }
                          name="es_presupuesto"
                          color="primary"
                        />
                      }
                      label={pedido.es_presupuesto ? 'Presupuesto' : 'Compra'}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Box px={10} mb={3}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      name="nombre"
                      value={pedido.nombre || ''}
                      onChange={handlePedidoChange}
                      required
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Box px={10} mb={3}>
                    <TextField
                      fullWidth
                      label="Apellido"
                      name="apellido"
                      value={pedido.apellido || ''}
                      onChange={handlePedidoChange}
                      required
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Box px={10} mb={3}>
                    <TextField
                      fullWidth
                      label="Celular"
                      name="celular"
                      value={pedido.celular || ''}
                      type="number"
                      onChange={e => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                          handlePedidoChange(e);
                        }
                      }}
                      inputProps={{
                        inputMode: 'decimal',
                        step: 'any',
                      }}
                      required
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Box px={10} mb={3}>
                    <TextField
                      fullWidth
                      label="Fecha de Finalización"
                      name="fechaFinalizacion"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={pedido.fechaFinalizacion || ''}
                      onChange={handlePedidoChange}
                      required
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Box px={10} mb={3}>
                    <TextField
                      fullWidth
                      label="Domicilio"
                      name="domicilio"
                      value={pedido.domicilio || ''}
                      onChange={handlePedidoChange}
                      required
                    />
                  </Box>
                </Grid>

                {!pedido.es_presupuesto && (
                  <>
                    <Grid item xs={12} sm={3} md={3}>
                      <Box px={10} mb={3}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={!!pedido.pago_parcial}
                              onChange={e =>
                                setPedido(prev => ({
                                  ...prev,
                                  pago_parcial: e.target.checked,
                                }))
                              }
                              name="pago_parcial"
                              color="primary"
                            />
                          }
                          label={pedido && pedido.pago_parcial ? 'Pago Completo' : 'Pago Parcial'}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={9} md={9}>
                      <Box px={10} mb={3}>
                        <Box mb={2}>
                          <p>
                            <b>Forma de Pago</b>
                          </p>
                        </Box>

                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            name="idtipopago"
                            value={pedido.idtipopago?.toString() || '1'}
                            onChange={handlePedidoChange}>
                            <FormControlLabel value="1" control={<Radio />} label="Efectivo" />
                            <FormControlLabel value="2" control={<Radio />} label="Tarjeta" />
                            <FormControlLabel value="3" control={<Radio />} label="Depósito/Transferencia" />
                            <FormControlLabel value="4" control={<Radio />} label="Pago Combinado" />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Grid>

                    {pedido.idtipopago === '2' && (
                      <Grid item xs={12} sm={6} md={6}>
                        <Box px={10} mb={3}>
                          <TextField
                            fullWidth
                            label="Recargo % por tarjeta"
                            name="porcentaje_recargo"
                            value={pedido.porcentaje_recargo || ''}
                            onChange={e => {
                              const value = e.target.value;
                              if (/^\d*\.?\d*$/.test(value)) {
                                handlePedidoChange(e);
                              }
                            }}
                            inputProps={{
                              inputMode: 'decimal',
                              step: 'any',
                              min: 0,
                            }}
                          />
                        </Box>
                      </Grid>
                    )}

                    {pedido.idtipopago === '1' && (
                      <Grid item xs={12} sm={6} md={6}>
                        <Box px={10} mb={3}>
                          <TextField
                            fullWidth
                            label="Descuento % por contado"
                            name="porcentaje_descuento"
                            value={pedido.porcentaje_descuento || ''}
                            onChange={e => {
                              const value = e.target.value;
                              if (/^\d*\.?\d*$/.test(value)) {
                                handlePedidoChange(e);
                              }
                            }}
                            inputProps={{
                              inputMode: 'decimal',
                              step: 'any',
                              min: 0,
                            }}
                          />
                        </Box>
                      </Grid>
                    )}

                    <Grid item xs={12} sm={6} md={6}>
                      {!pedido.pago_parcial && (
                        <Box px={10} mb={3}>
                          <TextField
                            fullWidth
                            label="Total en Pesos"
                            name="total"
                            value={pedido.total || ''}
                            onChange={e => {
                              const value = e.target.value;
                              if (/^\d*\.?\d*$/.test(value)) {
                                handlePedidoChange(e);
                              }
                            }}
                            required
                          />
                        </Box>
                      )}
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={12} md={12}>
                  <Box px={10} mb={1}>
                    <Button onClick={() => setOpen(true)} variant="contained" color="primary">
                      + Agregar Producto
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Paper className={classes.paper}>
                    <Typography
                      className={classes.title}
                      variant="h3"
                      id="tableTitle"
                      component="div"
                      style={{ margin: '10px', padding: '20px' }}>
                      <h4> Productos </h4>
                    </Typography>

                    <Grid container alignItems="center" style={{ backgroundColor: '#e0e0e0', padding: '10px 0' }}>
                      <Grid item xs={3}>
                        <Typography align="center">
                          <b>Descripción</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography align="center">
                          <b>Cantidad</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography align="center">
                          <b>SubTotal</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography align="center">
                          <b>Ancho</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography align="center">
                          <b>Alto</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography align="center">
                          <b>Observaciones</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography align="center">
                          <b>Acciones</b>
                        </Typography>
                      </Grid>
                    </Grid>

                    <List>
                      {products &&
                        products.map((product, index) => (
                          <ListItem key={index} divider style={{ backgroundColor: '#f5f5f5', padding: '10px 0' }}>
                            <Grid container alignItems="center">
                              <Grid item xs={3}>
                                <Typography align="center">{product.descripcion || 'Sin descripción'}</Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <Typography align="center">{product.cantidad || 1}</Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Typography align="center">{'$ ' + (product.subtotal || 0)}</Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <Typography align="center">{(product.ancho || '') + ' cm'}</Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <Typography align="center">{(product.alto || '') + ' cm'}</Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography align="center">{product.observaciones || ''}</Typography>
                              </Grid>
                              <Grid item xs={1} style={{ textAlign: 'center' }}>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveProduct(index)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </ListItem>
                        ))}
                    </List>
                  </Paper>

                  <Paper>
                    <Box display="flex" justifyContent="flex-end" mt={2} pr={4}>
                      <Grid container spacing={2} style={{ maxWidth: 450 }}>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1" align="right">
                            <b>Total productos:</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1" align="right">
                            ${totalProductos.toFixed(2)}
                          </Typography>
                        </Grid>

                        {porcentajeRecargo > 0 && (
                          <>
                            <Grid item xs={6}>
                              <Typography variant="subtitle1" align="right">
                                <b>Recargo tarjeta ({porcentajeRecargo}%):</b>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle1" align="right">
                                ${importeRecargo.toFixed(2)}
                              </Typography>
                            </Grid>
                          </>
                        )}

                        {porcentajeDescuento > 0 && (
                          <>
                            <Grid item xs={6}>
                              <Typography variant="subtitle1" align="right">
                                <b>Descuento contado ({porcentajeDescuento}%):</b>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle1" align="right">
                                - ${importeDescuento.toFixed(2)}
                              </Typography>
                            </Grid>
                          </>
                        )}

                        <Grid item xs={6}>
                          <Typography variant="subtitle1" align="right">
                            <b>Total final:</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1" align="right">
                            ${totalFinal.toFixed(2)}
                          </Typography>
                        </Grid>

                        {pedido && !pedido.pago_parcial && (
                          <>
                            <Grid item xs={6}>
                              <Typography variant="subtitle1" align="right">
                                <b>Entrega:</b>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle1" align="right">
                                ${(toNumber(pedido.total) || 0).toFixed(2)}
                              </Typography>
                            </Grid>

                            <Grid item xs={6}>
                              <Typography
                                variant="subtitle1"
                                align="right"
                                color={diferencia < 0 ? 'error' : 'primary'}>
                                <b>Saldo:</b>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                variant="subtitle1"
                                align="right"
                                color={diferencia < 0 ? 'error' : 'primary'}>
                                ${(-1 * diferencia).toFixed(2)}
                              </Typography>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Box px={10} mb={3}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={onCreatePedido}
                      disabled={!btn_enable}
                      sx={{
                        minWidth: '250px',
                        height: '48px',
                        fontSize: '16px',
                        '&:hover': {
                          backgroundColor: '#1404f0ff',
                          color: '#fff',
                        },
                      }}>
                      Aceptar
                    </Button>
                  </Box>
                </Grid>

                <DialogProducto open={open} onSave={onSaveComponente} handleClose={handleClose} />
              </GridContainer>
            </Paper>
          </div>
        </form>
      </Box>

      <DialogPrint pedidoGuardado={pedidoGuardado} setOpenRecibo={setOpenRecibo} openRecibo={openRecibo} />
    </>
  );
};

export default Ingreso;
