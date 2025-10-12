import { URL, getAuthToken, responseValidator, apiError } from "./helper";

export const registerEmployer = async (formdata) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };
    try{
        const response = await fetch(URL+"/employerRegister", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e)
    }
}

export const loginAdmin = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`)
    const formdata = new FormData();
    formdata.append("email", payload.email);
    formdata.append("password", payload.password);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body:formdata,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"/adminLogin", requestOptions)
        return responseValidator(response)
    }
    catch(e){
        return apiError(e)
    }
}
