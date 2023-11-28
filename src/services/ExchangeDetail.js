import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "exchange_detail";
//localhost:81/greenreturn_api/material_exchange/
class MaterialService {
  //Definición para Llamar al API y obtener el listado de material_exchange
  //localhost:81/greenreturn_api/material_exchange
  getExchangeDetail() {
    return axios.get(BASE_URL);
  }

  createExchangeDetail(ExhangeDetail) {
    return axios.post(BASE_URL, ExhangeDetail)
  }

  updateExchangeDetail(ExhangeDetail){
    return axios.put(BASE_URL, ExhangeDetail);
  }
  
}
export default new MaterialService();
