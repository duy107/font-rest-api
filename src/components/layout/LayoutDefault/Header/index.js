import { Button } from "antd"
import { default as logo } from "../../../../assets/images/anh02.jpg"
import "./style.scss"
import * as cookie from "../../../../helpers/cookie"
import { Link, NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";


function Header() {
    const token = cookie.getCookie("token");
    const isUser = cookie.getCookie("isUser");
    const state = useSelector(state => state.checkLogin);
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__main">
                    <Link to={(!!token ^ !!isUser) ? "/home-admin" : "/"} className="header__logo">
                            <img src={logo} alt="logo" />
                        </Link>
                        <div className="header__actions">
                            {token && state ? (
                                <>
                                   { !!!isUser && <Link to={"/admin/overview"}><Button icon={<CiUser />}>Quản lý</Button></Link>}
                                    <Link to={"/logout"}><Button icon={<IoIosLogOut />}>Đăng xuất</Button></Link>
                                </>
                            ) : (
                                <>
                                    <NavLink to={"/signin/user_signin"}><Button>Đăng nhập</Button></NavLink>
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