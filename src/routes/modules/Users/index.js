import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableBody from '@material-ui/core/TableBody';
import { Paper, Table, TableCell, TableContainer, TableRow, TablePagination, TextField, TableHead } from '@material-ui/core';

import ConfirmDialog from '../../../@jumbo/components/Common/ConfirmDialog';
import UserListRow from './UserListRow';
import UserTableHead from './UserTableHead';
import UserTableToolbar from './UserTableToolbar';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';

import { clearUsuarioAEditar, initUsuariosTable, deleteUser } from 'redux/actions/Usuarios';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';

const UsersModule = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsuariosTable());
    dispatch(clearUsuarioAEditar());
  }, [dispatch]);

  const { loading = false } = useSelector(state => state.common);
  const { listaUsuarios = [] } = useSelector(state => state.usuarios);

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onUserNew = () => {
    history.push('/user/users/add');
  };

   

  const handleUserDelete = user => {
    setSelectedUser(user);
    setOpenConfirmDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    dispatch(deleteUser(selectedUser.id, () => dispatch(initUsuariosTable())));
  };

  const filteredData = listaUsuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
     usuario.apellido.toLowerCase().includes(searchText.toLowerCase()) ||
      usuario.legajo.includes(searchText)
  );

  useEffect(() => {
    console.log('Usuarios', listaUsuarios);
  }, [listaUsuarios]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <UserTableToolbar onUserNew={onUserNew} />
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell colSpan={7}>
                <TextField
                  label="Buscar"
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  fullWidth
                />
              </TableCell>
            </TableRow></TableHead>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <UserTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {filteredData.length ? (
                stableSort(filteredData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    const usuario = { ...row };
                    return <UserListRow key={usuario.id} row={row} usuario={usuario} onUserDelete={handleUserDelete} />;
                  })
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    <NoRecordFound>{loading ? 'Buscando usuarios...' : 'No se encontraron registros.'}</NoRecordFound>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={listaUsuarios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      <ConfirmDialog
        open={openConfirmDialog}
        title={`Confirma Eliminar a ${selectedUser.nombre}`}
        content={'¿Está seguro de eliminar este usuario?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UsersModule;
