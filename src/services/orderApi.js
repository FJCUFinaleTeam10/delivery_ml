import axiosClient from "./axiosClient";
const orderApi={
  getAll:(params) => {
    const url = "/order";
    return axiosClient.get(url, { params });
  },
  createOrder:(params) => {
    const url = "/order/createOrder/";
    return axiosClient.post(url,params);
  }
}

export default orderApi;
