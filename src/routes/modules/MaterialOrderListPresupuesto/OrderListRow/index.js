import React, { useEffect, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Edit, Delete, MoreHoriz } from '@material-ui/icons';
 
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

import moment from 'moment';
import 'moment/locale/es'; // Opcional si querés español 
 
import EventIcon from '@material-ui/icons/Event';
import useStyles from './index.style';
import { useDispatch, useSelector } from 'react-redux';  
import { updatePedidos } from 'redux/actions/Pedidos';
import { tieneAccesoASeccion, typeSection } from '@jumbo/utils/UserAdmin'; 

 

const getOrderActions = () => {
  const actions = [
    { action: 'edit', label: 'Editar', icon: <Edit /> }, 
  ]; 
  return actions;
};

const OrderListRow = ({ row,   mostrarEstadoPago ,onOrderDelete  }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
 
  const onOrderMenuClick = menu => { 
    
    if (menu.action === 'edit') {
    } 
   
  };

   const { authUser } = useSelector(({ auth }) => auth);

   const [seccion, setSecciones] = useState({
       ADMIN: false,
       VENTAS: false, 
       FABRICA: false,
       USUARIOS: false, 
     });
   
     const {ADMIN, VENTAS, FABRICA, USUARIOS} = seccion;
   
     const seccionesUser = authUser?.secciones;
   
     useEffect(() => {
       setSecciones({
         ...seccion,
         ADMIN: tieneAccesoASeccion(seccionesUser, typeSection.ADMIN), 
         VENTAS: tieneAccesoASeccion(seccionesUser, typeSection.VENTAS), 
         FABRICA: tieneAccesoASeccion(seccionesUser, typeSection.FABRICA),  
         USUARIOS: tieneAccesoASeccion(seccionesUser, typeSection.USUARIOS), 
       });
       // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

 
  const orderActions = getOrderActions(row); 
  
  // idproveedor, idrecibo, fechainicio, fechafinalizacion, nombre, apellido, empresa, idestado, observacion, idusuario, domicilio, idestadopago

  const [estadoPedido, setEstadoPedido] = useState(row.idestado);
  const [estadoPago, setEstadoPago] = useState(row.idestadopago);
  const [estadoProducto, setEstadoProducto] = useState(row.idestadoproducto);
  const [order, setOrder] = useState({
    id: row.id,
    ida: row.ida,
    idestado: row.idestado,
    idestadopago: row.idestadopago,
    idestadoproducto: row.idestadoproducto
  });


  const handleOrderChange = event => {
    event.preventDefault(); 
    setOrder({
      ...order,
      [event.target.name]: event.target.value,
    });
  };


  useEffect(() => { 
    if(order){
      console.log("Order Update", order);
      dispatch(
        updatePedidos(order.id, order, () => {})
      );
    }
      
  }, [ order]);

 

  const ESTADOS_PAGO = [ 
    { id: 1, descripcion: 'No se realiza pago' },
    { id: 2, descripcion: 'Pendiente de cancelación' },
    { id: 3, descripcion: 'Pagado' },
  ];

  const ESTADOS_PEDIDO = [
    { id: 1, descripcion: 'Iniciado' },
    { id: 2, descripcion: 'Presupuesto' },
    { id: 5, descripcion: 'En Proceso' },
    { id: 6, descripcion: 'Entregado' },
    { id: 7, descripcion: 'En Espera para Entregar' },
    { id: 8, descripcion: 'Finalizado Presupuesto' },
  ];

  const ESTADOS_PRODUCTO = [
    { id: 1, descripcion: 'Iniciado' }, 
    { id: 2, descripcion: 'En Proceso' },
    { id: 3, descripcion: 'Faltante de Materiales' },
    { id: 4, descripcion: 'En Espera de Confirmación Bloqueado' },
    { id: 5, descripcion: 'Terminado' },
    { id: 6, descripcion: 'Entregado' },
  ];

  const getRowBackgroundColor = () => {
     

    if (row.espresupuesto === false) {
      return '#413e3eff'; // bl
    } 

    return '#ffffff'; // blanco por defecto
  };


  return (
    <>
    <TableRow
      hover
      style={{ backgroundColor: getRowBackgroundColor() }}
      tabIndex={-1}
      key={row.id}>
      <TableCell padding="checkbox">
      </TableCell>   
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.nombre +' '+row.apellido}</TableCell>
      <TableCell align="center">{row.celular}</TableCell> 
      <TableCell align="center">{row.domicilio}</TableCell>     
      <TableCell align="center">{row.detalle}</TableCell>   
      <TableCell align="center">{row.linea}</TableCell> 
      <TableCell align="center">{row.color}</TableCell>
      <TableCell align="center">{row.ancho}</TableCell>
      <TableCell align="center">{row.alto}</TableCell>
      <TableCell align="center">{row.conpremarco?"Si":"No"}</TableCell>
      <TableCell align="center">{row.concontramarco?"Si":"No"}</TableCell>
      <TableCell align="center">{row.mano?"Izq":"Der"}</TableCell>
      <TableCell align="center">{row.coninstalacion?"Si":"No"}</TableCell>
      <TableCell align="center">{row.conreja?"Si":"No"}</TableCell>
      <TableCell align="center">{row.conmosquitero?"Si":"No"}</TableCell>
      <TableCell align="center">{row.conpersiana?"Si":"No"}</TableCell>
      <TableCell align="center">{row.cantidad}</TableCell>
      <TableCell align="center">{"$"+row.subtotal}</TableCell>
      <TableCell align="center">{row.idestado}</TableCell> 
        

      <TableCell align="center">
        <Chip
          label={row.proveedor}
          color="primary" 
          size="small"
        />
      </TableCell>
      <TableCell align="center">
        <Chip
          label={row.producto}
          color="primary" 
          size="small"
        />
      </TableCell>    
     
    </TableRow>
    
    
    </>
  );
};

export default React.memo(OrderListRow);
