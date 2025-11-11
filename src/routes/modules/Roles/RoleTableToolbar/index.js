import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import useStyles from './index.style';
import React from 'react';

const RoleTableToolbar = ({
  
  onNewProfile,
  
}) => {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <Toolbar>
        <Typography className={classes.title} variant="h3" id="tableTitle" component="div">
          Listado de Roles del Sistema{'  '}         
        </Typography>
      </Toolbar>
      {/* 
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}>
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} Seleccionados
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
            Listado de Roles del Sistema{'  '}
            {/* 

            <Button color="primary" onClick={() => onNewProfile()}>
              Nuevo Rol
            </Button>
            
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={onDeleteCLick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <React.Fragment>
            <CmtSearch onChange={e => setSearchTerm(e.target.value)} value={searchTerm} border={false} onlyIcon />
            <div className={classes.chipsRoot}>
              {searchTerm && <Chip label={searchTerm} onDelete={onSearchChipDelete} />}
              {filterOptionsList.map(
                (option, index) =>
                  filterOptions.includes(option.value) && (
                    <Chip key={index} label={option.label} onDelete={() => onChipDelete(option)} />
                  ),
              )}
            </div>
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

      <ConfirmDialog
        open={openConfirmDialog}
        title={`Eliminar Roles`}
        content={'Esta seguro de que desea eliminar los roles seleccionados?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />*/}
    </React.Fragment>
  );
};

RoleTableToolbar.propTypes = {
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  filterOptions: PropTypes.array,
  setFilterOptions: PropTypes.func,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  onUserAdd: PropTypes.func,
};

export default React.memo(RoleTableToolbar);
