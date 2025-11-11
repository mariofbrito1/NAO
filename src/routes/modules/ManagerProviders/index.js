import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import ProviderListRow from './ProviderListRow';
import ProviderTableHead from './ProviderTableHead';
import ProviderTableToolbar from './ProviderTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch } from 'react-redux';
import { getProviders } from '../../../redux/actions/Proveedores';
import AddEditProvider from './AddEditManagerProvider/index';
import useStyles from './index.style';
import ProviderDetailView from './ProviderDetailView';
import NoRecordFound from './NoRecordFound';
 

const ProviderModule = ({ history }) => {
  const classes = useStyles();

  // caracteristicas de usuarios
  const { authUser } = useSelector(({ auth }) => auth);
  const seccionesUser = authUser?.secciones;
  ////// 

  const ID_ROL_ADM = 1;
  //////

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openProviderDialog, setOpenProviderDialog] = useState(false);
  const [providersFetched, setProviderFetched] = useState(false);
  const [isFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);
  ////////////////////////////////

  const dispatch = useDispatch();
  
  const { providers: listaProveedores  = [] } = useSelector(state => state.providers);

  useEffect(() => {
    dispatch(getProviders({
      id_rol: seccionesUser[0].id_rol
    }));
    setProviderFetched(true);
  }, [dispatch, refresh]);



  const handleCloseProviderDialog = () => {
    setOpenProviderDialog(false);
    // dispatch(setCurrentProvider(null));
  };

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

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    //dispatch(setCurrentProvider(null));
  };


  const handleProviderEdit = provider => { 
    localStorage.setItem('provideredit', 'true');
    localStorage.setItem('provider', JSON.stringify(provider));
    history.push(`/providers/providers/${provider.id}`);
  };

   

  const onProviderAdd = () => {
    history.push('/providers/providers/add');
  }; 
   

  const proveedoresFiltrados = listaProveedores;
  
  /*
  ACA HACERE EL FILTRO GPT
  listaProveedores.filter((pro) =>
    {
       pro.id = pro.id;//pro.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) 
    }
  );*/

  


  return (
    <div className={classes.root} style={{ padding: '10xp' }}>
      <Paper className={classes.paper}>
        <ProviderTableToolbar
          onProviderAdd={setOpenProviderDialog}
          onNewProvider={onProviderAdd}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          rowCount={listaProveedores.length}
          data={listaProveedores}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm} 
          refresh={refresh}
          setRefresh={setRefresh}
        />
        <TableContainer>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            {listaProveedores && listaProveedores.length > 0 && (
              <ProviderTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={listaProveedores.length}
                isAdm={seccionesUser[0].id_rol === ID_ROL_ADM}
              />
            )}
            <TableBody>
              {proveedoresFiltrados && proveedoresFiltrados.length > 0 ? (
                stableSort(proveedoresFiltrados, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <ProviderListRow
                      
                        key={index}
                        row={row}
                        onProviderEdit={handleProviderEdit} 
                      />
                    );
                  })
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>No existen registros con ese filtro.</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {providersFetched ? 'No se existen Proveedores.' : 'Cargando Proveedores...'}
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
          count={listaProveedores.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openProviderDialog && <AddEditProvider open={openProviderDialog} onCloseDialog={handleCloseProviderDialog} />}
      {openViewDialog && <ProviderDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

    </div>
  );
};

export default ProviderModule;
