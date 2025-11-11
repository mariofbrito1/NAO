import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { Block, CheckCircleOutline, Delete, Edit, Mail, MoreHoriz, Visibility } from '@material-ui/icons';
import Chip from '@material-ui/core/Chip';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { sentMailToUser, updateUserStatus } from '../../../../../redux/actions/Users';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getUserActions = user => {
  const actions = [
    { action: 'view', label: 'Ver', icon: <Visibility /> },
    { action: 'edit', label: 'Editar', icon: <Edit /> },
    { action: 'email', label: 'Email', icon: <Mail /> },
  ];

  if (user.status === 'active') {
    actions.push({ action: 'suspend', label: 'Suspendido', icon: <Block /> });
  } else {
    actions.push({
      action: 'activate',
      label: 'Reactivado',
      icon: <CheckCircleOutline />,
    });
  }

  actions.push({ action: 'delete', label: 'Eliminar', icon: <Delete /> });
  return actions;
};

const UserListRow = ({ row, isSelected, onRowClick, onUserEdit, onUserDelete, onUserView }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onUserMenuClick = menu => {
    if (menu.action === 'edit') {
      onUserEdit(row);
    } else if (menu.action === 'email') {
      dispatch(sentMailToUser());
    } else if (menu.action === 'suspend') {
      dispatch(updateUserStatus({ id: row.id, status: 'suspended' }));
    } else if (menu.action === 'activate') {
      dispatch(updateUserStatus({ id: row.id, status: 'active' }));
    } else if (menu.action === 'delete') {
      onUserDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const userActions = getUserActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.id}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.tipo}</TableCell>
      <TableCell>{row.updatedAt}</TableCell>
      <TableCell>{row.monto}</TableCell>
      <TableCell>
        <Chip
          label={row.status === 'suspended' ? `Suspendido` : row.status}
          color={row.status === 'suspended' ? 'secondary' : 'primary'}
        />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(UserListRow);
