import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {checkAuthen} from "../../actions/checkLogin";
import { infor } from "../../actions/inforUser";
import { permission } from "../../actions/permission.action";
function Logout() {
    deleteAllCookies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.removeItem("infor");
        localStorage.removeItem("permission");
        dispatch(infor({}));
        dispatch(permission([]));
        dispatch(checkAuthen(false));
        navigate("/");
    }, [])
    return (
        <>
        </>
    );
}

export default Logout;