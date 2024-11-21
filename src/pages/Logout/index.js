import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {checkAuthen} from "../../actions/checkLogin";
import { infor } from "../../actions/inforUser";
function Logout() {
    deleteAllCookies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.removeItem("infor");
        dispatch(infor({}));
        dispatch(checkAuthen(false));
        navigate("/");
    }, [])
    return (
        <>
        </>
    );
}

export default Logout;