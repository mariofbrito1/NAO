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

export const setLimiteCompra = (limiteCompra) => {
  return {
    type: SET_LIMITE_COMPRA,
    payload: limiteCompra,
  };
};
export const setLimiteCantidad = (limiteCantidad) => {
  return {
    type: SET_LIMITE_CANTIDAD,
    payload: limiteCantidad,
  };
};

export const agregarProducto = producto => ({
  type: AGREGAR_PRODUCTO,
  payload: producto
});

export const eliminarProducto = id => ({
  type: ELIMINAR_PRODUCTO,
  payload: id
});

export const modificarProducto = producto => ({
  type: MODIFICAR_PRODUCTO,
  payload: producto
});

export const vaciarCarrito = id => ({
  type: VACIAR_CARRITO,
  payload: id
});

export const sumarCantidad = producto => ({
  type: SUMAR_CANTIDAD,
  payload: producto
});

export const restarCantidad = producto => ({
  type: RESTAR_CANTIDAD,
  payload: producto
});

