import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import NextWeek from '@material-ui/icons/NextWeek';
import PropTypes from 'prop-types';
import { Button, Chip, InputLabel, Menu, MenuItem } from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Input from '@material-ui/core/Input';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'; 
import CmtSearch from '../../../../@coremat/CmtSearch';
import useStyles from './index.style';
import Checkbox from '@material-ui/core/Checkbox';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { read, utils } from 'xlsx';

const filterOptionsList = [
  { label: 'Activo', value: 'active' },
  
];

const OrderTableToolbar = ({
   
  data,
  setData,
  rowCount,
  filterOptions,
  setFilterOptions,
  searchTerm,
  setSearchTerm, 
  refresh,
  setRefresh,
}) => {
  const classes = useStyles();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const ID_ROL_ADM = 1;
  const { authUser } = useSelector(({ auth }) => auth);
  const seccionesUser = authUser?.secciones;
  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDeleteCLick = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseAlert = () => {
    setOpen(false);
  };

  /*const onProviderAddClick = () => {
    setOpen(true);
  };*/


  const onFilterOptionClick = option => {
    setFilterOptions(prevState => {
      if (prevState.includes(option.value)) {
        return prevState.filter(item => item !== option.value);
      } else {
        return [...prevState, option.value];
      }
    });
  };

  const onChipDelete = option => {
    setFilterOptions(filterOptions.filter(item => item !== option.value));
  };

  const DeleteIconComponent = () => {
    return (
      <>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={onDeleteCLick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <AddToCartIcon />
      </>
    );
  };

  const AddToCartIcon = () => {
    return (
      <>
        <Tooltip title="Add to cart">
          
          <IconButton aria-label="Add to cart" onClick={()=>{ }}>
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
          key={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleCloseAlert} severity="success">
           Pedido(s) agregado  
          </Alert>
        </Snackbar>
      </>
    );
  };
  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const onSearchChipDelete = () => setSearchTerm('');


  const handleImageChange = async event => {
    event.preventDefault();
    const file = await (await event.target.files[0]).arrayBuffer();
    if (file) {
      const wb = read(file);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = utils.sheet_to_json(ws);
      
    }
  };

  

  return (
    <React.Fragment>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: 0 > 0,
        })}> 
          <Typography className={classes.title} variant="h3" id="tableTitle" component="div" style={{marginTop: '20px' }}>
            <h3>Presupuestos</h3>
            <Chip style={{margin: '20px' }} icon={<NextWeek />} label={(rowCount!==1) ? rowCount+ ' Presupuestos' : rowCount+ ' Presupuesto'} />
            
          </Typography> 
          {(
            <React.Fragment>
              <CmtSearch onChange={onSearchChange} value={searchTerm} border={false} onlyIcon />
              <div className={classes.chipsRoot}>
                {searchTerm && <Chip label={searchTerm} onDelete={onSearchChipDelete} />}
                {filterOptionsList.map(
                  (option, index) =>
                    filterOptions.includes(option.value) && (
                      <Chip key={index} label={option.label} onDelete={() => onChipDelete(option)} />
                    )
                )}
              </div>
              <InputLabel htmlFor="upload-csv" style={{ cursor: 'pointer' }}>
                <Tooltip title="import xlsx/csv">
                  <InsertDriveFileIcon />
                </Tooltip>
              </InputLabel>
              <Input type="file" id="upload-csv" style={{ display: 'none' }} onChange={handleImageChange} />

              <Tooltip title="Filter list">
                <IconButton aria-label="filter list" onClick={handleClick}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              <Menu
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {filterOptionsList.map((option, index) => (
                  <MenuItem key={index} onClick={() => onFilterOptionClick(option)}>
                    <Checkbox
                      checked={filterOptions.includes(option.value)}
                      inputProps={{ 'aria-labelledby': option.label }}
                    />
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>
            </React.Fragment>
          )}
      </Toolbar>
    </React.Fragment>
  );
};

OrderTableToolbar.propTypes = {
  filterOptions: PropTypes.array,
  setFilterOptions: PropTypes.func,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func
};

export default React.memo(OrderTableToolbar);
