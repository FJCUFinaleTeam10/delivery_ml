import axios from "axios";
import queryString from "query-string";

import { useSnackbar } from "notistack";

const axiosClient = () =>axios.create({
    baseURL: process.env.API_URL+"/api",
    headers:{
        'Content-Type': 'application/json'
    },
    paramsSerializer: params=>queryString.Stringify(params),
  });
  axiosClient.interceptors.request.use(async (config)=>{
    return config;
  })
  axiosClient.interceptors.response.use(async (response)=>{
    if(response.data&&response){
        return response.data;
    }
    return response;
  },(error)=>{
    throw error;
  });

  export default axiosClient;
  
export function useNoti() {
  const { enqueueSnackbar } = useSnackbar();
  return (variant, message) => {
    enqueueSnackbar(message, { variant });
  };
}
