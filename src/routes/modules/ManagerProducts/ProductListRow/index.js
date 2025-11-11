import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Edit, Delete, MoreHoriz } from '@material-ui/icons';
import { Box,
        Card, 
        Dialog, 
        DialogActions, 
        DialogTitle, 
        DialogContent, 
        Button,
        Table,
        TableBody,
        TableContainer,
        MenuItem,
      } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import CmtAvatar from '../../../../@coremat/CmtAvatarMat';
import Chip from '@material-ui/core/Chip';
import useStyles from './index.style';
import { useDispatch, useSelector } from 'react-redux'; 

import ContentEditable from 'react-contenteditable';

const getProductActions = product => {
  const actions = [
    { action: 'edit', label: 'Editar', icon: <Edit /> },
    { action: 'delete', label: 'Eliminar', icon: <Delete /> }
  ]; 
  return actions;
};

const ProductListRow = ({ row,  onProductEdit, onProductDelete  }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
 
  const onProductMenuClick = menu => { 
    
    if (menu.action === 'edit') {
       
      onProductEdit(row);
    } 
    if (menu.action === 'delete') {
       
       onProductDelete(row.id);
    } 
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const productActions = getProductActions(row);
  const image='/images/logo-white.jpg'; 
  
  

  return (
    <>
    <TableRow
      hover
      style={(false)? { backgroundColor: '#e2e2e2' } : { backgroundColor: '#ffffff' }}
      tabIndex={-1}
      key={row.id}>
      <TableCell padding="checkbox">
      </TableCell>
      <TableCell align="center" style={{ color: '#0bbbf3' }} component="th" id={labelId} scope="row" padding="none">
        <Box className={classes.imageContainer}>
          <CmtAvatar size={65} src={row.imagen?row.imagen :image} alt={row.title} />
        </Box>
      </TableCell>
      <TableCell align="center">{row.descripcion}</TableCell>
      <TableCell align="center">{row.proveedor}</TableCell>
      { row.precio &&  row.stock &&
        <>
          <TableCell align="center">
            <Chip 
              color="primary" 
              label={
                <h2 style={{ margin: 0 }}>
                  {'$ ' + (parseFloat(row.precio) || 0).toFixed(2)}
                </h2>
              }
            />
          </TableCell>
          <TableCell align="center">
            <Chip color="primary" label={<h2>{row.stock? parseFloat(row.stock): 0}</h2>} />
          </TableCell> 
        </>
      }
       
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={productActions} onItemClick={onProductMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
    
    
    </>
  );
};

export default React.memo(ProductListRow);
