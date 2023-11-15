import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "canton";
//localhost:81/greenreturn_api/Canton/
class CantonService {
  //Definición para Llamar al API y obtener el listado de canton
  //localhost:81/greenreturn_api/Canton
  getCantons() {
    return axios.get(BASE_URL);
  }

  //localhost:81/greenreturn_api/Canton/1
  getCantonById(CantonId) {
    return axios.get(BASE_URL + "/" + CantonId);
  }

  //localhost:81/greenreturn_api/Canton/getByProvince/1
  getCantonByProvince(ProvinceId) {
    return axios.get(BASE_URL + "/getByProvince/" + ProvinceId);
  }
}
export default new CantonService();
