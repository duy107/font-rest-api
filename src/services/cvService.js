import { del, get, patch, post } from "../utilities/request"

export const createCV = async (options) => {
    const res = await post("cv", options);
    return res;
}

export const getListCv = async (id, idUser = '') => {
    const user = (idUser) ? `&idUser=${idUser}` : '';
    const res = await get(`cv?idCompany=${id}${user}`);
    return res;
}

export const changeStatusCv = async(id, options) => {
    const res = await patch(`cv/${id}`, options);
    return res;
}

export const deleteCv = async(id) => {
    const res = await del(`cv/${id}`);
    return res;
}

export const detailCv = async (id) => {
    const res = await get(`cv/${id}`);
    return res;
}

export const getListCvByUser = async (id) => {
    const res = await get(`cv?idUser=${id}`);
    return res;
}

export const getListCvByJob = async (id) => {
    const res = await get(`cv?idJob=${id}`);
    return res;
}