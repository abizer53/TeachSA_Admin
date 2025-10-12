export const firebaseErrorFinder = (error) => {
    switch(error.code){
        case "auth/email-already-in-use":
            return "User Already Exist."
            break;
        case "auth/too-many-requests":
                return "Requesting too frequently"
        case "auth/invalid-credential":
            return "Invalid Credential"
        default:
            return `Encounter ${error}`
    }

}
