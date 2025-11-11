import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtVertical from '../../../../../@coremat/CmtNavigation/Vertical';
import { sidebarNavs } from '../menus';
import { sidebarNavFabrica } from '../menus_fabrica';
import { sidebarNavsVentas } from '../menus_ventas';
import { sidebarNavsUsuarios } from '../menus_usuarios';

const useStyles = makeStyles(() => ({
  perfectScrollbarSidebar: {
    height: '100%',
    transition: 'all 0.3s ease',
    '.Cmt-sidebar-fixed &, .Cmt-Drawer-container &': {
      height: 'calc(100% - 167px)',
    },
    '.Cmt-modernLayout &': {
      height: 'calc(100% - 72px)',
    },
    '.Cmt-miniLayout &': {
      height: 'calc(100% - 91px)',
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:hover &': {
      height: 'calc(100% - 167px)',
    },
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const { authUser } = useSelector(({ auth }) => auth);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(authUser?.secciones?.length > 0) {
      // Tomamos el primer rol (puedes modificar esta lógica si necesitas manejar múltiples roles)
      const primerRol = authUser.secciones[0].id_rol;
      console.log("Rol detectado:", primerRol);
      setRol(primerRol);
    } else {
      console.warn("Usuario no tiene secciones/roles asignados");
      setRol(null);
    }
    setLoading(false);
  }, [authUser]);

  if (loading) {
    return <div>Cargando menú...</div>;
  }

  return (
    <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
      {rol === 1 && (
        <>
          <CmtVertical menuItems={sidebarNavs} />
           
        </>
      )}
      {rol === 2 && <CmtVertical menuItems={sidebarNavsVentas} />}
      {rol === 3 && <CmtVertical menuItems={sidebarNavFabrica} />}
      {rol === 4 && <CmtVertical menuItems={sidebarNavsUsuarios} />}
      
      {/* Opcional: Mensaje si no hay rol */}
      {!rol && <div>No tiene permisos para ver el menú</div>}
    </PerfectScrollbar>
  );
};

export default SideBar;