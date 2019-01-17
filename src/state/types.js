// ####################################################

export const request = (type) => {
    return `${type}_REQUEST`;
}
export const failure = (type) => {
    return `${type}_FAILURE`;
}
export const success = (type) => {
    return `${type}_SUCCESS`;
}

export const update = (type) => {
    return `${type}_UPDATE`;
}
// ####################################################


export const CHECK_USER_LOGGEDIN = "CHECK_USER_LOGGEDIN";
export const UPDATE_USER_LOGGEDIN = "UPDATE_USER_LOGGEDIN";
export const UPDATE_USER = "UPDATE_USER";

export const USER_LOGIN = "USER_LOGIN";
export const USER_REGISTER = "USER_REGISTER";
export const USER_FORGOTPASSWORD = "USER_FORGOTPASSWORD";
export const USER_LOGOUT = "USER_LOGOUT";