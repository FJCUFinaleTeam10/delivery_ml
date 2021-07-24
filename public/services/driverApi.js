import axiosClient from "./axiosClient"
class driverApi{
    getAll=(params)=>{
        const url = '/driver';
        return axiosClient.get(url,{params});
    };
}

const currentDriverApi = new driverApi();
export default currentDriverApi;