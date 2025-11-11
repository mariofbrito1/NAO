import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Box } from '@material-ui/core';
import AssignmentIcon from '@mui/icons-material/Assignment';
import moment from 'moment';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 350,
  },
}));

export default function DialogSelect({ setOpenExt, open, actionCerrarPeriodo, FechasCierre, setCierre = () => {} }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpenExt(false);
  };

  const [fec, setfechas] = useState({
    fecha_fin: null,
    fecha_inicio: null, 
  });

  useEffect(() => {
    console.log('FechasCierre', FechasCierre);
    if (FechasCierre) {
      setfechas({
        ...fec,
        fecha_fin: moment(FechasCierre.fecha_fin).format('YYYY-MM-DD'),
        fecha_inicio: moment(FechasCierre.fecha_inicio).format('YYYY-MM-DD'), 
      });
    }
  }, [FechasCierre]);

   

  const handleAccept = () => {
    actionCerrarPeriodo(fec);
    setOpenExt(false);
  };

  const onChange = event => {
    const name = event.target.name;
    const { value } = event.target;
    if (name === 'fecha_inicio') setfechas({ ...fec, fecha_inicio: value });
    else setfechas({ ...fec, fecha_fin: value });
  };

  return (
    <Box>
      {fec && (
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <Grid container spacing={0}>
            <Grid item xs={4} style={{ marginTop: '20px', marginBottom: '10px', marginRight: '5px' }} align="right">
              <AssignmentIcon style={{ color: 'primary' }} />
            </Grid>
            <Grid item xs={7} style={{ marginTop: '20px', marginBottom: '10px', marginleft: '10px' }} align="left">
              <h3>Modificar de Período</h3>
            </Grid>
          </Grid>
         
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Fecha de Inicio"
                  name="fecha_inicio"
                  type="date"
                  value={fec.fecha_inicio}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Fecha de Cierre"
                  type="date"
                  name="fecha_fin"
                  value={fec.fecha_fin}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAccept} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

DialogSelect.propTypes = {
  open: PropTypes.bool,
  actionCerrarPeriodo: PropTypes.func,
  setOpenExt: PropTypes.func,
};
