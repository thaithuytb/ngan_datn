import axios from "axios";
import queryString from "query-string";
import { LOCAL_STORAGE_TOKEN } from "../constants/index";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  // const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  // console.log("token", token);
  // if (token) {
  //   config.headers = {
  //     Authorization: `Bearer ${token}`,
  //     Accept: "application/json",
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   };
  // } else {
  //   localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  // }
  return config;
});

// axiosClient.interceptors.response.use(
//   (response: any) => {
//     if (response && response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   (error) => {
//     // Handle errors
//     throw error;
//   }
// );

export default axiosClient;
