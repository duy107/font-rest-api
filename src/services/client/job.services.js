import { get } from "../../utilities/request";
export const search = async(data) => {
    const res = await get(`search?${data}`);
    return res;
}

export const job_detail = async (param) => {
    const res = await get(`jobs/${param}`);
    return res;
}