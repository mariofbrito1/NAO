import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import OrderListRow from './OrderListRow';
import OrderTableHead from './OrderTableHead';
import OrderTableToolbar from './OrderTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { getOrders } from '../../../redux/actions/Pedidos';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import DoubleScroll from './DoubleScroll';

const MaterialOrderList = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { authUser } = useSelector(({ auth }) => auth);
  const seccionesUser = authUser?.secciones || [];
  const { pedidos = [] } = useSelector(state => state.pedidos);

  const ID_ROL_ADM = 1;
  const idRol = seccionesUser?.[0]?.id_rol;

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ordersFetched, setOrdersFetched] = useState(false);
  const [isFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);

  const fetchPedidos = useCallback(() => {
    if (!idRol) {
      console.log('[MaterialOrderList] fetchPedidos cancelado: no hay idRol');
      return;
    }

    console.log('[MaterialOrderList] getOrders ->', {
      fecha: new Date().toISOString(),
      idRol,
    });

    dispatch(
      getOrders({
        id_rol: idRol,
      })
    );

    setOrdersFetched(true);
  }, [dispatch, idRol]);

  useEffect(() => {
    console.log('[MaterialOrderList] useEffect inicial/manual refresh', {
      idRol,
      refresh,
    });
    fetchPedidos();
  }, [fetchPedidos, refresh]);

  useEffect(() => {
    if (!idRol) return;

    console.log('[MaterialOrderList] iniciando intervalo de auto refresh cada 4s');

    const interval = setInterval(() => {
      console.log('[MaterialOrderList] auto refresh tick', new Date().toISOString());
      fetchPedidos();
    }, 4000);

    return () => {
      console.log('[MaterialOrderList] limpiando intervalo');
      clearInterval(interval);
    };
  }, [fetchPedidos, idRol]);

  useEffect(() => {
    console.log('[MaterialOrderList] pedidos actualizados en store -> cantidad:', pedidos.length);
    if (pedidos.length > 0) {
      console.log('[MaterialOrderList] primer pedido:', pedidos[0]);
    }
  }, [pedidos]);

  const pedidosCompras = pedidos.filter(
    p => p.espresupuesto !== true && p.idestadoproducto != 5 && p.idestadoproducto != 6
  );

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

  const listaPedidosFiltrados = pedidosCompras.filter(pedido => {
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
          rowCount={pedidosCompras.length}
          data={pedidosCompras}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          refresh={refresh}
          setRefresh={setRefresh}
        />

        <DoubleScroll>
          {(bottomRef, onBottomScroll) => (
            <TableContainer ref={bottomRef} onScroll={onBottomScroll} component="div" style={{ overflowX: 'auto' }}>
              <Table
                stickyHeader
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="sticky enhanced table"
                style={{ minWidth: 2500 }}>
                {pedidosCompras && pedidosCompras.length > 0 && (
                  <OrderTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={pedidosCompras.length}
                    isAdm={idRol === ID_ROL_ADM}
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
                            <OrderListRow key={row.id + '-' + index} row={row} mostrarEstadoPago={mostrarEstadoPago} />
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
        </DoubleScroll>

        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={pedidosCompras.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </div>
  );
};

export default MaterialOrderList;
