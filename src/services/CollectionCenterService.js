import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "collection_center";
//localhost:81/greenreturn_api/collection_center/
class CollectionCenterService {
  //Definición para Llamar al API y obtener el listado de collection centers
  //localhost:81/greenreturn_api/collection_center
  getCollectionCenter() {
    return axios.get(BASE_URL);
  }

  //localhost:81/greenreturn_api/collection_center/1
  getCollectionCenterById(collection_center_id) {
    return axios.get(BASE_URL + "/" + collection_center_id);
  }

  createCollectionCenter(CollectionCenter) {
    return axios.post(BASE_URL, CollectionCenter);
  }

  updateCollectionCenter(CollectionCenter) {
    return axios.put(BASE_URL, CollectionCenter);
  }
}
export default new CollectionCenterService();
