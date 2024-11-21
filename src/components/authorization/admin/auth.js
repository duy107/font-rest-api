import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as cookie from "../../../helpers/cookie";
import {auth} from "../../../services/admin/auth.services";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../../actions/checkLogin";
function AuthAdmin({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false);
    useEffect(() => {
        const token = cookie.getCookie("token");
        if (!token) {
            navigate("/admin/login");
            return;
        }
        const fetchApi = async () => {
            try {
                const res = await auth(token);
                if (res.code === 200) {
                    setCheck(true);
                } else {
                    cookie.deleteCookie("token");
                    dispatch(checkAuthen(false));
                    navigate("/admin/login");
                }
            } catch (error) {
                console.error("Error:", error);
                navigate("/admin/login");
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

export default AuthAdmin;