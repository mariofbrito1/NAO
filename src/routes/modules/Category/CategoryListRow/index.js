import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import { Delete, Edit, MoreHoriz } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getCategoriaActions = () => {
  const actions = [{ action: 'edit', label: 'Editar', icon: <Edit /> }];
  return actions;
};

const RoleListRow = ({ row, isSelected, onRowClick, onEdit, onDelete }) => {
  const classes = useStyles();
  const oneMenuClick = menu => {
    if (menu.action === 'edit') {
      onEdit(row);
    } else if (menu.action === 'delete') {
      onDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const actions = getCategoriaActions(row);

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
        <Checkbox disabled />
      </TableCell>

      <TableCell align="center">
        <Typography id={labelId} className={classes.titleRoot} component="div" variant="h4">
          {row.id}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.titleRoot} component="div" variant="h4">
          {row.descripcion}
        </Typography>
      </TableCell>
      <TableCell align="center">{row.monto_max}</TableCell>
      <TableCell align="center">{row.fecha_cierre ? moment(row.fecha_cierre).format('DD/MM/YYYY') : '---'}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={actions} onItemClick={oneMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(RoleListRow);
