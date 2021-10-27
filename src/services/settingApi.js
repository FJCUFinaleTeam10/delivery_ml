import axiosClient from "./axiosClient"
const  settingApi={
    getAllSetting:()=>{
        const url = `envsetting/getallsetting/`;
        return axiosClient.get(url,);
    },
}
export default settingApi;