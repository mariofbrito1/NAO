import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Edit, Delete, MoreHoriz, Print } from '@material-ui/icons'; 
import EventIcon from '@material-ui/icons/Event';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
 
import useStyles from './index.style';
import { useDispatch, useSelector } from 'react-redux'; 

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import moment from 'moment';
import 'moment/locale/es'; // Opcional si querés español 

const getReceiptActions = () => {


  const actions = [
    { action: 'edit', label: 'Editar', icon: <Edit /> }, 
    { action: 'print', label: 'Imprimir', icon: <Print /> }, 
  ]; 
  return actions;
};

const ReceiptListRow = ({ row,  onReceiptEdit, onReceiptPrint ,onReceiptDelete  }) => {

  
  const ESTADOS_PAGO = [ 
    { id: 1, descripcion: 'No se realiza pago' },
    { id: 2, descripcion: 'Pendiente de cancelación' },
    { id: 3, descripcion: 'Pagado' },
  ];

  const TIPO_PAGO = [ 
    { id: 1, descripcion: 'Efectivo' },
    { id: 2, descripcion: 'Tarjeta' },
    { id: 3, descripcion: 'Transferencia' },
    { id: 4, descripcion: 'Pago Conbinado' },
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


  const classes = useStyles();
  const dispatch = useDispatch();
 
  const onReceiptMenuClick = menu => { 
    
    if (menu.action === 'edit') {
       
      onReceiptEdit(row);
    }
    if (menu.action === 'print') {
       
      onReceiptPrint(row);
    }  
   
  };

 
  const receiptActions = getReceiptActions(row); 
  
  

  return (
    <>
    <TableRow
      hover
      style={(false)? { backgroundColor: '#e2e2e2' } : { backgroundColor: '#ffffff' }}
      tabIndex={-1}
      key={row.id}>
      <TableCell padding="checkbox"> 
      </TableCell>
      <TableCell align="center">{row.idrecibo}</TableCell>
      <TableCell align="center">{row.id}</TableCell> 
      <TableCell align="center">
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <EventIcon fontSize="small" color="action" />
          <Typography variant="body2" color="textSecondary">
            {moment(row.fec_rec).format('DD/MM/YYYY')}
          </Typography>
        </Box> 
      </TableCell>
      
      <TableCell align="center">{row.nombre+" "+row.apellido}</TableCell>   
      <TableCell align="center">{row.domicilio}</TableCell>  
      <TableCell align="center">{row.celular}</TableCell>
      <TableCell align="center">
        <Chip
          label={'$ '+row.monto}
          color="primary"
          size="small"  
        />
      </TableCell>
       
      <TableCell align="center"> 
          <Select
            name="idestadopago" // <--- IMPORTANTE
            value={row.idtipopago}
            disabled={true } 
          >
            {TIPO_PAGO.map((estado) => (
              <MenuItem key={estado.id} value={estado.id}>
                {estado.descripcion}
              </MenuItem>
            ))}
          </Select> 
      </TableCell>   
      <TableCell align="center">
        <Chip
          label={row.pagoparcial?"Pago Parcial":"Pagado"}
          color="secondary" 
          size="small"
        />
      </TableCell>
      <TableCell align="center">{JSON.stringify(row.products.length)}</TableCell>
     
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={receiptActions} onItemClick={onReceiptMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
    
    
    </>
  );
};

export default React.memo(ReceiptListRow);
