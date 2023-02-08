import axiosClient from "./axiosClient";
import queryString from "query-string";

class SensorApi {
  getSensors(params: any) {
    let url = "/sensor";
    if (params) {
      url = `/sensor?${queryString.stringify(params)}`;
    }

    return axiosClient.get(url);
  }

  getAllSensors() {
    return axiosClient.get("/sensor/all");
  }
}
const sensorApi = new SensorApi();

export default sensorApi;
