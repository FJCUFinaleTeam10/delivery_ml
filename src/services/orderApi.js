import axiosClient from "./axiosClient";
const orderApi={
  getAll:(params) => {
    const url = "/cart/";
    return axiosClient.get(url, { params });
  },
  createOrder:(params) => {
    const url = "/cart/createOrder/";
    return axiosClient.post(url,params);
  },
  getOrderBaseOnCity: (params) => {
    const url = "/order/baseoncity/";
    return axiosClient.post(url, { params });
  }
}

export default orderApi;
