import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "measurement";
//localhost:81/greenreturn_api/measurement/
class MeasurementService {
  //Definición para Llamar al API y obtener el listado de measurements
  //localhost:81/greenreturn_api/measurement
  getMeasurements() {
    return axios.get(BASE_URL);
  }

  //localhost:81/greenreturn_api/measurement/1
  getMeasurementById(measurementId) {
    return axios.get(BASE_URL + "/" + measurementId);
  }
  
}
export default new MeasurementService();
