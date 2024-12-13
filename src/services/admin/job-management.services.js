import { del as dele , get, patch, post } from "../../utilities/request"

export const listJob = async () => {
    const res = await get("admin/job-management");
    return res;
}
export const lists = async () => {
    const res = await get("admin/job-management/list");
    return res;
}
export const update = async (data) => {
    const res = await patch("admin/job-management/update", data);
    return res;
}

export const del = async (id) => {
    const res = await dele("admin/job-management/delete", id)
    return res;
}

export const create = async(data) => {
    const res = await post("admin/job-management/create", data);
    return res;
}