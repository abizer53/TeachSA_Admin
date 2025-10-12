import { toast } from 'react-toastify';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import { getUser } from '@/services/firebase-services/cookies';
import { errorMessage } from './toasters';
dayjs.extend(relativeTime);
export const verifyEmail = (email, message=true) => {
    if(email.trim()=="" && !email){
        errorMessage(`Email should not be empty`)
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if(!isValidEmail){
        errorMessage(`"${email}" is an invalid email address`)
    }
    return isValidEmail;
}

export const comparePasswords = (a,b,message=true) => {
    if(a!=b){
        if(message){
            errorMessage(`Password mismatch`)
        }
        return false;
    }
    return true;
}

export const isRequired = (val, field="", message=true, ) => {
    if(val && val.trim() !=""){
        return true
    }
    if(message){
        errorMessage(`${field} should not be empty`)
    }
    return false;
}
export const categoryChecker = (val, field = "", message = true) => {
    const allowedPattern = /^[a-zA-Z0-9\s\-_]+$/;

    if (val && val.trim() !== "") {
        if (allowedPattern.test(val)) {
            return true;
        } else if (message) {
            errorMessage(`${field} must contain only letters, numbers, spaces, hyphens, or underscores`);
        }
    } else if (message) {
        errorMessage(`${field} should not be empty.`);
    }

    return false;
};


export const isRequiredStringArray = (val, field="", message=true, ) => {
    const type = typeof(val)
    if(type == 'string'){
        if(val && val.trim() !=""){
            return true
        }
        if(message){
            errorMessage(`${field} should not be empty`)
            return false;
        }
    }else if(type == 'array'){
        if(val.length > 0){
            return true
        }
        if(message){
            errorMessage(`${field} should not be empty`)
            return false;
        }
    }else{
        return true
    }
    return false;
}
export const requiredImage = (val, field="", message=true, ) => {
    if(val){
        return true
    }
    if(message){
        errorMessage(`Please Upload the ${field} first. `)
    }
    return false;
}

export const customUTCDate = (date) => {
    // Convert custom date to UTC
    console.log(typeof date)
    const universalDateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return universalDateUTC.toISOString();
}

export const slotToISODateObject = (dateString, field) => {
    if(!dateString || dateString ==""){
        return errorMessage(`"${field} should not be empty`,)
    }
    const [datePart, timePart] = dateString.split(', ');
    const [month, day, year] = datePart.split(' - ').map(part => parseInt(part, 10));
    const [hours, minutes, seconds] = timePart.split(':').map(part => parseInt(part, 10));
  
    // Create a new Date object
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    return date.toISOString();
}
export const notZero = (val, field="Value", message=true) => {
    let num = parseFloat(val)
    if(num == 0){
        if(message){
            errorMessage(`"${field}" should not be zero`)
        }
        return false
    }
    return true;
}

export const datesDifference = (a,b) => {
    const date1 = dayjs(a); 
    const date2 = dayjs(b);

    const differenceInDays = date2.diff(date1, 'day', true);
    return Math.ceil(differenceInDays)
}

export const dateDiffernceFromNow = (a) => {
    const date1 = dayjs(a); 
    var now = dayjs()

    const differenceInDays = now.diff(date1, 'day', true);
    return Math.ceil(differenceInDays)
}

export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

export const dateFromNow = (val) => {
    const date = dayjs(val);
    return date.fromNow();
}

export const imageValidator = (file) => {
    if(file && file.size <= 209715200){
        if(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/webp" || file.type == "image/gif" || file.type == "image/svg+xml" || file.type == "image/svg" || file.type == "application/pdf"){
            return true
        }
        else{
            errorMessage("File not supported");
            return false
        }
    }else{
        errorMessage("File size too large");
        return false;
    }
}

export const createObjectURL = (file) => {
    return URL.createObjectURL(file)
}

export const mediaFileType = (file) => {
    if(file.type=="video/mp4" || file.type=="video/quicktime"){
        return "video"
    }
    else if(file.type=="audio/wav" || file.type=="audio/mp3"){
        return "audio"
    }
    else{
        return "image"
    }
}

export const isLoggedIn = () => {
    const user = getUser();
    if(user){
        return true
    }
    else{
        return false
    }
}

export const extractObject = (item, array) => {
    const filteredData =  array.filter((it,index) => it._id == item);
    console.log(filteredData)
    return filteredData[0];
}