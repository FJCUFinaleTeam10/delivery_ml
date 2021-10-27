import axiosClient from "./axiosClient"
const  settingApi={
    getAllSetting:()=>{
        const url = `envsetting/getallsetting/`;
        return axiosClient.get(url);
    },
    getSettingBaseOneCity:(params)=>{
        const url = `envsetting/getsettingbaseoncity/`;
        return axiosClient.post(url,params);
    },
    updateSetting:(params)=>{
        const url = `envsetting/updatesetting/`;
        return axiosClient.post(url,params);
    },
}
export default settingApi;