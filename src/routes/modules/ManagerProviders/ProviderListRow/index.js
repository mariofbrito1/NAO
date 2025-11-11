import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Edit, Delete, MoreHoriz } from '@material-ui/icons';
 
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

const getProviderActions = () => {
  const actions = [
    { action: 'edit', label: 'Editar', icon: <Edit /> }, 
  ]; 
  return actions;
};

const ProviderListRow = ({ row,  onProviderEdit, onProviderDelete  }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
 
  const onProviderMenuClick = menu => { 
    
    if (menu.action === 'edit') {
       
      onProviderEdit(row);
    } 
   
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const providerActions = getProviderActions(row);
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
      <TableCell align="center">{
       
       <Chip 
          label={row.esinterno ? 'Interno' : 'Externo'} 
          color={row.esinterno ?"secondary":"primary"} 
        />
      
      }
      </TableCell>  
      <TableCell align="center">{row.descripcion}</TableCell>  
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={providerActions} onItemClick={onProviderMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
    
    
    </>
  );
};

export default React.memo(ProviderListRow);
