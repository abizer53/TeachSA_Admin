import { URL, getUserDetail, responseValidator, apiError, getAuthToken } from "./helper";

export const getAllSeekers = async (query='') => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/job_seeker_list"+query, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const getAllProviders = async (query='') => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/job_provider_list"+query, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const getSingleSeeker = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/get_user/"+id, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const getSingleProvider = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/get_emp/"+id, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}