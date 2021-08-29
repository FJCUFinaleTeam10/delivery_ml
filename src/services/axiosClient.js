import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin":"*"
  },
  paramsSerializer: (params) => queryString.Stringify(params),
});
  axiosClient.interceptors.request.use(async (config) => {
    return config;
  });
  axiosClient.interceptors.response.use(
    async (response) => {
      if (response.data && response) {
        return response.data;
      }
      return response;
    },
    (error) => {
      throw error;
    }
  );
  export default axiosClient;
  
