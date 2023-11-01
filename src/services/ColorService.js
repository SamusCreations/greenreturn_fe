import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "color";
//localhost:81/greenreturn_api/material/
class ColorService {
  //Definición para Llamar al API y obtener el listado de materials
  //localhost:81/greenreturn_api/material
  getColor() {
    return axios.get(BASE_URL);
  }

//localhost:81/greenreturn_api/material/1
  getColorById(colorId) {
    return axios.get(BASE_URL + "/" + colorId);
  }
}
export default new ColorService();
