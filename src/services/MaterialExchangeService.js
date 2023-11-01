import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "material_exchange";
//localhost:81/greenreturn_api/material_exchange/
class MaterialService {
  //Definición para Llamar al API y obtener el listado de material_exchange
  //localhost:81/greenreturn_api/material_exchange
  getMaterialExchange() {
    return axios.get(BASE_URL);
  }

  //localhost:81/greenreturn_api/material_exchange/1
  getMaterialExchangeById(id) {
    return axios.get(BASE_URL + "/" + id);
  }

  getUserHistory(idUser) {
    return axios.get(BASE_URL + "/getUserHistory/" + idUser);
  }

  getCollectionCenterHistory(idCollectionCenter) {
    return axios.get(
      BASE_URL + "/getCollectionCenterHistory/" + idCollectionCenter
    );
  }
}
export default new MaterialService();
