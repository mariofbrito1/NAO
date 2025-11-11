import React ,{useEffect, useState}from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Producto from './Producto';
import {logic_btn} from './logic.js'; 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({open, handleClose, onSave}) { 

  const [stateProd, setStateProd] = useState({});
  const [btn_enable, setBtnEnable] = useState(false);  
  const [resetFlag, setResetFlag] = useState(false); 

  useEffect(() => {
     
     setBtnEnable(logic_btn(stateProd));
  }, [stateProd]);


  const evaluate = () =>{
    //is ok save grava en instancia de producto
    onSave(stateProd);  
    setStateProd({});
    setResetFlag(true);
    setTimeout(() => setResetFlag(false), 100);
  }

  return (
    <React.Fragment>
     
      <Dialog
        open={open}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            width: '90vw',
            height: '85vh',
            margin: 0,
            maxWidth: 'none', // importante para permitir mayor tamaño
          },
        }}
      >
        <DialogTitle>Producto</DialogTitle>
        <DialogContent>
           <Producto stateProd={stateProd} setStateProd={setStateProd}  resetFlag={resetFlag}/>
        </DialogContent>
        <DialogActions>
          <Button 
            sx={{
               margin: '20px',
              background: '#f44336',
              borderColor: '#f44336',
              minWidth: '250px',
              height: '48px',
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#fc1100ff',
                color: '#fff',
                borderColor: '#f01202ff',
              },
          }}
          onClick={handleClose} 
          variant="contained">
            Cancelar
          </Button>
          <Button
            disabled={!btn_enable}  
            sx={{
                margin: '20px',
                minWidth: '250px',
                height: '48px',
                fontSize: '16px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#1404f0ff',
                  color: '#fff', 
                },
            }}
            onClick={()=>evaluate()} 
            variant="contained">Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}