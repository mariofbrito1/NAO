import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import CategoryListRow from './CategoryListRow';
import CategoryTableHead from './CategoryTableHead';
import CategoryTableToolbar from './CategoryTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../../../@jumbo/components/Common/ConfirmDialog';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import { deleteCategoria, getCategorias } from 'redux/actions/Categorias';

const CategoryModule = ({ history }) => {
  const classes = useStyles();

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedData, setSelectedData] = useState({ descripcion: '' });
  const [fetched, setFetched] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isFilterApplied, setFilterApplied] = useState(false);

  const dispatch = useDispatch();
  const { listaCategorias = [] } = useSelector(state => state.categorias);

  useEffect(() => {
    dispatch(getCategorias());
    setFetched(true);
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = listaCategorias.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.length > 0 && selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = data => {
    history.push(`/user/categoria/${data.id}`);
  };

  const handleDelete = data => {
    setSelected(data);
    setSelectedData(data);
    setOpenConfirmDialog(true);
  };

  const onNewAdd = () => {
    history.push('/user/categoria/add');
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    dispatch(deleteCategoria(selectedData.id), () => dispatch(getCategorias()));
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const isSelected = id => selected.length > 0 && selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CategoryTableToolbar />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <CategoryTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={listaCategorias.length}
            />
            <TableBody>
              {listaCategorias.length ? (
                stableSort(listaCategorias, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <CategoryListRow
                      key={index}
                      row={row}
                      onEdit={handleEdit}
                      onRowClick={handleRowClick}
                      onDelete={handleDelete}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>No existen registros con ese filtro.</NoRecordFound>
                    ) : (
                      <NoRecordFound>{fetched ? 'Categorías no encontradas.' : 'Cargando Categorías...'}</NoRecordFound>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={listaCategorias.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
      <ConfirmDialog
        open={openConfirmDialog}
        title={`Confirma Eliminar la Categoría: ${selectedData.descripcion}`}
        content={'Está seguro de que quiere eliminar esta categoría?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default CategoryModule;
