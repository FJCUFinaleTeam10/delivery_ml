import axiosClient from "./axiosClient"
const  driverApi={
    getAll:(params)=>{
        const url = `/driver/`;
        return axiosClient.get(url,{params});
    },
    get:(id)=>{
        const url = `/driver/${id}`;
        return axiosClient.get(url);
    }
}

export default driverApi;