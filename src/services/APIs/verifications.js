import { URL, getUserDetail, responseValidator, apiError, getAuthToken } from "./helper";

export const getAllVerifications = async (query='') => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/verify_list"+query, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const getSingleVerification = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/verify_list/"+id, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}

export const verifyToggleUser = async (id,payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "POST",
        body:payload,
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/verify_user/"+id, requestOptions);
        return responseValidator(response, true);
    }
    catch(e){
        return apiError(e);
    }
}
export const verifyToggleEmployer = async (id,payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "POST",
        body:payload,
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/verify_emp/"+id, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}


export const changeStatusOfUser = async (id,payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "POST",
        body:payload,
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/change_user_status/"+id, requestOptions);
        return responseValidator(response, true);
    }
    catch(e){
        return apiError(e);
    }
}
export const changeStatusOfEmployer = async (id,payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "POST",
        body:payload,
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/change_emp_status/"+id, requestOptions);
        return responseValidator(response, true);
    }
    catch(e){
        return apiError(e);
    }
}