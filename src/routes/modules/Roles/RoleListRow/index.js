import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { Delete, Edit, MoreHoriz } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
  cellBox: {
    width: '35ch',
    '& .Cmt-avatar': {
      marginRight: 16,
    },
  },
}));

const getProfileActions = profile => {
  const actions = [{ action: 'edit', label: 'Editar', icon: <Edit /> }];
  return actions;
};

const RoleListRow = ({ row, isSelected, onRowClick, onProfileEdit, onProfileDelete }) => {
  const classes = useStyles();

  const onProfileMenuClick = menu => {
    if (menu.action === 'edit') {
      onProfileEdit(row);
    } else if (menu.action === 'delete') {
      onProfileDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const profileActions = getProfileActions(row);

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
        <Typography className={classes.titleRoot} component="div" variant="h4">
          {row.id}
        </Typography>
      </TableCell>
      <TableCell id={labelId} className={classes.cellBox}>
        <Box display="flex" alignItems="center" justifyContent="start" padding="normal">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.profile_pic} alt={row.name} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.nombre}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={profileActions} onItemClick={onProfileMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(RoleListRow);
