import { checkLogin } from "./checkLogin.js";
import { formApply } from "./formApply.js";
import {combineReducers} from "redux";
const allReducer = combineReducers({
    formApply,
    checkLogin
});

export default allReducer;