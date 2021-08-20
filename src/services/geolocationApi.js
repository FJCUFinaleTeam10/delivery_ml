import axiosClient from "./axiosClient";

const driverApi = {
  getCountryCodes: (params) => {
    const url = ``;
    return axiosClient.getC(url, { params });
  },

  getCities: () => {
    const url = `/driver/`;
    return axiosClient.get();
  },
  getAllCities: () => {
    const url = `/driver/`;
    return axiosClient.get();
  },
  getAllCOuntryCodes: () => {
    const url = `/driver/`;
    return axiosClient.get();
  },
};

export default driverApi;
