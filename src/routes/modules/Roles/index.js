import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import RoleListRow from './RoleListRow';
import RoleTableHead from './RoleTableHead';
import RoleTableToolbar from './RoleTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch } from 'react-redux';
import { getProfiles, deleteBulkProfiles } from '../../../redux/actions/Users';
import AddEditRol from './AddEditRol/index';
import ConfirmDialog from '../../../@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import ProfileDetailView from './ProfileDetailView';
import NoRecordFound from './NoRecordFound';

const RolesModule = ({ history }) => {
  const classes = useStyles();

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({ name: '' });
  const [profilesFetched, setProfilesFetched] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [profiles, setProfiles] = useState([]);
  ////////////////////////////////

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProfiles(filterOptions, debouncedSearchTerm, data => {
        setProfiles(data);
        setProfilesFetched(true);
      })
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  const handleCloseProfileDialog = () => {
    setOpenProfileDialog(false);
    // dispatch(setCurrentProfile(null));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = profiles.map(n => n.id);
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
    //dispatch(setCurrentProfile(null));
  };

  const handleProfileEdit = profile => {
    history.push(`/user/roles/${profile.id}`);
    setOpenProfileDialog(true);
  };

  const handleProfileDelete = profile => {
    setSelectedProfile(profile);
    setOpenConfirmDialog(true);
    localStorage.setItem('rolDelete', profile.id);
  };

  /*   const handleProfileAddPermission = profile => {
    localStorage.setItem('permissionprofileedit', 'true');
    localStorage.setItem('permissionprofile', JSON.stringify(profile));
    history.push('/user/roles/add');
  }; */

  const onProfileAdd = () => {
    localStorage.setItem('permissionprofileedit', 'false');
    localStorage.setItem('permissionprofile', '');
    history.push('/user/roles/add');
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    const name = window.localStorage.getItem('rolDelete');
    localStorage.setItem('rolDelete', '');
    dispatch(
      deleteBulkProfiles({ name: name }, data => {
        /* const dato = profiles.filter(d => d.name !== name);
        setProfiles(dato); */
        dispatch(
          getProfiles(filterOptions, debouncedSearchTerm, data => {
            setProfiles(data);
          })
        );
      })
    );
  };

  const handleCancelDelete = () => {
    localStorage.setItem('rolDelete', '');
    setOpenConfirmDialog(false);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <RoleTableToolbar
          selected={selected}
          setSelected={setSelected}
          onProfileAdd={setOpenProfileDialog}
          onNewProfile={onProfileAdd}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          data={profiles}
          setData={setProfiles}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <RoleTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={profiles.length}
            />
            <TableBody>
              {profiles.length ? (
                stableSort(profiles, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <RoleListRow
                      key={index}
                      row={row}
                      onProfileEdit={handleProfileEdit}
                      onRowClick={handleRowClick}
                      onProfileDelete={handleProfileDelete}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>No existen registros con ese filtro.</NoRecordFound>
                    ) : (
                      <NoRecordFound>{profilesFetched ? 'Roles no encontrados.' : 'Cargando Roles...'}</NoRecordFound>
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
          count={profiles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openProfileDialog && <AddEditRol open={openProfileDialog} onCloseDialog={handleCloseProfileDialog} />}
      {openViewDialog && <ProfileDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

      <ConfirmDialog
        open={openConfirmDialog}
        title={`Confirma Eliminar Rol ${selectedProfile.nombre}`}
        content={'Está seguro de que quiere eliminar este rol?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default RolesModule;
