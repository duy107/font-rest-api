import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {checkAuthen} from "../../actions/checkLogin";
function Logout() {
    deleteAllCookies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuthen(false));
        navigate("/signin/user_signin");
    }, [])
    return (
        <>
        </>
    );
}

export default Logout;