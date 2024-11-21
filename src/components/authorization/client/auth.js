import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as cookie from "../../../helpers/cookie";
import {auth} from "../../../services/client/auth.services";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../../actions/checkLogin";
import { infor } from "../../../actions/inforUser";
function AuthClient({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false);
    useEffect(() => {
        const token = cookie.getCookie("tokenUser");
        if (!token) {
            localStorage.removeItem("infor");
            dispatch(infor({}));
            navigate("/login");
            return;
        }
        const fetchApi = async () => {
            try {
                const res = await auth(token);
                if (res.code === 200) {
                    setCheck(true);
                } else {
                    localStorage.removeItem("infor");
                    dispatch(infor({}));
                    cookie.deleteCookie("tokenUser");
                    dispatch(checkAuthen(false));
                    navigate("/login");
                }
            } catch (error) {
                dispatch(infor({}));
                localStorage.removeItem("infor");
                console.error("Error:", error);
                navigate("/login");
            }
        };
        fetchApi();
    }, [navigate]);
    return (
        <>
            {
                check && children
            }
        </>
    )
}

export default AuthClient;