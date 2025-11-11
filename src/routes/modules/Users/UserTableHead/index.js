import React from 'react';
import PropTypes from 'prop-types';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headCells = [
   
  {
    id: 'nombre-apellido',
    label: 'Nombre y Apellido',
  },
  {
    id: 'usuario',
    label: 'Usuario',
  },
  {
    id: 'email_notificacion',
    label: 'Email Notificación',
  },
  {
    id: 'rol',
    label: 'Rol',
  },
  {
    id: 'activo',
    label: 'Activo',
  },
  {
    id: 'created_at',
    label: 'Fecha Alta',
  },
];

function UserTableHead({ classes, order, orderBy, onRequestSort }) {
  const onSortOrderChange = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={'normal'}
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
      </TableRow>
    </TableHead>
  );
}

UserTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default React.memo(UserTableHead);
