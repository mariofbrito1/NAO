import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import ClientListRow from './ClientListRow';
import ClientTableHead from './ClientTableHead';
import ClientTableToolbar from './ClientTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch } from 'react-redux';
import { getClients } from '../../../redux/actions/Clients';
import AddEditClient from './AddEditClient/index';
import ConfirmDialog from '../../../@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import ClientDetailView from './ClientDetailView';
import NoRecordFound from './NoRecordFound';

const ClientModule = ({ history }) => {
  const classes = useStyles();
  const [orderBy, setOrderBy] = React.useState('first_name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState({ name: '' });
  const [ClientsFetched, setClientsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  ////////////////////////////////

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getClients(filterOptions, debouncedSearchTerm, data => {
        //console.log('GET CLIENT->', data);
        setClients(data);
      })
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const [clients, setClients] = useState([]);

  const handleCloseClientDialog = () => {
    setOpenClientDialog(false);
    // dispatch(setCurrentClient(null));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = clients.map(n => n.id);
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

  const handleClientView = Client => {
    //dispatch(setCurrentClient(Client));
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    //dispatch(setCurrentClient(null));
  };

  const handleClientEdit = Client => {
    localStorage.setItem('client_', JSON.stringify(Client));
    localStorage.setItem('clientedit', 'true');
    history.push('/client/client/add');
    //setOpenClientDialog(true);
  };

  const handleClientDelete = Client => {
    setSelectedClient(Client);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    //dispatch(deleteClient(selectedClient.id));
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const onNewClient = () => {
    localStorage.setItem('client_', '');
    localStorage.setItem('clientedit', 'false');
    //console.log('onNewClient');
    history.push('/client/client/add');
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const [filterMobile, setMyFilterMobile] = useState(false);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ClientTableToolbar
          selected={selected}
          setSelected={setSelected}
          onClientAdd={setOpenClientDialog}
          onNewClient={onNewClient}
          filterOptions={filterOptions}
          setMyFilterMobile={setMyFilterMobile}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <ClientTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              filterMobile={filterMobile}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={clients.length}
            />
            <TableBody>
              {!!clients.length ? (
                stableSort(clients, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <ClientListRow
                      key={index}
                      row={row}
                      filterMobile={filterMobile}
                      onRowClick={handleRowClick}
                      onClientEdit={handleClientEdit}
                      onClientDelete={handleClientDelete}
                      onClientView={handleClientView}
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
                        {ClientsFetched ? 'No se encontraron registros.' : 'Buscando Clientes...'}
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
          count={clients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openClientDialog && <AddEditClient open={openClientDialog} onCloseDialog={handleCloseClientDialog} />}
      {openViewDialog && <ClientDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

      <ConfirmDialog
        open={openConfirmDialog}
        title={`Confirma Eliminar a ${selectedClient.first_name}`}
        content={'Esta seguro de que quiere eliminar este Cliente?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ClientModule;
