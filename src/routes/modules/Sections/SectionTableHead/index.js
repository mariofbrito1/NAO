import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import React from 'react';

function SectionTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox disabled />
        </TableCell>
        <TableCell align="center">Id</TableCell>
        <TableCell align="center">Nombre</TableCell>
        <TableCell align="center">Ruta</TableCell>
        <TableCell align="center">Acciones</TableCell>
      </TableRow>
    </TableHead>
  );
}

SectionTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(SectionTableHead);
