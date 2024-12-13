import "./style.scss"
import * as cookie from "../../../../helpers/cookie"
import { Link, NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { auth } from "../../../../services/client/auth.services";
import logo from "./logo.png"

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
        if (tokenUser) {
            fetchApi();
        }
    }, []);
    return (
        <>
            <header className="header bg-white shadow-xl w-screen sticky inset-0 z-50 mb-7">
                <div className="container mx-auto">
                    <div className="header__main flex w-full min-h-[60px] p-3 items-center">
                        {/* <Link to={(tokenUser) ? "/" : "/admin/overview"} className="header__logo">
                            <img src="http://res.cloudinary.com/dxx1lgamz/image/upload/v1732164826/lydd0molalmluj0xfy02.jpg" alt="logo" />
                        </Link> */}
                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                            <img src={logo} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-1 gap-5 justify-center">
                            <Link to="/" className="text-gray-400 text-[15px] hover:text-gray-700 transition-all duration-[350ms] ease-in-out cursor-pointer no-underline">Trang chủ</Link>
                            <Link to="/" className="text-gray-400 text-[15px] hover:text-gray-700 transition-all duration-[350ms] ease-in-out cursor-pointer no-underline">Về chúng tôi</Link>
                            <Link to="/" className="text-gray-400 text-[15px] hover:text-gray-700 transition-all duration-[350ms] ease-in-out cursor-pointer no-underline">Tin tức</Link>
                            <Link to="/" className="text-gray-400 text-[15px] hover:text-gray-700 transition-all duration-[350ms] ease-in-out cursor-pointer no-underline">Blog</Link>
                            <Link to="/" className="text-gray-400 text-[15px] hover:text-gray-700 transition-all duration-[350ms] ease-in-out cursor-pointer no-underline">Liên hệ</Link>
                        </div>
                        <div className="header__actions">
                            {((tokenUser && state && check) || (token && state && check)) ? (
                                tokenUser && state && check ? (
                                    <div className="flex gap-2">
                                        <Link to={"/infor"}><Button iconPosition="start" icon={<FaUser />}>{infor.fullName}</Button></Link>
                                        <Link to={"/logout"}><Button icon={<IoIosLogOut />}>Đăng xuất</Button></Link>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <Link to={"/admin/overview"}><Button icon={<CiUser />}>Quản lý</Button></Link>
                                        <Link to={"/logout"}><Button icon={<IoIosLogOut />}>Đăng xuất</Button></Link>
                                    </div>
                                )
                            ) : (
                                <div className="flex gap-2">
                                    <NavLink to={"/login"}><Button>Đăng nhập</Button></NavLink>
                                    <NavLink to={"/register"}><Button type="primary">Đăng ký</Button></NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;