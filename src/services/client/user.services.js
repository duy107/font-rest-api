import { patch, post } from "../../utilities/request";

export const loginPost = async(data) => {
    const res = await post(`login`, data);
    return res;
}
export const forgot = async (data) => {
    const res = await post("forgot", data);
    return res;
}
export const otp = async(data) => {
    const res = await post("forgot/otp", data);
    return res;
}
export const reset = async (data) => {
    const res = await post("forgot/reset", data);
    return res;
}

export const register = async (data) => {
    const res = await post("register", data);
    return res;
}

export const changeInfor = async (data) => {
    const res = await patch("infor/change", data);
    return res;
}