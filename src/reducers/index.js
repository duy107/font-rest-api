import { infor } from "./inforUser.js";
import { checkLogin } from "./checkLogin.js";
import { formApply } from "./formApply.js";
import {combineReducers} from "redux";
const allReducer = combineReducers({
    formApply,
    checkLogin,
    infor
});

export default allReducer;