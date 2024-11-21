import { get, patch, post } from "../../utilities/request"
export const login = async (data) => {
    const res = await post("admin/login", data);
    return res;
}
export const loginGet = async () => {
    const res = await get("admin/login");
    return res;
}

export const companyInfor = async () => {
    const res = await get("admin/infor");
    return res;
}

export const update = async (data) => {
    const res = await patch("admin/update", data);
    return res;
}