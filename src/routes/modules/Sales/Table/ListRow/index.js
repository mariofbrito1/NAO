import React, { useEffect } from 'react';
import { TableCell, TableBody, Chip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import { Edit, MoreHoriz } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';
import MaxWidthDialog from '../DialogState';
import MoreVertIcon from '@material-ui/icons/Visibility';
import moment from 'moment';

const getColor = estado => {
  switch (estado) {
    case 'Aprobado':
      return '#2be890';
    case 'Rechazado':
      return '#f9cf1a';
    case 'Entregado':
      return '#c9c9c9';
    default:
      return '#c8aeff';
  }
};

const getStateActions = () => {
  const actions = [{ action: 'edit', label: 'Cambiar Estado', icon: <Edit /> }];
  return actions;
};

const StateListRow = ({ state, row, getDetail, restart_data }) => {
  const onStateMenuClick = menu => {
    if (menu.action === 'edit') {
      console.log('edit', row, state);
      setOpen(true);
    }
  };

  const stateActions = getStateActions();
  const [open, setOpen] = React.useState(false);

  const actions = [
    {
      label: 'Productos Asociados',
    },
  ];

  const actionHandler = id => {
    getDetail(id);
  };

  return (
    <>
      <TableBody key={row.id} style={{ height: 40 }}>
        <TableCell align="center">
          <Chip label={row.id} />
        </TableCell>
        <TableCell align="center">{row.nombre + ' ' + row.apellido}</TableCell>
        <TableCell align="center">{row.legajo}</TableCell>
        <TableCell align="center">{moment(row.fecha).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">{row.cantidad}</TableCell>
        <TableCell style={{ width: '90px' }} align="center">
          {row.kg}
        </TableCell>
        <TableCell style={{ width: '150px' }} align="center">
          {'$ ' + row.precio_final}
        </TableCell>
        <TableCell align="center">
          <Chip style={{ backgroundColor: getColor(row.estado) }} label={row.estado} />
        </TableCell>
        <TableCell
          align="center"
          onClick={event => {
            event.stopPropagation();
          }}>
          <CmtDropdownMenu items={stateActions} onItemClick={onStateMenuClick} TriggerComponent={<MoreHoriz />} />
        </TableCell>
        <TableCell align="center">
          <TableCell align="center">
            <CmtDropdownMenu
              TriggerComponent={
                <Tooltip title="Ver Detalle de Productos">
                  <IconButton style={{ marginLeft: 4 }}>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              }
              items={actions}
              onItemClick={() => actionHandler(row.id)}
            />
          </TableCell>
        </TableCell>
      </TableBody>
      <MaxWidthDialog open={open} setOpen={setOpen} row={row} estado={state} restart_data={restart_data} />
    </>
  );
};

export default React.memo(StateListRow);
