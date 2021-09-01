import axiosClient from "./axiosClient";

const geolocationApi = {
  getAllCountryCodes: () => {
    const url = `geolocation/getallcountrycode/`;
    return axiosClient.get(url);
  },
  getAllCity: () => {
    const url = `geolocation/getallcities/`;
    return axiosClient.get(url);
  },
  getCityBaseonCountrycode: (params) => {
    const url = `geolocation/getcity/`;
    return axiosClient.post(url,{params});
  },
};

export default geolocationApi;
