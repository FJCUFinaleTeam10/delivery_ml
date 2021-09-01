import axiosClient from "./axiosClient";
const restaurantApi = {
  getAll: (params) => {
    const url = "/restaurant/getallrestaurantlist/";
    return axiosClient.post(url, { params });
  },
  getRestaurantList: (params) => {
    const url = "/restaurant/getrestaurantlist/";
    return axiosClient.post(url, { params });
  },
  getMenutList: (params) => {
    const url = "/menu/getMenu/";
    return axiosClient.post(url, { params });
  },
  getRestaurantBaseOnCity: (params) => {
    const url = `/restaurant/getrestaurantbaseoncity/`;
    return axiosClient.post(url, { params });
  },
  getRestaurantBaseOnId: (params) => {
    const url = `/restaurant/getrestaurantbaseonid/`;
    return axiosClient.post(url, { params });
  },
};
export default restaurantApi;
