import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "collection_center";
//localhost:81/greenreturn_api/material/
class CCService {
  //Definición para Llamar al API y obtener el listado de materials
  //localhost:81/greenreturn_api/material
  getCollectionCenter() {
    return axios.get(BASE_URL);
  }

//localhost:81/greenreturn_api/material/1
  getMaterialById(collection_center_id) {
    return axios.get(BASE_URL + "/" + collection_center_id);
  }

  getColorByMaterialId(colorId) {
    return axios.get(BASE_URL + "/" + colorId);
  }
}
export default new CCService();
