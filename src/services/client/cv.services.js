import { get, post } from "../../utilities/request"

export const create = async (data) => {
    const res = await post("cv/create", data);
    return res;
}

export const cvByIdUser = async (id, status) => {
    const res = await get(`cv/${id}/${status}`);
    return res;
}