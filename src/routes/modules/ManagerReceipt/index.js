import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import ReceiptListRow from './ReceiptListRow';
import ReceiptTableHead from './ReceiptTableHead';
import ReceiptTableToolbar from './ReceiptTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch } from 'react-redux';
import { getReceipts } from '../../../redux/actions/Receipts';
import AddEditReceip from './AddEditManagerReceipt/index';
import useStyles from './index.style';
import ReceipDetailView from './ReceiptDetailView';
import NoRecordFound from './NoRecordFound';

import { DialogPrint } from '../Ingreso/DialogPrint';
 

const ReceiptModule = ({ history }) => {
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
  const [openReceipDialog, setOpenReceiptDialog] = useState(false);
  const [receiptsFetched, setReceiptFetched] = useState(false);
  const [isFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);
  ////////////////////////////////

  const dispatch = useDispatch();
  
  const { receipts: listaRecibos  = [] } = useSelector(state => state.receipts); 

  useEffect(() => {
    dispatch(getReceipts());
    setReceiptFetched(true);
  }, [dispatch, refresh]);  
  

  const handleCloseReceipDialog = () => {
    setOpenReceiptDialog(false);
    // dispatch(setCurrentReceip(null));
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
    //dispatch(setCurrentReceip(null));
  }; 

  const handleReceiptEdit = r => { 
    localStorage.setItem('receiptedit', 'true');
    localStorage.setItem('receipt', JSON.stringify(r));
    history.push(`/receipt/receipt/${r.idrecibo}`);
  };  

  const onReceiptAdd = () => {
    history.push('/receipt/receipt/add');
  }; 

  const handleReceiptPrint = data => { 
      setPrintData(data);
  };  



  const recibosFiltrados = listaRecibos.filter(pedido => {
    if (!searchTerm || !pedido) return true;
    
    const term = searchTerm.toLowerCase();

    return (
      pedido.id?.toString().includes(term) ||
      (pedido.nombre?.toLowerCase() || '').includes(term) ||
      (pedido.idrecibo?.toString() || '').includes(term) ||
      (pedido.celular?.toString() || '').includes(term)  
    );

  });


  /*
  * Recibos 
  */
  const [openRecibo, setOpenRecibo] = useState(false); 
  const [printData, setPrintData] = useState(null);


  useEffect(() => {
    if(printData){
      setOpenRecibo(true);
    }
  }, [printData, setPrintData]); 


  const setFlagClosed =()=>{
    setPrintData(null);
  }


  return (
        <>
          <div className={classes.root} style={{ padding: '10xp' }}>
            <Paper className={classes.paper}>
              <ReceiptTableToolbar
                onReceiptAdd={setOpenReceiptDialog}
                onNewReceipt={onReceiptAdd}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                rowCount={(listaRecibos && listaRecibos.length)?listaRecibos.length:0}
                data={listaRecibos}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} 
                refresh={refresh}
                setRefresh={setRefresh}
              />
              <TableContainer>
                <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
                  {listaRecibos && listaRecibos.length > 0 && (
                    <ReceiptTableHead
                      classes={classes}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={listaRecibos.length}
                      isAdm={seccionesUser[0].id_rol === ID_ROL_ADM}
                    />
                  )}
                  <TableBody>
                    {recibosFiltrados && recibosFiltrados.length > 0 ? (
                      stableSort(recibosFiltrados, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          return (
                            <ReceiptListRow
                            
                              key={index}
                              row={row}
                              onReceiptEdit={handleReceiptEdit}
                              onReceiptPrint={handleReceiptPrint}  
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
                              {receiptsFetched ? 'No se existen Recibos.' : 'Cargando Recibos...'}
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
                count={listaRecibos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </Paper>

            {openReceipDialog && <AddEditReceip open={openReceipDialog} onCloseDialog={handleCloseReceipDialog} />}
            {openViewDialog && <ReceipDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

          </div>

          <DialogPrint pedidoGuardado={printData} setOpenRecibo={setOpenRecibo}  openRecibo={openRecibo} setFlagClosed={setFlagClosed}/>

        </>
    );
};

export default ReceiptModule;
