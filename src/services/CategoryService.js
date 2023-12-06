import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "category";
//localhost:81/greenreturn_api/category/
class categoryService {
  //Definición para Llamar al API y obtener el listado de categorys
  //localhost:81/greenreturn_api/category
  getcategorys() {
    return axios.get(BASE_URL);
  }

  //localhost:81/greenreturn_api/category/1
  getcategoryById(categoryId) {
    return axios.get(BASE_URL + "/" + categoryId);
  }
  
}
export default new categoryService();
