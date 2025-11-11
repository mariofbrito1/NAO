import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {
  AGREGAR_PRODUCTO,
  ELIMINAR_PRODUCTO,
  MODIFICAR_PRODUCTO,
  VACIAR_CARRITO,
  SUMAR_CANTIDAD,
  RESTAR_CANTIDAD,
  SET_LIMITE_COMPRA,
  SET_LIMITE_CANTIDAD
} from "@jumbo/constants/ActionTypes";
const INIT_STATE = {
  carrito: [],
  totalCarrito: parseFloat(0),
  limiteCompra: 0,
  limiteCantidad: 0,
};


const MySwal = withReactContent(Swal);

const sweetAlerts = () => {
    MySwal.fire({
      timerProgressBar: true,
      timer: 3000,
      position: 'top-end',
      title: 'El Producto ya existe',
      text: 'Sume en el Carrito de Compras en caso de querer agregar más cantidad',
    });
};

const sweetAlertsError = () => {
  MySwal.fire({
    timer: 3000,
    position: 'top-end',
    timerProgressBar: true,
    text: 'El producto seleccionado supera el monto límite mensual para su compra',
  });
};


const carritoReducer = (state = INIT_STATE, action) => {

  let sku;
  let desc='';
  let kilogramos;
  let precioSinIVA;
  let cantidadAgregar;
  let unidad;
  let iva;
  let FactorSumaIVA;
  let precioConIVA;
  let subtotalAnterior;

  switch (action.type) {

    case SET_LIMITE_COMPRA:
      return {
        ...state,
        limiteCompra: action.payload,
      };
    case SET_LIMITE_CANTIDAD:
      return {
        ...state,
        limiteCantidad: action.payload,
      };

    case AGREGAR_PRODUCTO:
      console.log("pay", action.payload[8]);
      
      let opc = action.payload[8];
      let de = action.payload[2];
      kilogramos = parseFloat(action.payload[6]);
      precioSinIVA = parseFloat(action.payload[3]);
      cantidadAgregar = parseFloat(action.payload[4]);
      unidad = parseFloat(action.payload[6]);
      iva = parseFloat(action.payload[7]);
      desc = parseFloat(action.payload[8]);
      FactorSumaIVA = iva*precioSinIVA;
      precioConIVA =  ((FactorSumaIVA + precioSinIVA) * ((unidad===0)?1:unidad)).toFixed(2);
      const prod_ = precioConIVA * cantidadAgregar;
    // verifcacion si el producto ya existe en el carrito
      const productoExistente = state.carrito.find(item => item[1] === sku);
      if (productoExistente) {
        sweetAlerts();
        //alert("El producto ya existe en carrito");
        return state;
      }
      // calculo el nuevo total del carrito con el producto que se va a agregat
      console.log("limites", nuevoTotalCarritoAgregar ,"<", prod_);
      const nuevoTotalCarritoAgregar = parseFloat(state.totalCarrito) + prod_;
      const limiteCompraAgregar = state.limiteCompra;
      console.log("limites", nuevoTotalCarritoAgregar ,"<", limiteCompraAgregar);
      if (nuevoTotalCarritoAgregar <= limiteCompraAgregar) {
        const nuevoProducto = {
          ...action.payload,
          2: (opc && opc.length>1)?opc:de,
          6: kilogramos !== 0 ? kilogramos : 0,
          7: prod_.toFixed(2),
          8: iva
        };

        console.log("nuevo prod", nuevoProducto)
     
        return {
          ...state,
          carrito: [...state.carrito, nuevoProducto],
          totalCarrito: (parseFloat(state.totalCarrito) + parseFloat(precioConIVA)).toFixed(2),
        };
     
      } else {
        sweetAlertsError();
        //alert("El producto seleccionado supera el monto límite mensual");
        return state;
      }


    case ELIMINAR_PRODUCTO:
      const productoEliminado = state.carrito.find(producto => producto[1] === action.payload);
      const precioProductoEliminado = parseInt(productoEliminado[3]);

      return {
        ...state,
        carrito: state.carrito.filter(producto => producto[1] !== action.payload),
        totalCarrito: state.totalCarrito - precioProductoEliminado,
      };

    case MODIFICAR_PRODUCTO:
      const productoModificado = state.carrito.find(item => item[1] === action.payload[1]);
      const precioProductoModificado = (productoModificado[6] !== 0 ? productoModificado[6] * parseFloat(productoModificado[3]) : parseFloat(productoModificado[3]));
      const nuevoTotalCarritoModificar = parseFloat(state.totalCarrito) + precioProductoModificado;
      const limiteCompraModificar = state.limiteCompra;
      const cantidadModificada = state.carrito.map(item => item[4] - 1);
      let carritoActualizado = [...state.carrito];

      if (nuevoTotalCarritoModificar > limiteCompraModificar) {
        alert("El producto seleccionado supera el límite mensual para compra");
        const indexProductoModificado = carritoActualizado.findIndex(item => item[1] === action.payload[1]);

        if (indexProductoModificado !== -1) {
          carritoActualizado[indexProductoModificado][4] = cantidadModificada[indexProductoModificado];
          const item6 = parseFloat(action.payload[6]);
          if (item6 !== 0) {
            carritoActualizado[indexProductoModificado][7] = (item6 * precioProductoModificado).toFixed(4);
          } else {
            carritoActualizado[indexProductoModificado][7] = (action.payload[4] * precioProductoModificado).toFixed(4);
          }
        }

        return {
          ...state,
          carrito: carritoActualizado,
        };
      } else {
        carritoActualizado = carritoActualizado.map(item => {
          if (item[1] === action.payload[1]) {
            return {
              ...item,
              4: action.payload[4],
              6: (item[6]),
              7: ((parseFloat(action.payload[6]) !== 0) ? (parseFloat(action.payload[6] * action.payload[4]) * parseFloat(action.payload[3])) : (action.payload[4] * action.payload[3])).toFixed(4),
            };
          }
          return item;
        });

        return {
          ...state,
          carrito: carritoActualizado,
          totalCarrito: parseFloat(nuevoTotalCarritoModificar).toFixed(4),
        };
      };

    case SUMAR_CANTIDAD:
      const productoSumarCantidad = state.carrito.find(item => item[1] === action.payload.sku);
      precioSinIVA = parseFloat(productoSumarCantidad[3]);
      cantidadAgregar = parseFloat(productoSumarCantidad[4]);
      unidad = parseFloat(productoSumarCantidad[6]);
      iva = parseFloat(productoSumarCantidad[8]);
      FactorSumaIVA = iva*precioSinIVA;
      precioConIVA = parseFloat((FactorSumaIVA + precioSinIVA) * ((unidad===0)?1:unidad));
      const totalCarrito= parseFloat(state.totalCarrito) + parseFloat(precioConIVA);
      // se elimina cantidad cantidadAgregar + 1 < parseFloat(state.limiteCantidad) && 
      if(totalCarrito < parseFloat(state.limiteCompra) ){
        return {
          ...state,        
          totalCarrito: (parseFloat(state.totalCarrito) + precioConIVA).toFixed(2),
          carrito: state.carrito.map(item => {
            if (item[1] === action.payload.sku) {
              return {
                ...item,
                4: cantidadAgregar + 1,
                7: (cantidadAgregar + 1) * parseFloat(precioConIVA),
              };
            }
            return item;
          }),
        };
      }else{
        sweetAlertsError();
        //alert("El producto seleccionado supera la cantidad o el monto límite mensual para la compra");
        return state;
      }

    case RESTAR_CANTIDAD:
      const prod = state.carrito.find(item => item[1] === action.payload.sku);
      precioSinIVA = parseFloat(prod[3]);
      const cantidad = parseFloat(prod[4]);
      unidad = parseFloat(prod[6]);
      iva = parseFloat(prod[8]);
      FactorSumaIVA = iva*precioSinIVA;
      precioConIVA = parseFloat((FactorSumaIVA + precioSinIVA) * ((unidad===0)?1:unidad));
      const cantidadRestada = cantidad - 1;
      subtotalAnterior = parseFloat(prod[7]).toFixed(2);
      const subtotalDiferencia = subtotalAnterior - precioConIVA;
      const nuevoTotalCarritoRestar = parseFloat(state.totalCarrito) - precioConIVA;
      if (cantidadRestada === 0) {
        return {
          ...state,
          carrito: state.carrito.filter(item => item[1] !== action.payload.sku),
          totalCarrito: nuevoTotalCarritoRestar.toFixed(2),
        };
      } else {
        return {
          ...state,
          carrito: state.carrito.map(item => {
            if (item[1] === action.payload.sku) {
              return {
                ...item,
                4: cantidadRestada,
                6: unidad,
                7: subtotalDiferencia,
              };
            }
            return item;
          }),
          totalCarrito: nuevoTotalCarritoRestar.toFixed(2),
        };
      }


    case VACIAR_CARRITO:
      return {
        ...INIT_STATE,
      };

    default:
      return state;
  }
};

export default carritoReducer;
