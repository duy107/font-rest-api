import { get, patch, post } from "../utilities/request";

export const login = async (email, password="") => {
    let pass = "";
    if(password !== ""){
        pass = `&password=${password}`;
    }
    const res = await get(`users?email=${email}${pass}`);
    return res;
}

export const checkExits = async(key, value) => {
    const res = get(`users?${key}=${value}`);
    return res;
}
export const resetPassword = async (id, options) => {
    const res = await patch(`users/${id}`, options);
    return res;
}

export const createUser = async(options) => {
    const res = await post('users', options);
    return res;
}

export const loginPost = async(data) => {
    const res = await post(`login`, data);
    return res;
}
