import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  icon: {
    fontSize: 100,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  message: {
    marginBottom: theme.spacing(4),
  },
  button: {
    textTransform: 'none',
  },
}));

const Error403 = () => {
  const classes = useStyles();
  const history = useHistory();


  return (
    <Box className={classes.root}>
      <LockIcon className={classes.icon} />
      <Typography variant="h5" className={classes.message}>
        Acceso no autorizado
      </Typography>
      <Typography variant="body1" align="center">
        Lo siento, no tienes permiso para acceder a esta página.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        style={{margin: "10px"}}
        onClick={() => {
            history.push('/signin');        
        }}
      >
        Volver
      </Button>
    </Box>
  );
};

export default Error403;
