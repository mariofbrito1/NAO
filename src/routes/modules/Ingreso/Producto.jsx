 
import React ,{useState, useEffect} from 'react'; 
import {  Switch , FormControlLabel,  TextField } from '@material-ui/core'; 
import { useDispatch, useSelector } from 'react-redux';
 

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl'; 
import Box from '@material-ui/core/Box';
import {logicLevels} from './logic.js'; 
 
 
import { getColores, getLineas, getTipoAberturas, getTipoMaterial,  getMaterial } from '../../../redux/actions/Ingreso'; 

const Producto = ({ stateProd ,setStateProd, resetFlag }) => {

  const [level, setLevel] = useState({ 
    levelOne: false,
    levelTwo: false,
    levelThree: false,
    levelFour: false,
    levelFive: false,
  });

  
  const [modena_selected, setModena] = useState(false); 
  const [aT_selected, setAT] = useState(false); 
  const [fabricacionSelect, setFabricacionSelect] = useState(false); 
  const [manoSelect, setManoSelect] = useState(false); 
  const [generalAMedida, setGeneralAMedida] = useState(false);   


  const {  levelOne, levelTwo, levelThree, levelFour, levelFive} = level;

  ///////////////////////////////////

  const dispatch = useDispatch();

  const { 
          materiales = [],
          tipos_material = [],
          lineas = [],
          tipos_aberturas = [], 
          colores =  [], 
  } = useSelector(state => state.ingreso);  

  const [product, setProduct] = useState(stateProd || {}); 

  const handleProductChange = event => {
    const { name, value } = event.target; 
    if (name === 'idmaterial') {
      const materialSeleccionado = materiales.find(mat => mat.id === parseInt(value));  
      console.log("materialSeleccionado", materialSeleccionado);
      setProduct(prev => ({
        ...prev,
        [name]: value,
        cantidad: 1, 
        subtotal: (materialSeleccionado && materialSeleccionado.precio)? materialSeleccionado.precio : 0, 
        descripcion: materialSeleccionado ? materialSeleccionado.descripcion : '',
        image: (materialSeleccionado && materialSeleccionado.image)? materialSeleccionado.image : null, 
      }));
    } else {
      // Para otros campos normales aca borrar cuando sea necesario
      setProduct(prev => ({
        ...prev,
        [name]: value,
      }));
    }

    //aca vamos a lanzar las limpiezas dependiendo el name del objeto que lanzo el cambio
  };
  
  useEffect(() => {
     dispatch(getMaterial());
      dispatch(getTipoMaterial());
       dispatch(getLineas());
        dispatch(getTipoAberturas());
         dispatch(getColores()); 
  }, [ ])

  useEffect(() => {
    setProduct({});
    setModena(false); 
    setAT(false); 
    setFabricacionSelect(false); 
    setManoSelect(false); 
    setGeneralAMedida(false);   
  }, [ resetFlag ])


  //EFECTOS//
   

  // Sincronizamos cualquier cambio en `product` hacia `stateProd`
  useEffect(() => {
    if (product) {
      setStateProd(prev => ({
        ...prev,
        ...product,
      }));

      // Solo llamamos a lógica de niveles si hay un idmaterial o idtipomaterial
      if (product.idmaterial || product.idtipomaterial) {
        logicLevels(product, level, setLevel, setModena, setAT, setFabricacionSelect, setManoSelect, setGeneralAMedida);
      }
    }
  }, [product]);
  
  
  // Limpieza automática de campos cuando cambia el tipo de material
  useEffect(() => {
    setGeneralAMedida(false);
    if (product.idtipomaterial) {
      setProduct(prev => ({
        ...prev,
        idlinea: null,
        idtipoabertura: null,
        es_a_medida: null,
        es_a_medida_at: null,
        es_a_medida_modena: null,
        alto: '',
        ancho: '', 
        con_colocacion: false,
        con_premarco: false,
        con_contramarco: false,
        con_mosquitero: false,
        con_reja: false,
        con_persiana: false,
        mano: false,
        idcolor: null, 
      }));

        // Finalmente seteamos todo de una vez
      setLevel({ ...level,  
                    levelOne: false,
                    levelTwo: false,
                    levelThree: false,
                    levelFour: false,
                    levelFive: false, 
              }); 
    }
  }, [product.idtipomaterial]);
  
  // Limpieza automática de campos cuando cambia el tipo de material
  useEffect(() => {
    setGeneralAMedida(false);
    if (product.idtipomaterial) {
      setProduct(prev => ({
        ...prev,
        idtipomaterial: null,
        idlinea: null,
        idtipoabertura: null,
        es_a_medida: null,
        es_a_medida_at: null,
        es_a_medida_modena: null,
        alto: '',
        ancho: '', 
        con_colocacion: false,
        con_premarco: false,
        con_contramarco: false,
        con_mosquitero: false,
        con_reja: false,
        con_persiana: false,
        mano: false,
        idcolor: null, 
      }));
    }
  }, [product.idmaterial]);

  useEffect(() => {
    if (product.idtipomaterial) {
      setProduct(prev => ({
        ...prev,
        idtipoabertura: null,
        es_a_medida: null,
        es_a_medida_at: null,
        es_a_medida_modena: null,
        alto: '',
        ancho: '', 
        con_colocacion: false,
        con_premarco: false,
        con_contramarco: false,
        con_mosquitero: false,
        con_reja: false,
        con_persiana: false,
        mano: false,
        idcolor: null, 
      }));
    }
  }, [product.idlinea]);

  useEffect(() => {
    if (product.idtipomaterial) {
      setProduct(prev => ({
        ...prev, 
        es_a_medida: null,
        es_a_medida_at: null,
        es_a_medida_modena: null,
        alto: '',
        ancho: '', 
        con_colocacion: false,
        con_premarco: false,
        con_contramarco: false,
        con_mosquitero: false,
        con_reja: false,
        con_persiana: false,
        mano: false,
        idcolor: null, 
      }));
    }
  }, [product.idtipoabertura ]);

  useEffect(() => { 
     
    if (product.es_a_medida_modena == true) {
      setGeneralAMedida(true);
      setProduct(prev => ({
        ...prev, 
        es_a_medida: null,
        es_a_medida_at: null,  
      }));
    }
  }, [product.es_a_medida_modena ]);

  useEffect(() => {
    if (product.es_es_a_medida_at == true) {
      setGeneralAMedida(true);
      setProduct(prev => ({
        ...prev, 
        es_a_medida: null,
        es_a_medida_modena: null,  
      }));
    }
  }, [product.es_a_medida_at ]);

  useEffect(() => {
    if (product.es_a_medida == true) {
      setGeneralAMedida(true);
      setProduct(prev => ({
        ...prev, 
        es_a_medida_modena: null,
        es_a_medida_at: null,  
      }));
    }
  }, [product.es_a_medida ]);


  
   

 
  return (
          <>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={6} md={6}>
                <Box px={10} mb={3}> {/* Esto agrega un margen inferior de 24px */}
                <FormControl fullWidth required>
                   
                  <InputLabel id="prod-select-label">Producto</InputLabel>
                    <Select
                      labelId="material-select-label"
                      name="idmaterial"
                      value={product.idmaterial || ''}
                      onChange={handleProductChange}
                    >
                    {materiales.map((el) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el.descripcion}
                      </MenuItem>
                      ))
                    }
                  </Select> 
                </FormControl>
                </Box> 
              </Grid> 

              <Grid item xs={0} sm={6} md={6}> 
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Box px={10} mb={3}> {/* Esto agrega un margen inferior de 24px */}
                <FormControl fullWidth required>
                   
                    <InputLabel id="tipo-select-label">Tipo Material</InputLabel>
                    <Select
                      labelId="tipo-material-select-label"
                      name="idtipomaterial"
                      value={product.idtipomaterial || ''}
                      onChange={handleProductChange}
                    >
                    {tipos_material && tipos_material.map((el) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el.descripcion}
                      </MenuItem>
                      ))
                    }
                  </Select> 
                </FormControl>
                </Box> 
              </Grid> 
              { levelOne &&
                <>
                <Grid item xs={12} sm={6} md={6}>
                  <Box px={10} mb={3}> {/* Esto agrega un margen inferior de 24px */}
                  <FormControl fullWidth required>
                    
                      <InputLabel id="lineas-select-label">Lineas</InputLabel>
                      <Select
                        labelId="lineas-material-select-label"
                        name="idlinea"
                        value={product.idlinea || ''}
                        onChange={handleProductChange}
                      >
                      {lineas && lineas.map((el) => (
                        <MenuItem key={el.id} value={el.id}>
                          {el.descripcion}
                        </MenuItem>
                        ))
                      }
                    </Select> 
                  </FormControl>
                  </Box> 
                </Grid> 

                { modena_selected   &&
                 <>
                  <Grid item xs={6} sm={6} md={6}>
                    <Box px={10} mb={3}>
                      <FormControl fullWidth required>
                        <InputLabel id="es_a_medida_mod-select-label">Selecion de Compra o Fabricación</InputLabel>
                        <Select
                          labelId="es_a_medida_mod-select-label"
                          name="es_a_medida_modena"
                          value={product.es_a_medida_modena ?? ''} // Evita que sea undefined
                          onChange={handleProductChange}
                        >
                          <MenuItem value={true}>A Medida Modena</MenuItem>
                          <MenuItem value={false}>ListadoModena</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}></Grid>
                 </>
                }

                { aT_selected   &&
                 <>
                  <Grid item xs={6} sm={6} md={6}>
                      <Box px={10} mb={3}>
                        <FormControl fullWidth required>
                          <InputLabel id="es_a_medida-at-select-label">Selecion de Compra o Fabricación</InputLabel>
                          <Select
                            labelId="es_a_medida-at-select-label"
                            name="es_a_medida_at"
                            value={product.es_a_medida_at ?? ''}  
                            onChange={handleProductChange}
                          >
                            <MenuItem value={true}>A Medida A30</MenuItem>
                            <MenuItem value={false}>Listado A30</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}></Grid>
                 </>
                }  

                { levelTwo   &&
                  <>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box px={10} mb={3}> {/* Esto agrega un margen inferior de 24px */}
                    <FormControl fullWidth required>
                      
                        <InputLabel id="tipo-select-label">Tipo Aberturas</InputLabel>
                        <Select
                          labelId="tipo-ab-select-label"
                          name="idtipoabertura"
                          value={product.idtipoabertura || ''}
                          onChange={handleProductChange}
                        >
                        {tipos_aberturas.map((el) => (
                          <MenuItem key={el.id} value={el.id}>
                            {el.descripcion}
                          </MenuItem>
                          ))
                        }
                      </Select> 
                    </FormControl>
                    </Box> 
                  </Grid> 

                  <Grid item xs={12} sm={6} md={6}>
                    <Box px={10} mb={3}>
                      {fabricacionSelect &&
                        <FormControl fullWidth required>
                          <InputLabel id="es_a_medida-select-label">Selecion de Compra o Fabricación</InputLabel>
                          <Select
                            labelId="es_a_medida-select-label"
                            name="es_a_medida"
                            value={product.es_a_medida ?? ''} // Evita que sea undefined
                            onChange={handleProductChange}
                          >
                            <MenuItem value={true}>A Medida</MenuItem>
                            <MenuItem value={false}>Listado Herrero</MenuItem>
                          </Select>
                        </FormControl>
                      }
                    </Box>
                  </Grid>  
                </>
                }
                </>
              }
              
              { generalAMedida &&
                <>  
                  <Grid item xs={12} sm={6} md={6}>
                    <Box px={10} mb={3}> {/* Esto agrega un margen inferior de 24px */}
                      <FormControl fullWidth > 
                        <InputLabel id="color-select-label">Colores</InputLabel>
                          <Select
                            labelId="color-select-label"
                            name="idcolor"
                            value={product.idcolor || ''}
                            onChange={handleProductChange}
                          >
                            {colores.map((el) => (
                              <MenuItem key={el.id} value={el.id}>
                                {el.descripcion}
                                </MenuItem>
                              ))
                            }
                          </Select> 
                      </FormControl>
                    </Box> 
                  </Grid> 
        
                  <Grid item xs={0} sm={6} md={6}>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Box px={10} mt={3}>
                      <p><b> Mediddas </b></p>
                    </Box>
                  </Grid> 

                  <Grid item xs={12} sm={6} md={6}>
                    <Box px={10} mb={10}> 
                      <TextField
                        fullWidth
                        label="Ancho"
                        name="ancho"
                        value={product.ancho || ''}
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          // Solo permitir números y decimales
                          if (/^\d*\.?\d*$/.test(value)) {
                            handleProductChange(e);
                          }
                        }} 
                        required
                      />
                    </Box>
                  </Grid>  

                  <Grid item xs={12} sm={6} md={6}>
                    <Box px={10} mb={10}> 
                      <TextField
                        fullWidth
                        label="Alto"
                        name="alto"
                        value={product.alto || ''}
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          // Solo permitir números y decimales
                          if (/^\d*\.?\d*$/.test(value)) {
                            handleProductChange(e);
                          }
                        }} 
                        required
                      />
                    </Box>
                  </Grid>   
                      
                  <Grid item xs={12} sm={2} md={2}>
                    <Box px={10} mb={3}>
                      <Box mb={2}>
                        <p><b>Premarco</b></p>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={!!product.con_premarco} // asegúrate que sea booleano
                            onChange={(e) =>
                              setProduct((prev) => ({
                                ...prev,
                                con_premarco: e.target.checked,
                              }))
                            }
                            name="con_premarco"
                            color="primary"
                          />
                        }
                        label={product.con_premarco ? 'Con Premarco' : 'Sin Premarco'}
                      />
                    </Box>
                  </Grid>    

                  <Grid item xs={12} sm={2} md={2}>
                    <Box px={10} mb={3}>
                      <Box mb={2}>
                        <p><b> Contramarco </b></p>
                        </Box>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={!!product.con_contramarco} // asegúrate que sea booleano
                                onChange={(e) =>
                                  setProduct((prev) => ({
                                    ...prev,
                                    con_contramarco: e.target.checked,
                                  }))
                                }
                                name="con_contramarco"
                                color="primary"
                              />
                            }
                            label={product.con_contramarco ? 'Con Contramarco' : 'Sin Contramarco'}
                          />
                        </Box>
                  </Grid>

                  <Grid item xs={12} sm={2} md={2}>
                    { manoSelect   &&
                    <Box px={10} mb={3}>
                      <Box mb={2}>
                        <p><b>Mano de la Abertura</b></p>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={!!product.mano} // asegúrate que sea booleano
                            onChange={(e) =>
                              setProduct((prev) => ({
                                ...prev,
                                mano: e.target.checked,
                              }))
                            }
                            name="con_mano"
                            color="primary"
                          />
                        }
                        label={product.mano ? 'Derecha' : 'Izquierda'}
                      />
                    </Box>
                    }
                  </Grid> 

                  <Grid item xs={12} sm={2} md={2}>
                    <Box px={10} mb={3}>
                      <Box mb={2}>
                        <p><b>Mosquitero</b></p>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={!!product.con_mosquitero} // asegúrate que sea booleano
                            onChange={(e) =>
                              setProduct((prev) => ({
                                ...prev,
                                con_mosquitero: e.target.checked,
                              }))
                            }
                            name="con_mosquitero"
                            color="primary"
                          />
                        }
                        label={product.con_mosquitero ? 'Con Mosquitero' : 'Sin Mosquitero'}
                      />
                    </Box>
                  </Grid>    

                  <Grid item xs={12} sm={2} md={2}>
                    <Box px={10} mb={3}>
                      <Box mb={2}>
                        <p><b> Persiana </b></p>
                        </Box>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={!!product.con_persiana} // asegúrate que sea booleano
                                onChange={(e) =>
                                  setProduct((prev) => ({
                                    ...prev,
                                    con_persiana: e.target.checked,
                                  }))
                                }
                                name="con_persiana"
                                color="primary"
                              />
                            }
                            label={product.con_persiana ? 'Con Persiana' : 'Sin Persiana'}
                          />
                        </Box>
                  </Grid>    
                  <Grid item xs={12} sm={2} md={2}>
                    <Box px={10} mb={3}>
                      <Box mb={2}>
                        <p><b> Reja </b></p>
                        </Box>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={!!product.con_reja} // asegúrate que sea booleano
                                onChange={(e) =>
                                  setProduct((prev) => ({
                                    ...prev,
                                    con_reja: e.target.checked,
                                  }))
                                }
                                name="con_reja"
                                color="primary"
                              />
                            }
                            label={product.con_reja ? 'Con Reja' : 'Sin Reja'}
                          />
                        </Box>
                  </Grid>    
                </>
              }  
              
              <Grid item xs={12}>
                <Box px={10} mb={3}>
                  <TextField
                    label="Observaciones"
                    name="observaciones"
                    value={product.observaciones || ''}
                    onChange={handleProductChange}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                  />
                </Box>
              </Grid>  

              <Grid item xs={12} sm={6} md={6}>
                <Box px={10} mb={3}>
                  <Box>
                    <p><b>Instalación</b></p>
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!product.con_colocacion} // asegúrate que sea booleano
                        onChange={(e) =>
                          setProduct((prev) => ({
                            ...prev,
                            con_colocacion: e.target.checked,
                          }))
                        }
                        name="con_colocacion"
                        color="primary"
                      />
                    }
                    label={product.con_colocacion ? 'Con Colocación' : 'Sin Colocación'}
                  />
                </Box>
              </Grid> 

              <Grid item xs={12} sm={3} md={3}>
                <Box px={10} mb={3}>
                   <Box>
                    <p><b>Unidades</b></p>
                  </Box>
                  <TextField
                    fullWidth
                    label="Cantidad"
                    name="cantidad"
                    value={product.cantidad || ''}
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      // Solo permitir números y decimales
                      if (/^\d*\.?\d*$/.test(value)) {
                        handleProductChange(e);
                      }
                    }}  
                    required
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <Box px={10} mb={3}>
                   <Box>
                    <p><b>Sub Total</b></p>
                  </Box>
                  <TextField
                    fullWidth
                    label="$"
                    name="subtotal"
                    value={product.subtotal || ''}
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      // Solo permitir números y decimales
                      if (/^\d*\.?\d*$/.test(value)) {
                        handleProductChange(e);
                      }
                    }} 
                    required
                  />
                </Box>
              </Grid>    

              <Grid item xs={12} sm={6} md={6}>
                <Box px={10} mb={3}>
                </Box>
              </Grid>   
            </Grid>
          </>
        )
  }

export default Producto
