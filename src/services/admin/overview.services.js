import {get} from "../../utilities/request";
export const overview = async () => {
    const res = await get("admin/overview");
    return res;
}