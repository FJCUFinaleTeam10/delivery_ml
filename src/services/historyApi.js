import axiosClient from "./axiosClient";
const historyApi={
    getHistoryBaseOnCityID: (params) => {
        const url = "/history/gethistorybaseoncity/";
        return axiosClient.post(url, { params });
    }
}

export default historyApi;
