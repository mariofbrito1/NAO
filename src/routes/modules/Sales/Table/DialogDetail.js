import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box ,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

export default function DialogSelect({ lista, setOpen ,open}) {

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Productos Detalle</DialogTitle>
        <DialogContent>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">SKU</TableCell>
                <TableCell align="center">Detalle</TableCell>
                <TableCell align="center">Id Material</TableCell>
                <TableCell align="center">Cantidad</TableCell>
               
              </TableRow>
            </TableHead>
            {
             lista.map(row => (
                <TableRow>
                  <TableCell align="center">
                    <Typography align="center" className={classes.titleRoot} component="div" variant="h4">
                      <h2>{parseInt(row.sku)}</h2>
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography align="center" className={classes.titleRoot} component="div" variant="h4">
                      {row.descripcion}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography align="center" className={classes.titleRoot} component="div" variant="h4">
                      {row.id_material}
                    </Typography>
                  </TableCell>
                  <TableCell  align="center">
                    <Typography align="center" className={classes.titleRoot} component="div" variant="h4">
                      {row.cantidad}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            }
          </Table>
        </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

DialogSelect.propTypes = {
  open: PropTypes.bool, 
  actionCerrarPeriodo: PropTypes.func,
  setOpenExt: PropTypes.func
}
