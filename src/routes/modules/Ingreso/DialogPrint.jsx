import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, Grid, Divider } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getColores, getLineas, getTipoAberturas, getTipoMaterial, getMaterial } from '../../../redux/actions/Ingreso';
import { URL } from 'redux/actions/config';

const useStyles = makeStyles(() => ({
  noPrint: {
    '@media print': { display: 'none !important' },
  },
  printArea: {
    padding: '20px',
    fontSize: '12px',
  },
}));

export const DialogPrint = ({ pedidoGuardado, setOpenRecibo, openRecibo, setFlagClosed = () => {} }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [tipoPago, setTipoPago] = useState('Efectivo');

  const { materiales = [], tipos_material = [], lineas = [], tipos_aberturas = [], colores = [] } = useSelector(
    state => state.ingreso
  );

  useEffect(() => {
    dispatch(getMaterial());
    dispatch(getTipoMaterial());
    dispatch(getLineas());
    dispatch(getTipoAberturas());
    dispatch(getColores());
  }, [dispatch]);

  useEffect(() => {
    if (pedidoGuardado && pedidoGuardado.idtipopago) {
      switch (pedidoGuardado.idtipopago?.toString()) {
        case '2':
          setTipoPago('Tarjeta');
          break;
        case '3':
          setTipoPago('Depósito / Transferencia');
          break;
        case '4':
          setTipoPago('Pago Combinado');
          break;
        default:
          setTipoPago('Efectivo');
          break;
      }
    } else {
      setTipoPago('Efectivo');
    }
  }, [pedidoGuardado]);

  const toNumber = value => {
    const n = parseFloat(value);
    return isNaN(n) ? 0 : n;
  };

  const getColor = id => colores.find(item => Number(item.id) === Number(id))?.descripcion || '';

  const getTiposMaterial = id => tipos_material.find(item => Number(item.id) === Number(id))?.descripcion || '';

  const getMateriales = id => materiales.find(item => Number(item.id) === Number(id))?.descripcion || '';

  const getLinea = id => lineas.find(item => Number(item.id) === Number(id))?.descripcion || '';

  const getTipoAbertura = id => tipos_aberturas.find(item => Number(item.id) === Number(id))?.descripcion || '';

  const totalProductos =
    pedidoGuardado?.totalProductos ??
    pedidoGuardado?.products?.reduce((acc, p) => acc + toNumber(p.cantidad) * toNumber(p.subtotal), 0) ??
    0;

  const porcentajeRecargo = toNumber(pedidoGuardado?.porcentaje_recargo);
  const porcentajeDescuento = toNumber(pedidoGuardado?.porcentaje_descuento);

  const importeRecargo =
    pedidoGuardado?.importe_recargo != null
      ? toNumber(pedidoGuardado?.importe_recargo)
      : totalProductos * (porcentajeRecargo / 100);

  const importeDescuento =
    pedidoGuardado?.importe_descuento != null
      ? toNumber(pedidoGuardado?.importe_descuento)
      : totalProductos * (porcentajeDescuento / 100);

  const totalFinal =
    pedidoGuardado?.total_final != null
      ? toNumber(pedidoGuardado?.total_final)
      : totalProductos + importeRecargo - importeDescuento;

  const entrega = toNumber(pedidoGuardado?.total);
  const saldo = totalFinal - entrega;

  return (
    <Dialog
      open={openRecibo}
      onClose={() => {
        setOpenRecibo(false);
        setFlagClosed();
      }}
      maxWidth="md"
      fullWidth>
      <DialogTitle>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={3}>
            <img src="/images/logo.png" alt="Logo" style={{ height: 60 }} />
          </Grid>

          <Grid item xs={5}>
            <Typography variant="h6">Aberturas "NAO"</Typography>
            <Typography variant="body2">"La mayor calidad al menor precio"</Typography>
            <Typography variant="body2">Autovía 5100 (entre Don Bosco y Sucre)</Typography>
            <Typography variant="body2">Cel: 2664-759003 - San Luis (5700)</Typography>
            <Typography variant="body2">CUIT: 27-34182589-5</Typography>
            <Typography variant="body2">ING BR: 12-27-34182589-5</Typography>
            <Typography variant="body2">INIC ACT 01/05/2016</Typography>
          </Grid>

          <Grid item xs={4}>
            {pedidoGuardado?.es_presupuesto ? (
              <Typography variant="body2">
                <b>PRESUPUESTO 0001-</b> {pedidoGuardado?.idrec || 'XXXXX'}
              </Typography>
            ) : (
              <Typography variant="body2">
                <b>RECIBO DE VENTA Nº 0001-</b> {pedidoGuardado?.idrec || 'XXXXX'}
              </Typography>
            )}

            <Typography variant="body2">
              {pedidoGuardado?.nombre || ''} {pedidoGuardado?.apellido || ''}
            </Typography>
            <Typography variant="body2">
              <b>Domicilio:</b> {pedidoGuardado?.domicilio || ''}
            </Typography>
            <Typography variant="body2">
              <b>Celular:</b> {pedidoGuardado?.celular || ''}
            </Typography>
            <Typography variant="body2">
              <b>Fecha:</b> {new Date().toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <b>Fecha de Entrega:</b>{' '}
              {pedidoGuardado?.fechaFinalizacion ? new Date(pedidoGuardado.fechaFinalizacion).toLocaleDateString() : ''}
            </Typography>
            <Typography variant="body2">
              <b>Plazo de entrega:</b> {pedidoGuardado?.dias_entrega ?? 0} días
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent className={classes.printArea}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <tbody>
            {pedidoGuardado?.products?.map((p, idx) => {
              const bgColor = idx % 2 === 0 ? '#b0cffcff' : '#ffffff';
              const subtotalLinea = toNumber(p.cantidad) * toNumber(p.subtotal);

              return (
                <React.Fragment key={idx}>
                  <tr style={{ backgroundColor: bgColor }}>
                    <td
                      colSpan={6}
                      style={{
                        border: '1px solid #000',
                        padding: '4px',
                        fontSize: '12px',
                        color: '#333',
                      }}>
                      <b>MAT:</b> {getMateriales(p.idmaterial)}
                      {p.idlinea ? (
                        <>
                          {' '}
                          | <b>LÍNEA:</b> {getLinea(p.idlinea)}
                        </>
                      ) : null}
                      {p.idtipoabertura ? (
                        <>
                          {' '}
                          | <b>ABERTURA:</b> {getTipoAbertura(p.idtipoabertura)}
                        </>
                      ) : null}
                      {p.idtipomaterial ? (
                        <>
                          {' '}
                          | <b>TIPO:</b> {getTiposMaterial(p.idtipomaterial)}
                        </>
                      ) : null}
                      {p.idcolor ? (
                        <>
                          {' '}
                          | <b>COLOR:</b> {getColor(p.idcolor)}
                        </>
                      ) : null}
                      {p.con_colocacion ? ' - CON INSTALACIÓN' : ' - SIN INSTALACIÓN'}
                      {p.con_premarco ? ' - c/Premarco' : ' - s/Premarco'}
                      {p.con_contramarco ? ' - c/Contramarco' : ' - s/Contramarco'}
                      {p.con_reja ? ' - c/Reja' : ' - s/Reja'}
                      {p.con_mosquitero ? ' - c/Mosq' : ' - s/Mosq'}
                      {p.con_persiana ? ' - c/Pers' : ' - s/Pers'}
                      {p.mano ? ' - Mano Der' : ' - Mano Izq'}
                    </td>
                  </tr>

                  <tr style={{ backgroundColor: bgColor }}>
                    <td style={{ border: '1px solid #000', padding: '4px' }}>{'Desig: ' + (idx + 1)}</td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>
                      {'Cantidad: ' + (p.cantidad || 0)}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>
                      Ancho: {p.ancho || 0} cm
                    </td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>
                      Alto: {p.alto || 0} cm
                    </td>
                    <td style={{ border: '2px solid #000', padding: '4px', textAlign: 'center' }}>
                      {p.image ? <img src={URL + p.image} alt="prod" style={{ height: '40px' }} /> : ''}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right' }}>
                      ${subtotalLinea.toFixed(2)}
                    </td>
                  </tr>

                  {p.observaciones ? (
                    <tr style={{ backgroundColor: bgColor }}>
                      <td
                        colSpan={6}
                        style={{
                          border: '1px solid #000',
                          padding: '4px',
                          fontSize: '12px',
                        }}>
                        <b>Observaciones:</b> {p.observaciones}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        <Box mt={2} textAlign="right">
          <Typography variant="body1">
            <b>Tipo de Pago:</b> {tipoPago}
          </Typography>

          <Typography variant="body2">
            <b>Subtotal productos:</b> ${totalProductos.toFixed(2)}
          </Typography>

          {porcentajeRecargo > 0 && (
            <Typography variant="body2">
              <b>Recargo tarjeta ({porcentajeRecargo}%):</b> ${importeRecargo.toFixed(2)}
            </Typography>
          )}

          {porcentajeDescuento > 0 && (
            <Typography variant="body2">
              <b>Descuento contado ({porcentajeDescuento}%):</b> - ${importeDescuento.toFixed(2)}
            </Typography>
          )}

          <Typography variant="h6">
            <b>Total final: ${totalFinal.toFixed(2)}</b>
          </Typography>

          {!pedidoGuardado?.pago_parcial && pedidoGuardado?.es_presupuesto === false && (
            <>
              <Typography variant="body2">
                <b>Entrega:</b> ${entrega.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                <b>Saldo:</b> ${saldo.toFixed(2)}
              </Typography>
            </>
          )}
        </Box>

        <Box mt={3}>
          <Typography variant="body2">
            <b>Observaciones:</b>
          </Typography>
          <Typography variant="body2">- La empresa no instala PREMARCOS.</Typography>
          <Typography variant="body2">
            - Si el detalle no dice con instalación, la abertura NO cuenta con instalación pagada.
          </Typography>
          <Typography variant="body2">- Toda abertura sale de taller con una regulación primaria...</Typography>
          <Typography variant="body2">- Las aberturas se entregan en óptimas condiciones de funcionamiento.</Typography>
          <Typography variant="body2">
            - Las aberturas que NO incluyan instalación, una vez entregadas, Aberturas NAO no se hace responsable de los
            problemas que puedan surgir de una mala instalación, como falsa escuadra, nivelación, regulación, etc.
          </Typography>
          <Typography variant="body2">
            - Una vez finalizada la abertura el cliente debe retirarla antes de los 30 días, caso contrario se dispondrá
            de las aberturas y luego el cliente deberá convenir la entrega de las mismas con la demora correspondiente a
            la nueva fabricación en un plazo de 30/45 días aprox.
          </Typography>
        </Box>

        <Box mt={5}>
          <Divider style={{ marginBottom: '25px' }} />

          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={6} style={{ textAlign: 'center' }}>
              <div
                style={{
                  borderTop: '1px solid #000',
                  width: '80%',
                  margin: '40px auto 5px auto',
                }}
              />
              <Typography variant="body2">Firma Cliente</Typography>
              <Typography variant="caption">(indicando haber leído y estar de acuerdo)</Typography>
            </Grid>

            <Grid item xs={6} style={{ textAlign: 'center' }}>
              <div
                style={{
                  borderTop: '1px solid #000',
                  width: '80%',
                  margin: '40px auto 5px auto',
                }}
              />
              <Typography variant="body2">Firma Responsable</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box mt={3} display="flex" justifyContent="space-between" className={classes.noPrint}>
          <Button
            onClick={() => {
              setOpenRecibo(false);
              setFlagClosed();
            }}
            color="secondary">
            Cerrar
          </Button>
          <Button onClick={() => window.print()} variant="contained" color="primary">
            Imprimir
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPrint;
