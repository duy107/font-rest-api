import {getHeader} from "../../utilities/request";
export const auth = async (option) => {
    const res = await getHeader("auth",option);
    return res;
}