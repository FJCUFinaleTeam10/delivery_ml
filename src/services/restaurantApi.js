import axiosClient from "./axiosClient";
const restaurantApi={
  getAll:(params) => {
    const url = '/restaurant/';
    return axiosClient.get(url, { params });
  }
}

export default restaurantApi;
