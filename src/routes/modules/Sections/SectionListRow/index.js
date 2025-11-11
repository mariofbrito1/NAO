import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { Edit, MoreHoriz } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { sentMailToUser, updateUserStatus } from '../../../../redux/actions/Users';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu/index';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getUserActions = user => {
  const actions = [{ action: 'edit', label: 'Editar', icon: <Edit /> }];
  return actions;
};

const PermisionListRow = ({ row, isSelected, onRowClick, onSectionEdit, onSectionDelete, onSectionView }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onPermisionMenuClick = menu => {
    if (menu.action === 'view') {
      onSectionView(row);
    } else if (menu.action === 'edit') {
      onSectionEdit(row);
    } else if (menu.action === 'email') {
      dispatch(sentMailToUser());
    } else if (menu.action === 'suspend') {
      dispatch(updateUserStatus({ id: row.id, status: 'suspended' }));
    } else if (menu.action === 'activate') {
      dispatch(updateUserStatus({ id: row.id, status: 'active' }));
    } else if (menu.action === 'delete') {
      onSectionDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const userActions = getUserActions(row);

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell id={labelId} align="center">
        <Typography align="center" className={classes.titleRoot} component="div" variant="h4">
          {row.id}
        </Typography>
      </TableCell>
      <TableCell id={labelId} align="center">
        <Typography align="center" className={classes.titleRoot} component="div" variant="h4">
          {row.nombre}
        </Typography>
      </TableCell>
      <TableCell id={labelId} align="center">
        <Typography align="center" className={classes.titleRoot} component="div" variant="h4">
          {row.ruta}
        </Typography>
      </TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={userActions} onItemClick={onPermisionMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(PermisionListRow);
