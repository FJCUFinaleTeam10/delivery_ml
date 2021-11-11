import geolocationApi from "./geolocationApi";

export async function fetchCity(){
    const response = await geolocationApi.getAllCity();
    return response;
};
