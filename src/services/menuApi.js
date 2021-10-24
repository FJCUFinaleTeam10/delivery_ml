import axiosClient from "./axiosClient";
const orderApi = {
  getAll: (params) => {
    const url = "/cart/";
    return axiosClient.get(url, { params });
  },
  createOrder: (params) => {
    const url = "/cart/createOrder/";
    return axiosClient.post(url, params);
  },
  baseonrestaurant: (params) => {
      const url = "/menu/baseonrestaurant/";
      return axiosClient.post(url, params);
  },
  getRestaurant: (params) => {
    const url = "/restaurant/getrestaurant/";
    return axiosClient.post(url, params);
  }
};

export default orderApi;
