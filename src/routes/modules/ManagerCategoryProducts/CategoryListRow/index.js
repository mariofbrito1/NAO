import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { Delete, Edit, MoreHoriz } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getCategoryActions = category => {
  const actions = [{ action: 'edit', label: 'Editar', icon: <Edit /> }];

  actions.push({ action: 'delete', label: 'Eliminar', icon: <Delete /> });
  return actions;
};

const CategoryListRow = ({ row, isSelected, onRowClick, onCategoryEdit, onCategoryDelete }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onCategoryMenuClick = menu => {
    if (menu.action === 'edit') {
      onCategoryEdit(row);
    } else if (menu.action === 'delete') {
      onCategoryDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const categoryActions = getCategoryActions(row);

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
              {row.name}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{moment(row.updated_at).format('DD/MM/YYYY')}</TableCell>

      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={categoryActions} onItemClick={onCategoryMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(CategoryListRow);
