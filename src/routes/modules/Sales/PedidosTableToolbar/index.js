import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Grid, Chip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { ExportToExcel } from './listExport';
import useStyles from './index.style';
import moment from 'moment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InputLabel from '@material-ui/core/InputLabel';

const PedidosTableToolbar = ({ Data, DataStock, setOpen = () => {}, FechasCierre }) => {
  const classes = useStyles();
  const cerrarPeriodo = () => {
    setOpen(true);
  };

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h3" id="tableTitle" component="div">
        Listado de Pedidos
        <Grid>
          {FechasCierre && (
            <Grid item xs={12} align="right" style={{ marginTop: '15px', background: '#fafafa' }}>
              <Chip
                color="secondary"
                size="medium"
                style={{ margin: '5px', padding: '10px' }}
                label={'Fecha Inicio: ' + moment(FechasCierre.fecha_inicio).format('DD/MM/YYYY')}
              />
              <Chip
                color="secondary"
                size="medium"
                style={{ margin: '5px', padding: '10px' }}
                label={'Fecha Fin: ' + moment(FechasCierre.fecha_fin).format('DD/MM/YYYY')}
              />
              <Button
                color="secondary"
                type="containded"
                style={{ marginLeft: '15px', padding: '10px' }}
                startIcon={<AssignmentIcon />}
                onClick={() => cerrarPeriodo()}>
                Modificar Período
              </Button>
            </Grid>
          )}
          <Grid item xs={12} align="left">
            {Data && (
              <ExportToExcel
                title={'exportar pedidos'}
                apiData={Data}
                fileName={'venta_personal_' + moment(new Date()).format('ddDD-MM-YYYY-hh-mm-ss')}
              />
            )}
            {DataStock && (
              <ExportToExcel
                title={'exportar stock'}
                apiData={DataStock}
                fileName={'stock' + moment(new Date()).format('ddDD-MM-YYYY-hh-mm-ss')}
              />
            )}
          </Grid>
        </Grid>
      </Typography>
    </Toolbar>
  );
};

export default React.memo(PedidosTableToolbar);
