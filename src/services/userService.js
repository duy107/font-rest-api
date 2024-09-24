import { get, patch } from "../utilities/request";

export const login = async (email, password="") => {
    let pass = "";
    if(password !== ""){
        pass = `&password=${password}`;
    }
    const res = await get(`users?email=${email}${pass}`);
    return res;
}

export const checkEmail = async (email="") => {
    const res = await get(`users?email=${email}`);
    return res;
}

export const resetPassword = async (id, options) => {
    const res = await patch(`users/${id}`, options);
    return res;
}