import { del as dele , get, patch} from "../../utilities/request"

export const listCV = async () => {
    const res = await get("admin/cv-management");
    return res;
}   

export const del = async (id) => {
    const res = await dele("admin/cv-management/delete", id)
    return res;
}
export const update = async (id) => {
    const res = await patch("admin/cv-management/changeStatus", id);
    return res;
}
