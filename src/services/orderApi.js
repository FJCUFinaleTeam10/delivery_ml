import axiosClient from "./axiosClient";
const orderApi={
  getAll:(params) => {
    const url = "/order";
    return axiosClient.get(url, { params });
  }
}

export default orderApi;
