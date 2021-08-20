import axiosClient from "./axiosClient";
const restaurantApi={
  getAll:(params) => {
    const url = '/restaurant/';
    return axiosClient.get(url, { params });
  },
    getRestaurantList:(params) => {
    const url = "/restaurant/getRestaurantList/";
    return axiosClient.post(url, { params });
  },
      getMenutList:(params) => {
    const url = "/menu/getMenu/";
    return axiosClient.post(url, { params });
  }
}
export default restaurantApi;
