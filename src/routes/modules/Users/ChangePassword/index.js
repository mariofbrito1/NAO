import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { changePassword } from 'redux/actions/Usuarios';

export default function FormChangePassword({open, setOpen}) {

  const [formReset, setFormReset] = React.useState({
    email: '',
    password: '',
    repeatPassword: '',
    restaurar:true
  });

  const dispactch = useDispatch();
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    dispactch(changePassword(formReset))
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form id='changePassword' onSubmit={e => handleChangePassword(e)}>
        <DialogTitle id="form-dialog-title">Cambio de contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Se requiere que la contraseña deba tener al menos 6 caracteres, una letra mayúscula, una minúscula y un número.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            value={formReset.email}
            required
            onChange={e => setFormReset({...formReset, email: e.target.value})}
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Nueva contraseña"
            type="password"
            value={formReset.password}
            onChange={e => setFormReset({...formReset, password: e.target.value})}
            required
            inputProps={{minlength: 6}}
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="confirm-password"
            label="Confirmar contraseña"
            type="password"
            value={formReset.repeatPassword}
            onChange={e => setFormReset({...formReset, repeatPassword: e.target.value})}
            required
            inputProps={{minlength: 6}}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button type='submit' color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
