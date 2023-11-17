import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "district";
//localhost:81/greenreturn_api/District/
class DistrictService {
  //Definición para Llamar al API y obtener el listado de District
  //localhost:81/greenreturn_api/District
  getDistricts() {
    return axios.get(BASE_URL);
  }

  //localhost:81/greenreturn_api/District/1
  getDistrictById(DistrictId) {
    return axios.get(BASE_URL + "/" + DistrictId);
  }

  //localhost:81/greenreturn_api/District/getByCanton/1
  getDistrictByCanton(CantonId) {
    return axios.get(BASE_URL + "/getByCanton/" + CantonId);
  }
}
export default new DistrictService();
