import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard';
import { useDispatch } from 'react-redux';
import { addCategory, updateCategory } from '../../../../redux/actions/Benefits';
import Header from './Header';
import { Avatar, Chip, Button, TextField, FormControlLabel, Switch } from '@material-ui/core';

///////////////////////////

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  pageFull: {
    width: '100%',
  },
  CategorySidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  CategoryMainContent: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
}));

const CategoryAdd = () => {
  const history = useHistory();
  const classes = useStyles();
  const [tabValue, setTabValue] = useState('');

  const [category, setCategory] = useState({
    id: null,
    name: '',
    description: '',
    enabled: false,
  });

  const { id, name, description, enabled } = category;

  useEffect(() => {
    //console.log("CAT st", category)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  /////// setup EDIT //////////

  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const isEdit = localStorage.getItem('categoryedit');
    console.log('isEdit', isEdit);
    setIsEdit(isEdit === 'true');
  }, []);

  useEffect(() => {
    //console.log("is edit cat", isEdit);

    if (isEdit) {
      const cat = localStorage.getItem('category');
      const objC = JSON.parse(cat);
      console.log('IS EDIT->', objC);
      setCategory(objC);
    }
  }, [isEdit]);

  /////////////////////

  const perfilDetail = {
    name: 'Categorías',
    location: '/benefits/management_category/add',
    category_pic: '/images/auth/benefits.png',
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const dispatch = useDispatch();

  /////////////////////////////////////
  const onCreateCategory = () => {
    dispatch(
      addCategory(category, data => {
        history.push('/benefits/management_category');
      }),
    );
  };

  const onUpdateCategory = () => {
    dispatch(
      updateCategory(category, data => {
        history.push('/benefits/management_category');
      }),
    );
  };

  const [checked, setChecked] = React.useState(false);
  const toggleChecked = () => {
    setChecked(prev => !prev);
  };

  return (
    <React.Fragment>
      {true && (
        <Box className={classes.pageFull}>
          <Header classes={classes} tabValue={tabValue} perfilDetail={perfilDetail} handleTabChange={handleTabChange} />
          <GridContainer>
            <Grid item xs={12} lg={12} className={classes.BenefitSidebar}>
              <Box mb={12}>
                <CmtCard>
                  <CmtCardHeader title={isEdit ? 'Edición de Categoría' : 'Nueva Categoría'} />
                  <CmtCardContent>
                    <form className={classes.root} noValidate autoComplete="off">
                      <Grid container spacing={2}>
                        {isEdit && (
                          <Grid item xs={12} style={{ margin: '10px' }}>
                            <Chip avatar={<Avatar>#</Avatar>} color="secondary" label={id} />
                          </Grid>
                        )}
                        <Grid item xs={3}>
                          <TextField
                            value={name}
                            onChange={ev => {
                              setCategory({ ...category, name: ev.target.value });
                            }}
                            label="Categoría"
                          />
                        </Grid>
                        {false && (
                          <Grid item xs={9} style={{ marginTop: '10px' }}>
                            <FormControlLabel
                              control={<Switch value={enabled} checked={checked} onChange={toggleChecked} />}
                              label="Activada"
                            />
                          </Grid>
                        )}
                      </Grid>
                      {false && (
                        <Grid item xs={12} lg={12} styles={{ margin: '30px' }}>
                          <TextField
                            multiline
                            value={description}
                            label="Descripcion"
                            variant="outlined"
                            rows={4}
                            placeholder="Ingrese Texto"
                            minRows={3}
                            onChange={ev => {
                              setCategory({ ...category, description: ev.target.value });
                            }}
                            style={{ width: '250px', marginTop: '30px' }}
                          />
                        </Grid>
                      )}
                      <Grid item xs={12} lg={12} style={{ marginTop: '40px' }}>
                        <Button onClick={isEdit ? onUpdateCategory : onCreateCategory} variant="contained" color="primary">
                          Aceptar
                        </Button>
                      </Grid>
                    </form>
                  </CmtCardContent>
                </CmtCard>
              </Box>
            </Grid>
          </GridContainer>
        </Box>
      )}
    </React.Fragment>
  );
};

export default CategoryAdd;
