import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Common from './Common';
import Auth from './Auth';
import Usuarios from './Usuarios';
import Roles from './Roles'; 
import Proveedores from './Proveedores'; 
import Receipts from './Receipts'; 
import Productos from './Productos'; 
import Secciones from './Secciones';
import Sectores from './Sectores';
import Carrito from './Cart'; 
import Pedidos from './Pedidos';
import Ingreso from './Ingreso';

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
    usuarios: Usuarios,
    roles: Roles,  
    productos: Productos,
    providers: Proveedores,
    provider: Proveedores,
    receipts: Receipts,
    secciones: Secciones,
    sectores: Sectores,
    carrito: Carrito,
    pedidos: Pedidos,
    pedido: Pedidos,  
    ingreso: Ingreso,
  });
