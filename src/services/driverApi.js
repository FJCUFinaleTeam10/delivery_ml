import axiosClient from "./axiosClient"
const  driverApi={
    getDriverBaseOnID: (params)=>{
        const url = `/driver/getdriverbaseonid/`;
        return axiosClient.post(url,{params});
    },
    getAll:(params)=>{
        const url = `/driver/getalldriver/`;
        return axiosClient.post(url,{params});
    },
    get:(id)=>{
        const url = `/driver/${id}`;
        return axiosClient.get(url);
    },
    getDriverBaseOnCity:(params)=>{
        const url = `/driver/getdriverbaseoncity/`;
        return axiosClient.post(url,{params});
    }
}
export default driverApi;
