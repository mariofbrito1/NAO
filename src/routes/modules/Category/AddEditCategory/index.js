import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addCategoria, editCategoria, getCategoriaById } from '../../../../redux/actions/Categorias';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  profileMainContent: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {},
}));

const AddEditCategory = () => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  const perfilDetail = {
    name: 'Categoria',
    location: id !== 'add' ? '/user/categoria/edit' : '/user/categoria/add',
    profile_pic: '/images/auth/profile.png',
  };
  // categoria
  const [categoriaState, setCategoriaState] = useState({
    id: null,
    descripcion: '',
    monto_max: '',
    cantidad_max: '',
    fecha_cierre: null,
  });

  const { categoria = null } = useSelector(state => state.categorias);

  const [tabValue, setTabValue] = useState('');
  const [selectedDate, setSelectedDate] = useState();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeDataPicker = date => {
    setSelectedDate(date);
    setCategoriaState({ ...categoriaState, fecha_cierre: date });
  };

  const handleChange = event => {
    setCategoriaState({ ...categoriaState, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (id !== 'add') dispatch(getCategoriaById(id));
  }, [dispatch]);

  useEffect(() => {
    if (categoria) {
      const auxCategoria = Object.values(categoria)[0];
      const formatDate = moment(auxCategoria?.fecha_cierre).format('DD/MM/YYYY');
      setCategoriaState({ ...auxCategoria, fecha_cierre: formatDate });
      setSelectedDate(auxCategoria?.fecha_cierre);
    }
    if (id === 'add') {
      setCategoriaState({
        id: null,
        descripcion: '',
        monto_max: '',
        cantidad_max: '',
        fecha_cierre: null,
      });
      setSelectedDate(null);
    }
  }, [categoria, id]);

  const onUpdateCategoria = event => {
    event.preventDefault();
    let convertToDate = moment(selectedDate).toDate();
    const updateCategory = { ...categoriaState, fecha_cierre: convertToDate };
    dispatch(editCategoria(updateCategory, () => history.push('/user/categoria')));
  };

  const onCreateCategoria = event => {
    event.preventDefault();
    dispatch(addCategoria(categoriaState, () => history.push('/user/categoria')));
  };

  return (
    <React.Fragment>
      <Box className={classes.pageFull}>
        <Header classes={classes} tabValue={tabValue} perfilDetail={perfilDetail} handleTabChange={handleTabChange} />
        <GridContainer>
          <Grid item xs={12} lg={12} className={classes.profileSidebar}>
            <Box mb={12}>
              <CmtCard>
                <CmtCardHeader title={id !== 'add' ? 'Editar Categoría' : 'Nueva Categoría'} />
                <CmtCardContent>
                  <form
                    className={classes.root}
                    onSubmit={e => (id !== 'add' ? onUpdateCategoria(e) : onCreateCategoria(e))}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          name="descripcion"
                          label="Nombre de Categoría"
                          required
                          fullWidth
                          onChange={handleChange}
                          value={categoriaState.descripcion || ''}
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          name="monto_max"
                          label="Monto máximo"
                          required
                          fullWidth
                          onChange={handleChange}
                          value={categoriaState.monto_max || ''}
                        />
                      </Grid>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12} lg={6}>
                          <KeyboardDatePicker
                            disableToolbar
                            clearable
                            variant="dialog"
                            cancellabel="Cancelar"
                            oklabel="Aceptar"
                            fullWidth
                            name="fecha_cierre"
                            format="dd/MM/yyyy"
                            label="Fecha de cierre"
                            value={selectedDate || null}
                            onChange={handleChangeDataPicker}
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid
                      container
                      columns={12}
                      spacing={3}
                      style={{
                        marginTop: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <Grid item>
                        <Button
                          type="button"
                          variant="contained"
                          color="secondary"
                          onClick={() => history.push('/user/categoria')}>
                          Cancelar
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button type="submit" variant="contained" color="primary">
                          Aceptar
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CmtCardContent>
              </CmtCard>
            </Box>
          </Grid>
        </GridContainer>
      </Box>
    </React.Fragment>
  );
};

export default AddEditCategory;
