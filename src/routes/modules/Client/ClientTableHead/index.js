import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';

const headCells = [
  {
    id: '-',
    numeric: false,
    disablePadding: true,
    label: ' ',
  },
  {
    id: 'first_name',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
  },
  {
    id: 'last_name',
    numeric: false,
    disablePadding: true,
    label: 'Apellido',
  },
  {
    id: 'city.name',
    numeric: false,
    disablePadding: true,
    label: 'Ciudad',
  },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  {
    id: 'updated_at',
    numeric: false,
    disablePadding: false,
    label: 'Fecha de Actualización',
  },
  {
    id: 'client_type.name',
    numeric: false,
    disablePadding: true,
    label: 'Tipo de Cliente',
  },
  {
    id: 'user_status.status',
    numeric: false,
    disablePadding: true,
    label: 'Estado',
  },
];

const headCellsMobile = [
  {
    id: '-',
    numeric: false,
    disablePadding: true,
    label: ' ',
  },
  {
    id: 'first_name',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
  },
  {
    id: 'last_name',
    numeric: false,
    disablePadding: true,
    label: 'Apellido',
  },
  {
    id: 'user_status.status',
    numeric: false,
    disablePadding: true,
    label: 'Estado',
  },
];

function UserTableHead({ classes, onSelectAllClick, order, filterMobile, orderBy, numSelected, rowCount, onRequestSort }) {
  const onSortOrderChange = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {!filterMobile
          ? headCells.map(headCell => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'center' : 'center'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={onSortOrderChange(headCell.id)}>
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))
          : headCellsMobile.map(headCell => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'center' : 'center'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={onSortOrderChange(headCell.id)}>
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
        <TableCell align="center">Acciones</TableCell>
      </TableRow>
    </TableHead>
  );
}

UserTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(UserTableHead);
