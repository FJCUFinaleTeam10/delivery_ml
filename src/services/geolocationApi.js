import axiosClient from "./axiosClient";

const geolocationApi = {
  getAllCountryCodes: () => {
    const url = `geolocation/getAlll/`;
    return axiosClient.getC(url);
  },
  getAllCity: () => {
    const url = `geolocation/getallcities/`;
    return axiosClient.get(url);
  },
};

export default geolocationApi;
