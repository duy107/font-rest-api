import { get, post, del as dele, patch} from "../../utilities/request"

export const roles = async () => {
    const res = get("admin/role");
    return res;
}
export const create = async (data) => {
    const res = await post("admin/role/create", data);
    return res;
}
export const del = async (id) => {
    const res = await dele("admin/role/delete", id);
    return res;
}

export const update = async (data) => {
    const res = await patch("admin/role/update", data);
    return res;
}
export const changePermission = async (data) => {
    const res = await patch("admin/role/changePermission", data);
    return res;
}