import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Chip,
    InputLabel,
    Select
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { setStatePedidos } from 'redux/actions/Pedidos';

const MaxWidthDialog = ({ open, setOpen, row, estado, restart_data}) => {
    const dispatch = useDispatch();

    const [estados, setEstados] = React.useState(estado);

    /*
    5	"Iniciado"
    4	 "Entregado"
    3	"Rechazado"
    2	"En proceso"
    1	"Pendiente"
    0	 "Aprobado"
    */

    const onSuccess = () => restart_data();

    const saveState = () =>{
        console.log("save state", estados , 'in: ', row);
        let st=5;
        switch (estados) {
            case "Iniciado":
                st=5;
                break;
            case "Entregado":
                st=4;
                break;
            case "Rechazado":
                st=3;
                break;
            case "En proceso":
                st=2
                break;
            case "Pendiente":
                st=1;
                break;
            case "Aprobado":
                st=0;
                break;
            default:
                break;
        }
        const obj = {id: row.id, id_estado: st};
        dispatch(setStatePedidos(obj, onSuccess));
    }

    return (
            <>
            {estado &&
                <Dialog
                    fullWidth={false}
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <DialogTitle>Cambio de Estado</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ marginTop:'10px'}}>
                            Seleccione el Estado del Pedido ID:
                            <Chip style={{ marginLeft:'10px'}} color='primary' label={ row.id} />
                        </DialogContentText>
                        <div
                            // noValidate
                            // component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                            }}
                        >
                            <FormControl sx={{mt: 2, minWidth: 120}}>
                                <InputLabel htmlFor="max-width">Estados</InputLabel>
                                <Select
                                    autoFocus
                                    style={{ marginLeft:'10px',  marginRight:'10px' , marginBottom:'10px', width:'250px'}}
                                    value={estados}
                                    onChange={(event) => setEstados(event.target.value)}
                                    label="Estados"
                                    inputProps={{
                                        name: 'max-width',
                                        id: 'max-width',
                                    }}
                                >
                                    <MenuItem value="Iniciado">Iniciado</MenuItem>
                                    <MenuItem value="En proceso">En proceso</MenuItem>
                                    <MenuItem value="Aprobado">Aprobado</MenuItem>
                                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                                    <MenuItem value="Rechazado">Rechazado</MenuItem>
                                    <MenuItem value="Entregado">Entregado</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {saveState(); setOpen(false)}}>Aceptar</Button>
                        <Button onClick={() => setOpen(false)}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
            }
            </>
    );
};

export default MaxWidthDialog;