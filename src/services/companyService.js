import { get, patch, post } from "../utilities/request";

export const getListCompany = async () => {
    const res = await get("company");
    return res;
}

export const getDetailCompany = async (id) => {
    const res = await get(`company?id=${id}`);
    return res;
}
export const getDetailCompany1 = async (id) => {
    const res = await get(`company/${id}`);
    return res;
}

export const checkExits = async(key, value) => {
    const res = get(`company?${key}=${value}`);
    return res;
}

export const createCompany = async (option) => {
    const res = await post("company", option);
    return res;
}

export const login = async (email, password = "") => {
    let pass = "";
    if(password !== ""){
        pass = `&password=${password}`;
    }
    const res = await get(`company?email=${email}${pass}`);
    return res;
}

export const updateCompany =  async (id, options) => {
    const res = await patch(`company/${id}`, options);
    return res;
}