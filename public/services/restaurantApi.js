import axiosClient from "./axiosClient";
class restaurantApi {
  getAll = (params) => {
    const url = "/restaurant";
    return axiosClient.get(url, { params });
  };
}

const currentRestaurantApi = new restaurantApi();
export default currentRestaurantApi;
