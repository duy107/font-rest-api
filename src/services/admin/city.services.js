import { get } from "../../utilities/request"
export const listCity = async () => {
    const res = await get("admin/city");
    return res;
}