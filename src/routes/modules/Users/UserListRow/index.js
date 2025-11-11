import React from 'react';
import { useHistory } from 'react-router';

import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Edit, MoreHoriz } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import DeleteIcon from '@material-ui/icons/Delete';

const getUserActions = () => {
  const actions = [
    { action: 'edit', label: 'Editar', icon: <Edit /> },
    { action: 'delete', label: 'Eliminar', icon: <DeleteIcon /> },
  ];
  return actions;
};

const UserListRow = ({ usuario, onUserDelete, row }) => {
  const history = useHistory();
  const onUserMenuClick = menu => {
    if (menu.action === 'edit') {
      history.push(`/user/users/${usuario.id}`);
    } else onUserDelete(row);
  };

  const userActions = getUserActions();

  return (
    <TableRow hover key={usuario.id}>
       
      <TableCell align="center" padding="normal">
        {`${usuario.nombre} ${usuario.apellido}`}
      </TableCell>
      <TableCell align="center">{usuario.email}</TableCell>
      <TableCell align="center">{usuario.email_notificacion}</TableCell>  
      <TableCell align="center">{usuario.rol}</TableCell>
      <TableCell align="center">{row.activo ? 'Si' : 'No'}</TableCell>
      <TableCell align="center">{moment(usuario.fecha_creado).format('DD-MM-YYYY')}</TableCell>
      
    </TableRow>
  );
};

export default React.memo(UserListRow);
