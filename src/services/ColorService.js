import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "color";
//localhost:81/greenreturn_api/color/
class ColorService {
  //Definición para Llamar al API y obtener el listado de colors
  //localhost:81/greenreturn_api/color
  getColor() {
    return axios.get(BASE_URL);
  }

//localhost:81/greenreturn_api/color/1
  getColorById(colorId) {
    return axios.get(BASE_URL + "/" + colorId);
  }

//localhost:81/greenreturn_api/color/1
  getAvailables(MaterialId) {
    return axios.get(BASE_URL + "/getAvailables/" + MaterialId);
  }

}
export default new ColorService();
