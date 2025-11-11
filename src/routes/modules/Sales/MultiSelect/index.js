/* eslint-disable react/react-in-jsx-scope */
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState, useEffect } from 'react';
import { getUsuarios } from 'redux/actions/Usuarios'; 
import { initPedidosTable } from 'redux/actions/Pedidos';

const SelectSales = ({ handleChange, handleChangeCenter }) => {
  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const { authUser } = useSelector(({ auth }) => auth);

  const classes = useStyles();
  const [user, setUser] = useState('');
  const dispatch = useDispatch();

  const { listaUsuarios = [] } = useSelector(state => state.usuarios);
  const { listaPedidos = [] } = useSelector(state => state.pedidos);

 

  const handleChangeUser = event => {
    handleChange(event.target.value);
    setUser(event.target.value);
  };

  
  const SelectUsers = ({  }) => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id="user">Usuarios</InputLabel>
        <Select labelId="user" value={user || ''} onChange={handleChangeUser}>
          <MenuItem value="-1">
            <em>None</em>
          </MenuItem>
          {listaUsuarios.map(usuario => {
            
              return (
                <MenuItem key={usuario.legajo} value={usuario.legajo}>
                  {usuario.nombre} {usuario.apellido}
                </MenuItem>
              ); 
            return null;
          })}
        </Select>
        <FormHelperText>Seleccione un usuario</FormHelperText>
      </FormControl>
    );
  };

   

  return (
    <>
    </>
  );
};

export default SelectSales;
