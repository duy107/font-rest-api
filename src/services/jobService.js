import { del, get, patch, post } from "../utilities/request"

export const getAllJob = async () => {
    const res = await get(`jobs`);
    return res;
}

export const getDetailJob = async (id) => {
    const res = await get(`jobs?id=${id}`);
    return res;
}
export const getDetailJob1 = async (id) => {
    const res = await get(`jobs/${id}`);
    return res;
}

export const getListJob = async (id) => {
    const res = await get(`jobs?idCompany=${id}`);
    return res;
}


export const createJob = async (options) => {
    const res = await post("jobs", options);
    return res;
}
export const updateJob = async (id, options) => {
    const res = await patch(`jobs/${id}`, options);
    return res;
}
export const deleteJob = async (id) => {
    const res = await del(`jobs/${id}`);
    return res;
}
