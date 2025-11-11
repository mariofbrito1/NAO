import React from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

import useStyles from './index.style';

const UserTableToolbar = ({ onUserNew }) => {
  const classes = useStyles();

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h3" id="tableTitle" component="div">
        Listado de Usuarios o Personal{' '}
        {
          <>
            <Button style={{ marginLeft: '10px', marginRight: '10px' }} color="primary" onClick={() => onUserNew()}>
              Nuevo Usuario
            </Button> 
          </>
        }
      </Typography>
    </Toolbar>
  );
};

UserTableToolbar.propTypes = {
  onUserNew: PropTypes.func.isRequired,
};

export default React.memo(UserTableToolbar);
