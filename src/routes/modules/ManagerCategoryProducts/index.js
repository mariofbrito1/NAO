import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import CategoryListRow from './CategoryListRow';
import CategoryTableHead from './CategoryTableHead';
import CategoryTableToolbar from './CategoryTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch } from 'react-redux';
import { deleteCategoryProduct, getCategoryProduct } from '../../../redux/actions/Benefits';
import AddEditCategory from './AddEditManagerCategory/index';
import ConfirmDialog from '../../../@jumbo/components/Common/ConfirmDialog';
import useStyles from './index.style';
import CategoryDetailView from './CategoryDetailView';
import NoRecordFound from './NoRecordFound';

const ManagerCategoryModule = ({ history }) => {
  const classes = useStyles();
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ name: '' });
  const [categorysFetched, setCategorysFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  ////////////////////////////////

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getCategoryProduct(data => {
        //console.log('GET CAT PRODUCT', data);
        setCategorys(data);
      }),
    );
  }, [dispatch]);

  const [categorys, setCategorys] = useState([]);

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    // dispatch(setCurrentCategory(null));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = categorys.map(n => n.id);
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

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    //dispatch(setCurrentCategory(null));
  };

  const handleCategoryEdit = category => {
    localStorage.setItem('categoryproductedit', 'true');
    localStorage.setItem('categoryproduct', JSON.stringify(category));
    history.push('/products/management_category/add');
  };

  const handleCategoryDelete = category => {
    setSelectedCategory(category);
    setOpenConfirmDialog(true);
    localStorage.setItem('categoriesproductDelete', category.id);
  };

  const onCategoryAdd = () => {
    //console.log('oncategoryadd');
    localStorage.setItem('categoryproductedit', 'false');
    localStorage.setItem('categoryproduct', '');
    history.push('/products/management_category/add');
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    const id = window.localStorage.getItem('categoriesproductDelete');
    //console.log('id', id);
    localStorage.setItem('categoriesproductDelete', '');
    dispatch(
      deleteCategoryProduct({ id: id }, data => {
        //console.log('Return delete', data);
        let dato = categorys.filter(d => d.id !== data);
        //console.log('dato-->', dato);
        setCategorys(dato);
      }),
    );
  };

  const handleCancelDelete = () => {
    localStorage.setItem('categoriesproductDelete', '');
    setOpenConfirmDialog(false);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CategoryTableToolbar
          selected={selected}
          setSelected={setSelected}
          onCategoryAdd={setOpenCategoryDialog}
          onNewCategory={onCategoryAdd}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          data={categorys}
          setData={setCategorys}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <CategoryTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={categorys.length}
            />
            <TableBody>
              {!!categorys.length ? (
                stableSort(categorys, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <CategoryListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onCategoryEdit={handleCategoryEdit}
                      onCategoryDelete={handleCategoryDelete}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 8 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>No existen registros con ese filtro.</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {categorysFetched ? 'Categorías no encontradas.' : 'Cargando Categorías...'}
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
          count={categorys.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openCategoryDialog && <AddEditCategory open={openCategoryDialog} onCloseDialog={handleCloseCategoryDialog} />}
      {openViewDialog && <CategoryDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

      <ConfirmDialog
        open={openConfirmDialog}
        title={`Confirma Eliminar Categoría ${selectedCategory.name}`}
        content={'Está seguro de que quiere eliminar esta categoría?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ManagerCategoryModule;
