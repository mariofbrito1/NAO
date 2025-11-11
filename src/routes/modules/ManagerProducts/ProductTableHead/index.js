import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';

const headCells = [
  {
    id: 'imagen',
    numeric: false,
    disablePadding: true,
    label: 'Producto',
  },
  {
    id: 'descripcion',
    numeric: false,
    disablePadding: true,
    label: 'Descripción',
  },
  {
    id: 'proveedor',
    numeric: true,
    disablePadding: true,
    label: 'Proveedor',
  },
  {
    id: 'precio',
    numeric: false,
    disablePadding: true,
    label: 'Precio',
  },
  {
    id: 'stock',
    numeric: false,
    disablePadding: true,
    label: 'Cantidad',
  },  
   
];

function ProductTableHead({ classes, onSelectAllClick = ()=>{}, order, orderBy, rowCount, onRequestSort, isAdm }) {
  const onSortOrderChange = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map(headCell => (
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
        {isAdm && <TableCell align="center">Acciones</TableCell>}
      </TableRow>
    </TableHead>
  );
}

ProductTableHead.propTypes = {
  classes: PropTypes.object.isRequired, 
  onRequestSort: PropTypes.func.isRequired, 
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(ProductTableHead);
