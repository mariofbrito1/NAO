//import UserDataService from "../services/elaborados.service";

export const typeSection = {
  ADMIN: 1,
  VENTAS: 2,
  FABRICA: 3,
  USUARIO: 4, 
};

export const tieneAccesoASeccion = (secciones, seccion) => {
  if (secciones && seccion) {
    for (let a = 0; a < secciones.length; a++) {
      //console.log('seccion a', secciones[a].id_seccion, 'vvv', seccion);
      if (seccion === secciones[a].id_seccion) {
        //console.log('TIENE ACCESSO A LA SECCION', secciones[a].id_seccion);
        return true;
      }
    }
  }
  //console.log('FALSE');
  return false;
};
