

 

export const logicLevels = ( prod, level, setLevel, setModena, setAT, setFabricacionSelect, setManoSelect, setGeneralAMedida) =>{ 
    
    
    const { idtipomaterial, idlinea, idtipoabertura, es_a_medida_modena, es_a_medida_at, es_a_medida } = prod;
    
    const newLevel = {
        levelOne: false,
        levelTwo: false,
        levelThree: false,
        levelFour: false,
        levelFive: false,
    }; 
     

    // Lógica para idtipomaterial
    if (idtipomaterial === 1) {
        newLevel.levelOne = true;
    } 

    // Lógica para idlinea
    if (idlinea === 1) {
        newLevel.levelTwo = true;
        setModena(false);
        setAT(false);
        setGeneralAMedida(false);
    }
     
    
    if (idlinea === 2 ) {
        setAT(false);
        setModena(true);
        //console.log("modena-->", es_a_medida_modena);
        setGeneralAMedida(es_a_medida_modena);
    }

    if (idlinea === 3 ) {
        setModena(false);
        setAT(true); 
        // console.log("at-->", es_a_medida_at);
        setGeneralAMedida(es_a_medida_at); 
    }

   
    // logica tipo aberturas
    if (idtipoabertura === 1 ) {
        setFabricacionSelect(true); 
        setGeneralAMedida(false);
    } else {
        if(idtipoabertura){
            setFabricacionSelect(false);
            if(idlinea === 1)
                setGeneralAMedida(true);
            else
                setGeneralAMedida(false);

        }
       
    }

    if (idtipoabertura === 3 || idtipoabertura === 8) {
        setManoSelect(true);
    } else { 
        setManoSelect(false);
    }

    if (es_a_medida) {
        setGeneralAMedida(true);
    }  

    if (idtipomaterial > 1) { 
        setGeneralAMedida(true);
    }

    // Finalmente seteamos todo de una vez
    setLevel({ ...level, ...newLevel }); 
}


export const logic_btn = (prod) => {

    //console.log("prod.es_a_medida_modena", prod.es_a_medida_modena);
    if(prod.idlinea != null && prod.cantidad != "" && (prod.es_a_medida_modena == false || prod.es_a_medida_at == false)){
        //console.log("aca 0");
        return true;
    }

    if (prod.idtipomaterial == null || prod.idmaterial == null || prod.cantidad == "") {
        //console.log("aca 1 false");
        return false;
    }

    if (prod.idtipomaterial == 1) {
        //console.log("aca 2");
        if (prod.es_a_medida == null && prod.idtipoabertura == 1) {
             //console.log("aca 2 false");
            return false;
        }
    }

    if (prod.idlinea != null) {
        //console.log("aca 3");
        if (prod.idlinea == 2 || prod.idlinea == 3) {
            
           // console.log("aca modena o a30 ");
            if(prod.es_a_medida_at == null && prod.idlinea == 3){
                //console.log("false a30");
                return false;
            }
            if(prod.es_a_medida_modena == null && prod.idlinea == 2){
                 //console.log("false modena");
                return false;
            }  
        } else {
            if (prod.idtipoabertura == null && prod.es_a_medida == null) {
                 //console.log("aca 3 false 2***");
                return false;
            }
        }
    }

    if (
        prod.es_a_medida === true ||
        prod.es_a_medida_at === true ||
        prod.es_a_medida_modena === true ||
        prod.idtipomaterial > 1
    ) {
        //console.log("aca 4");
        if (prod.alto == "" || prod.ancho == "" || prod.idcolor == null) {
            // console.log("FALSE 4");
            return false;
        }
    }

    return true;
};

export const logic_btn_parent = (ped) => {

    if(ped.celular == "" || ped.celular == null || ped.nombre == "" || ped.nombre == null || ped.apellido == "" || ped.apellido == null || ped.fechaFinalizacion == "" || ped.fechaFinalizacion == null || ped.domicilio == "" || ped.domicilio == null)
        return false;
    return true;
};


 