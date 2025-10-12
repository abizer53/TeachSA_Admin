import { errorMessage, successMessage } from "@/Utilities/toasters";
import { getToken, getUser, removeToken } from "../firebase-services/cookies";
import { toast } from 'react-toastify';
import dayjs from "dayjs";
export const URL = 'https://api.teachsaconnect.co.za/api';



export const getAuthToken = () => {
  const cookieString = getToken();
  
  if (cookieString) {
    const { value, expiry } = JSON.parse(cookieString);
    const expiryDate = dayjs(expiry);
    const currentDate = dayjs();
    const differenceInMinutes = expiryDate.diff(currentDate, "minute");
    // if (differenceInMinutes < 5) {
    //   // Remove token and redirect to login
    //   removeToken();
    //   if (typeof window !== "undefined") {
    //     window.location.href = "/"; // Redirect to login
    //   }
    //   return false;
    // }

    return value;
  }

  return false; // No token found
};

export const getUserDetail = () => {
    const cookieString = getUser();
    if (cookieString) {
        return cookieString;
    }
    return false
}
export const responseValidator = async (response , isToaster=false, message=null) => {
    if(response.status == 204){
        if(isToaster){
            successMessage("Deleted Successfully.")
        }
        return {status: true}
    }
    else if(response.ok){
        const res = await response.json()
        if (Array.isArray(res.data)) {
            if(isToaster){
                successMessage((!message || message.length==0) ?res.message:message)
            }
            return {status: true, data: [...res.data ]}
        } else if (typeof res.data === 'object') {
            if(isToaster){
                successMessage((!message || message.length==0) ?res.message:message)
            }
            return {status: true, data: res.data}
        } else if (typeof res.data === 'string') {
            if(isToaster){
                successMessage((!message || message.length==0) ?res.message:message)
            }
            return {status: true, data: res.data}
        }else {
            if(isToaster){
                successMessage((!message || message.length==0) ?res.message:message)
            }
            return {status: true, message: res.message}
        }
    }
    else if(response.status == 401){
        const res = await response.json();
        errorMessage(res.message)
        return {status: false, code:401, message: "Session Expired."}
    }
    else if(response.status == 413){
        errorMessage("Media file which you attach is too large.")
        return {status: false, code:413, message: "file-size-too-large"}
    }
    else if(response.status == 404){
        if(!isToaster){
            errorMessage("API not found on this server.")
        }
        return {status: false, code:404, message: "file-size-too-large"}
    }
    else if(response.status >= 400 && response.status < 500){
        const res = await response.json();
        errorMessage(res.message,`API-400-error${Math.random()}`);
        return {status: false, code: response.status, message: res}
    }
    else if(response.status >= 500){
        const res = await response.json()
        errorMessage(res.message,`API-500-error${Math.random()}`)
        return {status: false, code:response.status, message: "Encounter Server Side Error."}
    }
    else{
        errorMessage("Something went wrong")
        return {status: false, code:response.status, message: "Something went wrong."}
    }
}
export const apiError = (e) => {
    if(e.name === "AbortError"){
    }
    else{
        
        errorMessage("Takes more than the usual time. Please refresh the page.",`API-Timeout-error`)
        // window.location.href = window.location.origin
    }
    return {status: false, message: e}
}
export const isLiked = (likeBy, server=false, currentUser=null) => {
    if(!likeBy){
        return false
    }
    const user = !server?getUserDetail():currentUser;
    
    const filterdData = likeBy.filter(item => item == user.userId)
    if(filterdData.length > 0){
        return true;
    }
    return false;
}