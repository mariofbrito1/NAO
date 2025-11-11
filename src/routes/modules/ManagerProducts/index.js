import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Table, TableCell, TableContainer, TableRow, TextField } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import ProductListRow from './ProductListRow';
import ProductTableHead from './ProductTableHead';
import ProductTableToolbar from './ProductTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch } from 'react-redux';
import { getProductos } from '../../../redux/actions/Productos';
import AddEditProduct from './AddEditManagerProducts/index';
import useStyles from './index.style';
import ProductDetailView from './ProductDetailView';
import NoRecordFound from './NoRecordFound';
import { deleteProduct } from '../../../redux/actions/Productos';

const ProductModule = ({ history }) => {
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
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [productsFetched, setProductFetched] = useState(false);
  const [isFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);
  ////////////////////////////////

  const dispatch = useDispatch();
  const { listaProductos = [] } = useSelector(state => state.productos); 

  useEffect(() => {
    dispatch(getProductos({
      id_rol: seccionesUser[0].id_rol
    }));
    setProductFetched(true);
  }, [dispatch, refresh]);



  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
    // dispatch(setCurrentProduct(null));
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
    //dispatch(setCurrentProduct(null));
  };


  const handleProductEdit = product => { 
    localStorage.setItem('productedit', 'true');
    localStorage.setItem('product', JSON.stringify(product));
    history.push(`/products/products/${product.id}`);
  };

  const handleProductDelete = id => {  
     dispatch(
          deleteProduct(id, () => {
            history.push('/products/products/');
          })
      );
  };

  const onProductAdd = () => {
    history.push('/products/products/add');
  }; 
   

  const productosFiltrados = listaProductos;
  
  /*
  ACA HACERE EL FILTRO GPT
  listaProductos.filter((producto) =>
    {
       producto.id = producto.id;//producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) 
    }
  );*/

  


  return (
    <div className={classes.root} style={{ padding: '10xp' }}>
      <Paper className={classes.paper}>
        <ProductTableToolbar
          onProductAdd={setOpenProductDialog}
          onNewProduct={onProductAdd}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          rowCount={listaProductos.length}
          data={listaProductos}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm} 
          refresh={refresh}
          setRefresh={setRefresh}
        />
        <TableContainer>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            {listaProductos && listaProductos.length > 0 && (
              <ProductTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={(listaProductos && listaProductos.length)?listaProductos.length:0}
                isAdm={seccionesUser[0].id_rol === ID_ROL_ADM}
              />
            )}
            <TableBody>
              {productosFiltrados && productosFiltrados.length > 0 ? (
                stableSort(productosFiltrados, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <ProductListRow
                      
                        key={index}
                        row={row}
                        onProductEdit={handleProductEdit}
                        onProductDelete={handleProductDelete}
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
                        {productsFetched ? 'No se existen Productos.' : 'Cargando Productos...'}
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
          count={listaProductos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openProductDialog && <AddEditProduct open={openProductDialog} onCloseDialog={handleCloseProductDialog} />}
      {openViewDialog && <ProductDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

    </div>
  );
};

export default ProductModule;
