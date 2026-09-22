import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Producto from './Producto';
import { logic_btn } from './logic.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, handleClose, onSave }) {
  const [stateProd, setStateProd] = useState({});
  const [btn_enable, setBtnEnable] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    setBtnEnable(logic_btn(stateProd));
  }, [stateProd]);

  const evaluate = () => {
    //is ok save grava en instancia de producto
    onSave(stateProd);
    setStateProd({});
    setResetFlag(true);
    setTimeout(() => setResetFlag(false), 100);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ style: { width: '90vw', height: '85vh', margin: 0, maxWidth: 'none' } }}>
        <DialogTitle>Producto Ingreso</DialogTitle>
        <DialogContent>
          <Producto stateProd={stateProd} setStateProd={setStateProd} resetFlag={resetFlag} />
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              margin: '20px',
              background: '#f44336',
              borderColor: '#f44336',
              minWidth: '250px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
            onClick={handleClose}
            variant="contained">
            Cancelar
          </Button>
          <Button
            disabled={!btn_enable}
            style={{ margin: '20px', minWidth: '250px', height: '48px', fontSize: '16px', fontWeight: 'bold' }}
            onClick={() => evaluate()}
            variant="contained">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
