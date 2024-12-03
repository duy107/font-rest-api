import { infor } from "./inforUser.js";
import { checkLogin } from "./checkLogin.js";
import { formApply } from "./formApply.js";
import { permission } from "./permission.js";
import {combineReducers} from "redux";
const allReducer = combineReducers({
    formApply,
    checkLogin,
    infor,
    permission
});

export default allReducer;