import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "province";
//localhost:81/greenreturn_api/province/
class ProvinceService {
  //Definición para Llamar al API y obtener el listado de provinces
  //localhost:81/greenreturn_api/province
  getProvinces() {
    return axios.get(BASE_URL);
  }

  //localhost:81/greenreturn_api/province/1
  getProvinceById(provinceId) {
    return axios.get(BASE_URL + "/" + provinceId);
  }
}
export default new ProvinceService();
