import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "image_url";
//localhost:81/greenreturn_api/color/
class ImageShowService {
  //Definición para Llamar al API y obtener el listado de colors
  //localhost:81/greenreturn_api/color
  getImage() {
    return axios.get(BASE_URL);
  }


}
export default new ImageShowService();