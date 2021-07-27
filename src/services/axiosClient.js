import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "http://60.251.157.47:8080",
  headers: {
    "Content-Type": "application/json",
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
  
