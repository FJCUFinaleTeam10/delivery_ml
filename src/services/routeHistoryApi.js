import axiosClient from "./axiosClient"
const  routeHistoryApi={
    getHistoryBaseOnDriverID: (params)=>{
        const url = `/routehistory/gethistorybaseondriverid/`;
        return axiosClient.post(url,{params});
    },
}
export default routeHistoryApi;
