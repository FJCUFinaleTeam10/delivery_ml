import axiosClient from "./axiosClient";
class orderApi {
  getAll = (params) => {
    const url = "/order";
    return axiosClient.get(url, { params });
  };
}

const currentOrderApi = new orderApi();
export default currentOrderApi;
