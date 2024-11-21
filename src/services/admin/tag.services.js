import { get } from "../../utilities/request"
export const listTag = async () => {
    const res = await get("admin/tag");
    return res;
}
