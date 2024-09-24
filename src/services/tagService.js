import { get } from "../utilities/request"

export const getListTag = async () => {
    const res = await get("tags");
    return res;
}