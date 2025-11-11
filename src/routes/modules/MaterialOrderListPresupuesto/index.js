import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import OrderListRow from './OrderListRow';
import OrderTableHead from './OrderTableHead';
import OrderTableToolbar from './OrderTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch } from 'react-redux';
 import { getOrders } from '../../../redux/actions/Pedidos'; 
import useStyles from './index.style'; 
import NoRecordFound from './NoRecordFound';
import ScrollSyncWrapper from './ScrollSyncWrapper';
import DoubleScroll from './DoubleScroll';
 

const MaterialOrderListPresupuesto = ({ history }) => {
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
  const [ordersFetched, setOrdersFetched] = useState(false);
  const [isFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);
  ////////////////////////////////

  const dispatch = useDispatch();
  
  const { pedidos  = [] } = useSelector(state => state.pedidos);

  

  // Filtrar para que solo muestre los presupuestos
  const pedidosPresupuestos = pedidos.filter(p => p.espresupuesto === true ||  p.idestadoproducto == 5 || p.idestadoproducto == 6); 
 

  useEffect(() => {
    dispatch(getOrders({
      id_rol: seccionesUser[0].id_rol
    }));
    setOrdersFetched(true);
  }, [dispatch, refresh]); 
 

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

   

   
  
  const listaPedidosFiltrados = pedidosPresupuestos.filter(pedido => {
  if (!searchTerm) return true;
  const term = searchTerm.toLowerCase();

  return (
    pedido.id.toString().includes(term) ||
    (pedido.nombre?.toLowerCase() || '').includes(term) ||
    (pedido.proveedor?.toLowerCase() || '').includes(term) ||
    (pedido.celular?.toString() || '').includes(term) ||
    (pedido.producto?.toLowerCase() || '').includes(term)
  );
});



  return (
    <div className={classes.root} style={{ padding: '10xp' }}>
      <Paper className={classes.paper}>
        <OrderTableToolbar 
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          rowCount={pedidosPresupuestos.length}
          data={pedidosPresupuestos}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm} 
          refresh={refresh}
          setRefresh={setRefresh}
        />
        <DoubleScroll>
        {(bottomRef, onBottomScroll) => (
          <TableContainer
            ref={bottomRef}                 // << aquí el ref correcto
            onScroll={onBottomScroll}       // << sincroniza con la barra de arriba
            component="div"                 // asegura un elemento DOM directo
            style={{ overflowX: "auto" }}   // habilita scroll horizontal
          >
            <Table
              stickyHeader
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="sticky enhanced table"
              style={{ minWidth: 2500 }}    // fuerza ancho > contenedor para que exista el scroll
            >
              {pedidosPresupuestos && pedidosPresupuestos.length > 0 && (
                <OrderTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={pedidosPresupuestos.length}
                  isAdm={seccionesUser[0].id_rol === ID_ROL_ADM}
                />
              )}
              <TableBody>
              {listaPedidosFiltrados && listaPedidosFiltrados.length > 0 ? (
                (() => {
                  const idsMostrados = new Set();

                  return stableSort(listaPedidosFiltrados, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const mostrarEstadoPago = !idsMostrados.has(row.id);
                      if (mostrarEstadoPago) idsMostrados.add(row.id);

                      return (
                        <OrderListRow
                          key={row.id + '-' + index}
                          row={row}
                          mostrarEstadoPago={mostrarEstadoPago}  // <-- PASÁ LA PROPIEDAD ACÁ
                        />
                      );
                    });
                })()
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>No existen registros con ese filtro.</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {ordersFetched ? 'No se existen Pedidos.' : 'Cargando Pedidos...'}
                      </NoRecordFound>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            </Table>
          </TableContainer>

        )}
        </  DoubleScroll>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={pedidosPresupuestos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper> 
    </div>
  );
};

export default MaterialOrderListPresupuesto;
