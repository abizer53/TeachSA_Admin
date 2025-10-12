import { URL, getUserDetail, responseValidator, apiError, getAuthToken } from "./helper";

export const getAllCategories = async (query) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/category_list"+query, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const createCategory = async (formdata) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body:formdata,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/add_cat", requestOptions);
        return responseValidator(response, true);
    }
    catch(e){
        return apiError(e);
    }
}
export const updateCategory = async (formdata,id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body:formdata,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/edit_cat/"+id, requestOptions);
        return responseValidator(response, true);
    }
    catch(e){
        return apiError(e);
    }
}
export const deleteCategory = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/remove_cat/"+id, requestOptions);
        return responseValidator(response, true);
    }
    catch(e){
        return apiError(e);
    }
}
export const updateCategoryStatus = async (formdata,id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body:formdata,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/change_cat_status/"+id, requestOptions);
        return responseValidator(response, true);
    }
    catch(e){
        return apiError(e);
    }
}

export const getAllReports = async (query) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+"/getAllReport"+query, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}