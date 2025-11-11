import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';

const headCells = [ 
   {
    id: 'idrecibo',
    numeric: false,
    disablePadding: true,
    label: 'Nº  Recibo',
  } ,
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Nº Pedido',
  } ,
  {
    id: 'fec_rec',
    numeric: false,
    disablePadding: true,
    label: 'Fecha',
  } , 
  {
    id: 'nombre',
    numeric: false,
    disablePadding: true,
    label: 'Nombre y Apellido',
  },
  {
    id: 'domicilio',
    numeric: false,
    disablePadding: true,
    label: 'Domicilio',
  } ,
  {
    id: 'celular',
    numeric: false,
    disablePadding: true,
    label: 'Tel/Celular',
  } ,
  {
    id: 'monto',
    numeric: false,
    disablePadding: true,
    label: 'Monto',
  },
  {
    id: 'idtipopago',
    numeric: false,
    disablePadding: true,
    label: 'Tipo Pago',
  },
  {
    id: 'pagoparcial',
    numeric: false,
    disablePadding: true,
    label: 'Estado de Pago'
  },
  {
    id: 'products',
    numeric: false,
    disablePadding: true,
    label: 'Productos Asociados'
  }
];

function ReceiptTableHead({ classes, onSelectAllClick = ()=>{}, order, orderBy, rowCount, onRequestSort, isAdm }) {
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

ReceiptTableHead.propTypes = {
  classes: PropTypes.object.isRequired, 
  onRequestSort: PropTypes.func.isRequired, 
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(ReceiptTableHead);
