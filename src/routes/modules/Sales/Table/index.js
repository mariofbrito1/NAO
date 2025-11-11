/* eslint-disable react/react-in-jsx-scope */
// imports REAC y definidos a REAC
import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// resto librerias no propias Material UI
import { Card, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

// LIB componentes propios y estilos etc
import { makeStyles } from '@material-ui/core/styles';
import SelectSales from '../MultiSelect';
import PedidosTableToolbar from '../PedidosTableToolbar';
import NoRecordFound from '../NoRecordFound';
import {
  initPedidosTable,
  initPedidosDetalleTable,
  initPedidosStock,
  cerrarPeriodo,
  getPedidosById,
  initFechasCierre,
} from 'redux/actions/Pedidos'; 
//import { parsePedidos, parsePedidosStock } from './util';
import StateListRow from './ListRow';
import DialogSelect from './DialogSelect';
import DialogDetail from './DialogDetail';
import { parsePedidos } from './util';
import Auth from 'redux/reducers/Auth';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(1),
    height: theme.spacing(1),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  table: {
    minWidth: 750,
    size: 'small',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const TableSales = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { authUser } = useSelector(({ auth }) => auth);

  const MySwal = withReactContent(Swal);

  const sweetAlerts = () => {
    MySwal.fire({
      icon: 'success',
      timer: 4000,
      timerProgressBar: true,
      title: 'Excelente!',
      text: 'El Período fue cerrado correctamente',
    });
  };

  const [data_export, setDataExport] = useState([]);
  const [data_export_stock, setDataExportStock] = useState(null);

  const { loading = false } = useSelector(state => state.common);
  const { listaPedidos = [] } = useSelector(state => state.pedidos); 
  const { listaPedidosDetalles = [] } = useSelector(state => state.pedidos);
  const { listaPedidosDetallesFromID = [] } = useSelector(state => state.pedidos);
  const { listaPedidosStock = [] } = useSelector(state => state.pedidos);
  const { fechasCierre = [] } = useSelector(state => state.pedidos);

  /// Filters ///
  const [user, setUser] = useState([]); 
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const init = (isUpdateClosePeriod = false) => {
    // dispatch init services
    isUpdateClosePeriod && sweetAlerts();   
  };

  useEffect(() => {
    init();
  }, [dispatch, user, authUser]);

  useEffect(() => {
    //console.log("listaPedidosStock->", listaPedidosStock);
    if (listaPedidosStock && listaPedidosStock.length > 0) setDataExportStock(listaPedidosStock);
  }, [listaPedidosStock]);

  useEffect(() => {
 
    if (listaPedidosDetalles && listaPedidosDetalles.length > 0) {
      parsePedidos(listaPedidosDetalles).then(res => {
        setDataExport(res);
      });
    }
  }, [listaPedidosDetalles]);

  useEffect(() => {
    //console.log("listaPedidosStock->", data_export_stock);
  }, [data_export_stock]);

   

  const restart_data = () => { 
  };

  const onSuccess = () => {
    init(true);
  };

  const actionCerrarPeriodo = fec => {
    dispatch(
      cerrarPeriodo(fec, data => {
        init();
      })
    );
  };

  const viewDetail = () => {
    setOpenDetail(true);
  };

  const getDetailProd = id => {
    dispatch(getPedidosById(id, viewDetail));
  };

  const setCierre = data => { 
  };

  ///////////////

  return (
    <>
      <PedidosTableToolbar
        setOpen={setOpen}
        Data={data_export}
        DataStock={data_export_stock}
        FechasCierre={fechasCierre[0]}
      />
      {listaPedidos && listaPedidos.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#Id Pedido</TableCell>
                <TableCell align="center">Usuario</TableCell>
                <TableCell align="center">Legajo</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Contacto</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Peso Total (kg)</TableCell>
                <TableCell align="center">Precio Total</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
                <TableCell align="center">Detalle</TableCell>
              </TableRow>
            </TableHead>
            {listaPedidos.map(row => (
              <StateListRow row={row} state={row.estado} getDetail={getDetailProd} restart_data={restart_data} />
            ))}
          </Table>
        </TableContainer>
      ) : (
        <TableRow style={{ height: '400px' }}>
          <TableCell colSpan={12} rowSpan={12}>
            <Card>
              <NoRecordFound>{loading ? 'Buscando pedidos...' : 'Actualmente no hay pedidos generados'}</NoRecordFound>
            </Card>
          </TableCell>
        </TableRow>
      )}
      {fechasCierre.length > 0 && (
        <DialogSelect
          setOpenExt={setOpen}
          setCierre={setCierre}
          open={open}
          actionCerrarPeriodo={actionCerrarPeriodo}
          FechasCierre={fechasCierre[0]}
        />
      )}
      <DialogDetail lista={listaPedidosDetallesFromID} setOpen={setOpenDetail} open={openDetail} />
    </>
  );
};

export default memo(TableSales);
