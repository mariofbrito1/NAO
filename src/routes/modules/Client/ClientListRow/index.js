import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Edit, MoreHoriz } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getClientActions = Client => {
  const actions = [{ action: 'edit', label: 'Editar', icon: <Edit /> }];
  return actions;
};

const ClientListRow = ({ row, isSelected, onRowClick, onClientEdit, onClientDelete, filterMobile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClientMenuClick = menu => {
    if (menu.action === 'edit') {
      //console.log("Edit cliente", row);
      onClientEdit(row);
    } else if (menu.action === 'delete') {
      onClientDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const ClientActions = getClientActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}>
      <TableCell align="center">{'  '}</TableCell>
      <TableCell align="center" style={{ color: '#0bbbf3' }} component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.profile_pic} alt={row.first_name} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.first_name}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell align="center">{row.last_name}</TableCell>
      {!filterMobile && <TableCell align="center">{row.city ? row.city.name : '-'}</TableCell>}
      {!filterMobile && <TableCell align="center">{row.email}</TableCell>}
      {!filterMobile && <TableCell align="center">{moment(row.updated_at).format('DD-MM-YYYY')}</TableCell>}
      {!filterMobile && <TableCell align="center">{row.client_type.name}</TableCell>}
      <TableCell align="center">
        <Chip
          label={row.user_status.status === 'Pendiente' ? `Pendiente` : row.user_status.status}
          color={row.user_status.status === 'Pendiente' ? 'secondary' : 'primary'}
        />
      </TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={ClientActions} onItemClick={onClientMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(ClientListRow);
