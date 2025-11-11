import { Dialog, DialogTitle, DialogContent, Typography, Divider, Button, Box, Grid, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
 
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getColores, getLineas, getTipoAberturas, getTipoMaterial,  getMaterial } from '../../../redux/actions/Ingreso'; 
import { URL } from 'redux/actions/config';


const useStyles = makeStyles(() => ({
  noPrint: {
    '@media print': { display: 'none !important' },
  },
  printArea: {
    padding: '20px',
    fontSize: '12px',
  },
  tableHeader: {
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    fontSize: '12px',
    textAlign: 'center',
    border: '1px solid #ccc',
  },
}));

export const DialogPrint = ({ pedidoGuardado, setOpenRecibo, openRecibo , setFlagClosed = ()=>{} }) => {
  const classes = useStyles();

  const [tipoPago, settipoPago] = useState("Efectivo");

  useEffect(() => {
         dispatch(getMaterial());
            dispatch(getTipoMaterial());
             dispatch(getLineas());
              dispatch(getTipoAberturas());
               dispatch(getColores()); 
    }, []);

  useEffect(() => { 
   
    if(pedidoGuardado &&  pedidoGuardado.idtipopago){
           
      switch ( pedidoGuardado?.idtipopago ) {
            case '4':
              settipoPago("Pago Combinado");
              break;
            case '2':
              settipoPago("Tarjeta");
              break;
            case '3':
              settipoPago("Depósito");
              break;
           
            default:
              break;
      }
    }
  }, [pedidoGuardado]);
  
  
    
    
    useEffect(() => {
       
      console.log("ped: -->", pedidoGuardado );
     
    }, [pedidoGuardado]);
  
  
  
    const dispatch = useDispatch();
    
      const { 
              materiales = [],
              tipos_material = [],
              lineas = [],
              tipos_aberturas = [], 
              colores =  [], 
      } = useSelector(state => state.ingreso);  
  
  
    const getColor = (id) => {
      return colores.find(color => color.id === id)?.descripcion || '';
    };
  
    const getTiposMaterial = (id) => { 
      return tipos_material.find(color => color.id === id)?.descripcion || '';
    };
  
    const getMateriales = (id) => {
      return materiales.find(color => color.id === id)?.descripcion || '';
    };
  
    const getLinea = (id) => {
      return lineas.find(l => l.id === id)?.descripcion || '';
    };

  const totalProductos = pedidoGuardado?.products?.reduce(
    (acc, p) => acc + ((parseFloat(p.cantidad) || 0) * (parseFloat(p.subtotal) || 0)),
    0
  ) || 0;


  return (
    <Dialog open={openRecibo} onClose={() => { setOpenRecibo(false); setFlagClosed() }} maxWidth="md" fullWidth>
      <DialogTitle>
        {/* ENCABEZADO */}
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={3}>
            <img src="/images/logo.png" alt="Logo" style={{ height: 60 }} />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Aberturas "NAO"</Typography>
            <Typography variant="body2">"La mayor calidad al menor precio"</Typography>
            <Typography variant="body2">Autovía 5100 (entre Don Bosco y Sucre)</Typography>
            <Typography variant="body2">Cel: 2664-759003 - San Luis (5700)</Typography>
            <Typography variant="body2">CUIT: 27-34182589-5</Typography>
            <Typography variant="body2">ING BR: 12-27-34182589-5</Typography>
            <Typography variant="body2">INIC ACT 01/05/2016</Typography>
          </Grid>  
          <Grid item xs={4}>
            {pedidoGuardado?.es_presupuesto && <Typography variant="body2"><b>PRESUPUESTO 0001-</b> {pedidoGuardado?.idrec || "XXXXX"}</Typography>}
            {pedidoGuardado?.es_presupuesto == false &&<Typography variant="body2"><b>RECIBO DE VENTA Nº 0001-</b> {pedidoGuardado?.idrec || "XXXXX"}</Typography>}
            {/* DATOS CLIENTE */}
       
          <Typography variant="body2"><b>Nombre / Apellido:</b> {pedidoGuardado?.nombre+" "+pedidoGuardado?.apellido}</Typography>
          <Typography variant="body2"><b>Domicilio:</b> {pedidoGuardado?.domicilio}</Typography>
          <Typography variant="body2"><b>Celular:</b> {pedidoGuardado?.celular}</Typography> 
          </Grid>
          <Grid item>
            <Typography variant="body2">Fecha: {new Date().toLocaleDateString()}</Typography>
            <Typography variant="body2">Fecha Pactada: { new Date(pedidoGuardado?.fechaFinalizacion).toLocaleDateString() }</Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      

      <DialogContent className={classes.printArea}>
        

        {/* TABLA PRODUCTOS */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          
          <tbody>
            {pedidoGuardado?.products?.map((p, idx) => {
              const bgColor = idx % 2 === 0 ? "#b0cffcff" : "#ffffff"; // alterna gris/blanco
              return (
                <React.Fragment key={idx}>
                  {/* FILA 1 */}
                 <tr style={{ backgroundColor: bgColor }}>
                    <td
                      colSpan={6}
                      style={{
                        border: '1px solid #000',
                        padding: '4px',
                        fontSize: '12px',
                        color: '#333',
                      }}
                    >
                      <b>MAT:</b> {getMateriales(p.idmaterial)}

                      {p.idlinea && (
                        <>
                          <b>  </b> {getLinea(p.idlinea)}
                        </>
                      )}

                      {p.idtipomaterial && (
                        <>
                          <b> </b> {getTiposMaterial(p.idtipomaterial)}
                        </>
                      )}

                      {p.idcolor && (
                        <>
                          <b> </b> {getColor(p.idcolor)}
                        </>
                      )}

                      {p.con_colocacion ? ' - CON INSTALACIÓN' : ' - SIN INSTALACIÓN'}
                      {p.con_premarco ? ' - c/Premarco': ' - s/Premarco'}
                      {p.con_contramarco ? ' - c/Contramarco' : ' - s/Premarco'}
                      {p.con_reja ? ' - c/Reja': ' - s/Reja'}
                      {p.con_mosquitero ? ' - c/Mosq': ' - s/Mosq'}
                      {p.con_persiana ? ' - c/Pers': ' - s/Pers'}
                      {p.mano ? ' - Mano Der': ' - Mano Izq'}
                    </td>
                  </tr>
                  {/* FILA 2 */}
                  <tr style={{ backgroundColor: bgColor }}>
                    <td style={{ border: '1px solid #000', padding: '4px' }}>{'Desig: '+idx + 1}</td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{'Cantidad: '+p.cantidad}</td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>Ancho: {p.ancho} cm</td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>Alto: {p.alto} cm</td>
                    <td style={{ border: '2px solid #000', padding: '4px', textAlign: 'center' }}>
                      {p.image ? <img src={URL+p.image} alt="prod" style={{ height: '40px' }} /> : ""}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right' }}>
                     ${((parseFloat(p.cantidad) || 0) * (parseFloat(p.subtotal) || 0)).toFixed(2)} 
                    </td>
                  </tr>
                  
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {/* TOTALES */}
        <Box mt={2} textAlign="right">
          <Typography variant="body1"><b>Tipo de Pago:</b> {tipoPago}</Typography>
          <Typography variant="h6"><b>Total: ${totalProductos.toFixed(2)}</b></Typography>
          { !pedidoGuardado?.pago_parcial &&
            pedidoGuardado?.es_presupuesto == false && <Typography variant="body2"><b>Entrega:</b> ${pedidoGuardado?.total || 0}</Typography>
          }
          { !pedidoGuardado?.pago_parcial &&
            pedidoGuardado?.es_presupuesto == false && <Typography variant="body2"><b>Saldo:</b> ${(totalProductos - (parseFloat(pedidoGuardado?.total) || 0)).toFixed(2)}</Typography> 
          }
        
          
        </Box>

        {/* OBSERVACIONES */}
        <Box mt={3}>
          <Typography variant="body2"><b>Observaciones:</b></Typography>
          <Typography variant="body2">- La empresa no instala PREMARCOS.</Typography>
          <Typography variant="body2">- Si el detalle no dice con instalación, la abertura NO cuenta con instalación pagada.</Typography>
          <Typography variant="body2">- Toda abertura sale de taller con una regulación primaria...</Typography> 
          <Typography variant="body2">- Las aberturas se entregan en óptimas condiciones de funcionamiento.</Typography>
          <Typography variant="body2">- Las aberturas que NO incluyan instalación, una vez entregadas, Aberturas NAO no se hace responsable de los problemas que puedan surgir de una mala instalación, como falsa escuadra, nivelación,regulación, etc.</Typography>
          <Typography variant="body2">- Una vez finalizada la abertura el cliente debe retirarla antes de los 30 días, caso contrario se dispondrá de las aberturas y luego el cliente deberá convenir la entrega de las mismas con la demora correspondiente a la nueva fabricación en un plazo de 30/45 días aprox.</Typography>
        </Box>

        {/* BOTONES */}
        <Box mt={3} display="flex" justifyContent="space-between" className={classes.noPrint}>
          <Button onClick={() => { setOpenRecibo(false); setFlagClosed() }} color="secondary">Cerrar</Button>
          <Button onClick={() => window.print()} variant="contained" color="primary">Imprimir</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
