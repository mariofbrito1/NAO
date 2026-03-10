import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';

const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'Nº Pedido',
  },
  {
    id: 'idrecibo',
    numeric: true,
    disablePadding: true,
    label: 'Nº Recibo',
  },
  {
    id: 'idestado',
    numeric: true,
    disablePadding: true,
    label: 'Estado',
  },
  {
    id: 'idestadopago',
    numeric: true,
    disablePadding: true,
    label: 'Estado Pago',
  },
  {
    id: 'idestadoproducto',
    numeric: true,
    disablePadding: true,
    label: 'Estado Producto',
  },
  {
    id: 'fechafinalizacion',
    numeric: false,
    disablePadding: true,
    label: 'Fecha Entrega',
  },
  {
    id: 'dias_entrega',
    numeric: true,
    disablePadding: true,
    label: 'Plazo Entrega',
  },
  {
    id: 'linea',
    numeric: false,
    disablePadding: true,
    label: 'Línea',
  },
  {
    id: 'color',
    numeric: false,
    disablePadding: true,
    label: 'Color',
  },
  {
    id: 'ancho',
    numeric: true,
    disablePadding: true,
    label: 'Ancho',
  },
  {
    id: 'alto',
    numeric: true,
    disablePadding: true,
    label: 'Alto',
  },
  {
    id: 'premarco',
    numeric: false,
    disablePadding: true,
    label: 'Premarco',
  },
  {
    id: 'contramarco',
    numeric: false,
    disablePadding: true,
    label: 'Contramarco',
  },
  {
    id: 'mano',
    numeric: false,
    disablePadding: true,
    label: 'Mano',
  },
  {
    id: 'coninstalacion',
    numeric: false,
    disablePadding: true,
    label: 'Con Instalación',
  },
  {
    id: 'conreja',
    numeric: false,
    disablePadding: true,
    label: 'Reja',
  },
  {
    id: 'conmosquitero',
    numeric: false,
    disablePadding: true,
    label: 'Mosquitero',
  },
  {
    id: 'conpersiana',
    numeric: false,
    disablePadding: true,
    label: 'Persiana',
  },
  {
    id: 'cantidad',
    numeric: true,
    disablePadding: true,
    label: 'Cantidad',
  },
  {
    id: 'subtotal',
    numeric: true,
    disablePadding: true,
    label: 'Sub Total',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: true,
    label: 'Entrega',
  },
  {
    id: 'totalproductos',
    numeric: true,
    disablePadding: true,
    label: 'Total Productos',
  },
  {
    id: 'porcentaje_recargo',
    numeric: true,
    disablePadding: true,
    label: '% Recargo',
  },
  {
    id: 'importe_recargo',
    numeric: true,
    disablePadding: true,
    label: 'Imp. Recargo',
  },
  {
    id: 'porcentaje_descuento',
    numeric: true,
    disablePadding: true,
    label: '% Desc.',
  },
  {
    id: 'importe_descuento',
    numeric: true,
    disablePadding: true,
    label: 'Imp. Desc.',
  },
  {
    id: 'totalfinal',
    numeric: true,
    disablePadding: true,
    label: 'Total Final',
  },
  {
    id: 'idproveedor',
    numeric: false,
    disablePadding: true,
    label: 'Proveedor',
  },
  {
    id: 'idmaterial',
    numeric: false,
    disablePadding: true,
    label: 'Producto',
  },
  {
    id: 'fechainicio',
    numeric: false,
    disablePadding: true,
    label: 'Fecha Inicio',
  },
  {
    id: 'apellido',
    numeric: false,
    disablePadding: true,
    label: 'Nombre Apellido',
  },
  {
    id: 'celular',
    numeric: false,
    disablePadding: true,
    label: 'Celular/Tel',
  },
  {
    id: 'domicilio',
    numeric: false,
    disablePadding: true,
    label: 'Domicilio',
  },
  {
    id: 'observacion',
    numeric: false,
    disablePadding: true,
    label: 'Observación',
  },
];

function OrderTableHead({ classes, onSelectAllClick = () => {}, order, orderBy, rowCount, onRequestSort, isAdm }) {
  const onSortOrderChange = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>

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
