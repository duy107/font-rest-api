import "./style.scss"
import * as cookie from "../../../../helpers/cookie"
import { Link, NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { auth } from "../../../../services/client/auth.services";


function Header() {
    const tokenUser = cookie.getCookie("tokenUser");
    const token = cookie.getCookie("token");
    const state = useSelector(state => state.checkLogin);
    const infor = useSelector(state => state.infor);
    const [check, setCheck] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await auth(tokenUser);
                if (res.code !== 200) {
                    cookie.deleteCookie("tokenUser");
                    setCheck(false);
                } 
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__main">
                        <Link to={(tokenUser) ? "/" : "/admin/overview"} className="header__logo">
                            <img src="http://res.cloudinary.com/dxx1lgamz/image/upload/v1732164826/lydd0molalmluj0xfy02.jpg" alt="logo" />
                        </Link>
                        <div className="header__actions">
                            {(tokenUser && state && check) || (token && state && check) ? (
                                tokenUser && state ? (
                                    <>
                                        <Link to={"/infor"}><Button iconPosition="start"  icon={<FaUser/>}>{infor.fullName}</Button></Link>
                                        <Link to={"/logout"}><Button icon={<IoIosLogOut />}>Đăng xuất</Button></Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to={"/admin/overview"}><Button icon={<CiUser />}>Quản lý</Button></Link>
                                        <Link to={"/logout"}><Button icon={<IoIosLogOut />}>Đăng xuất</Button></Link>
                                    </>
                                )
                            ) : (
                                <>
                                    <NavLink to={"/login"}><Button>Đăng nhập</Button></NavLink>
                                    <NavLink to={"/register"}><Button type="primary">Đăng ký</Button></NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;