import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';

const headCells = [ 
  ,
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: '#ID',
  } ,
  {
    id: 'apellido',
    numeric: true,
    disablePadding: true,
    label: 'Nombre Apellido',
  } ,
  {
    id: 'celular',
    numeric: true,
    disablePadding: true,
    label: 'Celular/Tel',
  } ,  
  {
    id: 'domicilio',
    numeric: true,
    disablePadding: true,
    label: 'Domicilio',
  }, 
  {
    id: 'observacion',
    numeric: true,
    disablePadding: true,
    label: 'Observación',
  } ,         
  {
    id: 'linea',
    numeric: true,
    disablePadding: true,
    label: 'Línea',
  } ,
  {
    id: 'color',
    numeric: true,
    disablePadding: true,
    label: 'Color',
  } ,
  {
    id: 'ancho',
    numeric: true,
    disablePadding: true,
    label: 'Ancho',
  } ,
  {
    id: 'alto',
    numeric: true,
    disablePadding: true,
    label: 'Alto',
  } , 
  {
    id: 'premarco',
    numeric: true,
    disablePadding: true,
    label: 'Premarco',
  } ,
  {
    id: 'contramarco',
    numeric: true,
    disablePadding: true,
    label: 'Contramarco',
  } , 
  {
    id: 'mano',
    numeric: true,
    disablePadding: true,
    label: 'Mano',
  } ,
  {
    id: 'coninstalacion',
    numeric: true,
    disablePadding: true,
    label: 'Con Instalación',
  } ,
  {
    id: 'conreja',
    numeric: true,
    disablePadding: true,
    label: 'Reja',
  } ,
  {
    id: 'conmosquitero',
    numeric: true,
    disablePadding: true,
    label: 'Mosquitero',
  } ,
  {
    id: 'conpersiana',
    numeric: true,
    disablePadding: true,
    label: 'Persiana',
  } ,
  {
    id: 'cantidad',
    numeric: true,
    disablePadding: true,
    label: 'Cantidad',
  } ,
  {
    id: 'subtotal',
    numeric: true,
    disablePadding: true,
    label: 'Sub Total',
  } ,
  {
    id: 'total',
    numeric: true,
    disablePadding: true,
    label: 'Total',
  } ,  
  {
    id: 'idproveedor',
    numeric: true,
    disablePadding: true,
    label: 'Proveedor',
  } , 
  {
    id: 'idmaterial',
    numeric: true,
    disablePadding: true,
    label: 'Producto',
  } ,  
   
];


// idproveedor, idrecibo, fechainicio, fechafinalizacion, nombre, apellido, empresa, idestado, observacion, idusuario, domicilio, idestadopago
function OrderTableHead({ classes, onSelectAllClick = ()=>{}, order, orderBy, rowCount, onRequestSort, isAdm }) {
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
        
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  classes: PropTypes.object.isRequired, 
  onRequestSort: PropTypes.func.isRequired, 
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(OrderTableHead);
