import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "material";
//localhost:81/greenreturn_api/material/
class MaterialService {
  //Definición para Llamar al API y obtener el listado de materials
  //localhost:81/greenreturn_api/material
  getMaterials() {
    return axios.get(BASE_URL);
  }

  //localhost:81/greenreturn_api/material/1
  getMaterialById(materialId) {
    return axios.get(BASE_URL + "/" + materialId);
  }

  getColorByMaterialId(colorId) {
    return axios.get(BASE_URL + "/" + colorId);
  }

  createMaterial(Material) {
    return axios.post(BASE_URL, Material);
  }

  updateMaterial(Material) {
    return axios.put(BASE_URL, Material);
  }
  
  getImages() {
    return axios.put(BASE_URL);
  }

}
export default new MaterialService();
