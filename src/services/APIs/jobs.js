import { URL, getUserDetail, responseValidator, apiError, getAuthToken } from "./helper";

export const getAllJobs = async (query) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/job_list"+query, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const getSingleJob = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/get_job/"+id, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const createJob = async (formdata) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/create_job", requestOptions);
        return responseValidator(response, true);
    }
    catch(e){
        return apiError(e);
    }
}
export const updateJob = async (payload, id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: payload,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+`/edit_job/${id}`, requestOptions);
        return responseValidator(response, true);
    }
    catch(e){
        return apiError(e);
    }
}
export const deleteJob = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+`/remove_emp_job/${id}`, requestOptions);
        return responseValidator(response, true);
    }
    catch(e){
        return apiError(e);
    }
}
export const getAppliedUsersOfJob = async (id,query) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/applied_user_list/"+id+query, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const getDashboardStats = async (query) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/admin_dashboard"+query, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const getDashboardCharts = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: payload,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/chartData", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const getRevenueStats = async (query) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/admin_revenue"+query, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}

export const getTransactions = async (query) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/allPaymentTransactions"+query, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}