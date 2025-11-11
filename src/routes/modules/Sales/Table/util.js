import moment from "moment";

const createInfo = x => {
  //let pre = (x.precio + "").replace(".", ",");
  let preV = (parseFloat(x.precio) * parseFloat(x.peso_total)).toFixed(2);
  //let pre1 = (preV + "").replace(".", ",");
  let um = x.unidad_medida; 
  let obj2 = {
    id: x.id_pedido,
    "Tipo Línea": "I",
    "Tipo Doc": "",
    "Org.Vta.": "",
    Canal: "",
    Sector: "",
    Referencia: "",
    "DMA Desde": "",
    "DMA Hasta": "",
    "Pedido Cliente": "",
    Solicitante: "",
    Destinatario: "",
    Motivo: "",
    SKU: x.sku,
    Cantidad: x.kilos >= 1 ? x.kilos : x.cantidad,
    UM: um, // ver de usar para choclo UN
    "Cond.Precio": "ZQ13",
    "Precio Unit.": "",
    Moneda: "",
    "Base precio": "",
    "UM precio": "",
    "Ped.ant.": "",
    "Pos.Item": "",
    Almacen: x.almacen,
    Lote: x.lote,
  };
 
  return obj2;
};

const createOBJHeader = x => {
  let date = moment(new Date()).format("DDMMYYYY");
  let obj1 = {
    id: x.id_pedido,
    "Tipo Línea": "H",
    "Tipo Doc": x.tipo_pedido,
    "Org.Vta.": x.org_vta,
    Canal: x.canal,
    Sector: x.sector,
    Referencia: "",
    "DMA Desde": date,
    "DMA Hasta": date,
    "Pedido Cliente": "VTA_PER_" + x.id_pedido,
    Solicitante: x.usuario,
    Destinatario: null,
    Motivo: null,
    SKU: "",
    Cantidad: "",
    UM: "",
    "Cond.Precio": "",
    "Precio Unit.": "",
    Moneda: "ARS",
    "Base precio": "",
    "UM precio": "",
    "Ped.ant.": "",
    "Pos.Item": "",
    Almacen: "",
    Lote: ""
  };
  return obj1;
};

const createHeadersInfo = headers => {
  let listRet = [];
  //console.log("create pedido headers", headers);
  var uniquePedido = headers.filter(
    (headers, index, self) =>
      index === self.findIndex(t => t.id_pedido === headers.id_pedido)
  );
  uniquePedido.forEach(x => {
    let z001 = headers.filter(
      data => data.tipo_pedido === "Z001" && data.id_pedido === x.id_pedido
    );
    let z002 = headers.filter(
      data => data.tipo_pedido === "Z002" && data.id_pedido === x.id_pedido
    );
    if (z001.length > 0) {
      //console.log("z001 pedido", z001[0], z001[0].id_pedido);
      listRet.push(createOBJHeader(z001[0]));
      z001.forEach(element => {
        listRet.push(createInfo(element));
      });
    }
    if (z002.length > 0) {
      //console.log("z002 pedido", z002[0], z002[0].id_pedido);
      listRet.push(createOBJHeader(z002[0]));
      z002.forEach(element => {
        listRet.push(createInfo(element));
      });
    }
  });
  return listRet;
};

export const parsePedidos = async data => {
  //console.log("data", data, "lenght", data.length);
  const listRet = createHeadersInfo(data);
  //console.log("headers - info-->", listRet);
  for (var i = 0; i < listRet.length; i++) {
    delete listRet[i]["id"];
  }
  //console.log("listRet", listRet);
  return listRet;
};

export const parsePedidosStock = async data => {
  let listRet = [];
  for (const d of data) {
    let obj = {
      SKU: d.sku,
      Cantidad: d.cantidad,
      Descripcion: d.producto,
      kilos: d.kilos,
    };
    listRet.push(obj);
  }
   
  const productQuantities = listRet.reduce((acc, curr) => {
    const {SKU, Cantidad, kilos, Descripcion} = curr;
    //console.log("curr", curr);
    const currentValue = acc[SKU] || 0; // default to zero if not set yet
    const currentValue1 = acc[SKU] || 0; // default to zero if not set yet
    return {
      ...acc,
      [SKU]: Descripcion,
      [SKU]: currentValue + Cantidad,
      [SKU]: currentValue1 + kilos
    };
  }, {});
  

  const productQuantitiesArray = Object.entries(
    productQuantities
  ).map(([ SKU, Cantidad, kilos, Descripcion ]) => ({
    SKU,
    Cantidad,
    kilos,
    Descripcion
  }));

  
  return productQuantitiesArray;
};
