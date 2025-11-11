import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { tieneAccesoASeccion, typeSection } from '../@jumbo/utils/UserAdmin';
//import SamplePage from './Pages/SamplePage';
import Dash from './Dashboards/Crm';
import Error403 from './Pages/403';
import Login from './Auth/Login';
import ForgotPasswordPage from './Auth/ForgotPassword';
import ResetPasswordPage from './Auth/ResetPassword';
import Users from './modules/Users';
import UsersAdd from './modules/Users/AddEditUser';
import Roles from './modules/Roles';
import AddEditRol from './modules/Roles/AddEditRol'; 

import Sections from './modules/Sections';
import SectionsAdd from './modules/Sections/AddEditSection';

import ManagerProductAdd from './modules/ManagerProducts/AddEditManagerProducts';
import ManagerProducts from './modules/ManagerProducts';

import ManagerProviderAdd from './modules/ManagerProviders/AddEditManagerProvider';
import ManagerProviders from './modules/ManagerProviders';

import ManagerReceiptAdd from './modules/ManagerReceipt/AddEditManagerReceipt';
import ManagerReceipt from './modules/ManagerReceipt';

import { useHistory } from 'react-router-dom'; 
import MaterialOrderList from './modules/MaterialOrderList';  
import MaterialOrderListPresupuesto from './modules/MaterialOrderListPresupuesto';  

import Ingreso from './modules/Ingreso';

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();
  const history = useHistory();

  const [seccion, setSecciones] = useState({
    ADMIN: false,
    VENTAS: false, 
    FABRICA: false,
    USUARIOS: false, 
  });

  const {ADMIN, VENTAS, FABRICA, USUARIOS} = seccion;

  const seccionesUser = authUser?.secciones;

  useEffect(() => {
    setSecciones({
      ...seccion,
      ADMIN: tieneAccesoASeccion(seccionesUser, typeSection.ADMIN), 
      VENTAS: tieneAccesoASeccion(seccionesUser, typeSection.VENTAS), 
      FABRICA: tieneAccesoASeccion(seccionesUser, typeSection.FABRICA),  
      USUARIOS: tieneAccesoASeccion(seccionesUser, typeSection.USUARIOS), 
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
 

  const onLogoutClick = () => {
    history.push('/signup');
    window.location.reload(true);
  };

  if (location.pathname === '' || (location.pathname === '/' && !authUser)) {
    return <Redirect to={'/signin'} />;
  } else if (authUser?.changePassword) {
    onLogoutClick();
    return;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/dash'} />;
  }

  //MARIO BRITO CAMBIAR PARA PROD

  return (
    <React.Fragment>
      <Switch>
       
        <Route path="/signin" component={Login} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/reset-password" component={ResetPasswordPage} /> 
       
        
        
        { ADMIN   && <Route path="/dash" component={Dash} />  } 
        
        { (ADMIN || VENTAS) && <Route path="/create_orders" component={Ingreso} /> } 
        
      
        { (ADMIN || FABRICA || VENTAS ) && <Route exact path="/orders/list_orders" component={MaterialOrderList} /> }
        { ADMIN  && <Route exact path="/orders/list_orders_presupuesto" component={MaterialOrderListPresupuesto} /> }  
        

        { ADMIN   && <Route exact path="/products/products/:id" component={ManagerProductAdd} /> } 
        { ADMIN   && <Route exact path="/products/products" component={ManagerProducts} /> } 


        { ADMIN   && <Route exact path="/providers/providers/:id" component={ManagerProviderAdd} /> } 
        { ADMIN   && <Route exact path="/providers/providers" component={ManagerProviders} /> } 

        { ADMIN   && <Route exact path="/receipt/receipt/:id" component={ManagerReceiptAdd} /> } 
        { ADMIN   && <Route exact path="/receipt/receipts" component={ManagerReceipt} /> }  
        
        { (ADMIN || USUARIOS) && 
        <>
        <Route exact path="/user/roles" component={Roles} />
        <Route exact path="/user/roles/:id" component={AddEditRol} />
        <Route exact path="/user/section" component={Sections} />
        <Route exact path="/user/section/:id" component={SectionsAdd} />
        <Route exact path="/user/users" component={Users} />
        <Route exact path="/user/users/:id" component={UsersAdd} />
        </>
        }
      
        
        {!authUser ? <Redirect to={'/signin'} /> : <Route component={Error403} />}
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
