import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import SectionListRow from './SectionListRow';
import SectionTableHead from './SectionTableHead';
import SectionTableToolbar from './SectionTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../../../@jumbo/components/Common/ConfirmDialog';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import { deleteSeccion, getSecciones } from 'redux/actions/Secciones';

const SectionModule = ({ history }) => {
  const classes = useStyles();
  //const { users } = useSelector(({ usersReducer }) => usersReducer);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  //const [openViewDialog, setOpenViewDialog] = useState(false);
  //const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedSeccion, setSelectedSeccion] = useState({ name: '' });
  const [seccionFetched, setSeccionFetched] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);

  const dispatch = useDispatch();
  const { listaSecciones = [] } = useSelector(state => state.secciones);

  useEffect(() => {
    dispatch(getSecciones());
    setSeccionFetched(true);
    setFilterOptions(listaSecciones);
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = listaSecciones.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
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

  const handleSectionView = user => {
    //dispatch(setCurrentUser(user));
    //setOpenViewDialog(true);
  };

  const handleSectionEdit = user => {
    history.push(`/user/section/${user.id}`);
  };

  const handleSectionDelete = seccion => {
    setSelectedSeccion(seccion);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteSeccion(selectedSeccion.id), () => dispatch(getSecciones()));
    setOpenConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const onSectionAdd = () => {
    history.push('/user/section/add');
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <SectionTableToolbar
          selected={selected}
          setSelected={setSelected}
          onSectionAdd={onSectionAdd}
          filterOptions={filterOptions}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <SectionTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={listaSecciones.length}
            />
            <TableBody>
              {listaSecciones.length ? (
                stableSort(listaSecciones, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <SectionListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onSectionEdit={handleSectionEdit}
                      onSectionDelete={handleSectionDelete}
                      onSectionView={handleSectionView}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>There are no records found with your filter.</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {seccionFetched ? 'No se encontreron registros.' : 'Buscando Lista de Secciones...'}
                      </NoRecordFound>
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
          count={listaSecciones.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      <ConfirmDialog
        open={openConfirmDialog}
        title={`Confirma Eliminar a ${selectedSeccion.nombre}`}
        content={'¿Estás seguro de eliminar esta sección?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default SectionModule;
