import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "user";
//localhost:81/greenreturn_api/user/
class UserService {
  //Definición para Llamar al API y obtener el listado de users
  //localhost:81/greenreturn_api/user
  getUser() {
    return axios.get(BASE_URL);
  }

  //localhost:81/greenreturn_api/user/1
  getUserById(user_id) {
    return axios.get(BASE_URL + "/" + user_id);
  }

  //localhost:81/greenreturn_api/user/getAvailableAdministrators/1
  getAvailableAdministrators(id_collection_center) {
    return axios.get(
      BASE_URL + "/getAvailableAdministrators/" + id_collection_center
    );
  }

  createUser(User) {
    return axios.post(BASE_URL, User);
  }

  signupUser(User) {
    return axios.post(BASE_URL + "/createForm/", User);
  }

  updateUser(User) {
    return axios.put(BASE_URL, User);
  }

  loginUser(User) {
    return axios.post(BASE_URL + "/login/", User);
  }
}
export default new UserService();
