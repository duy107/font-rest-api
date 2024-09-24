import { useState } from "react";
import { Button, Layout } from "antd";
import { SearchOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { IoHomeOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom"
import MenuSider from "../../MenuSider";


import logo from "../../../assets/images/logo.png"
import logo_fold from "../../../assets/images/logo-fold.png"
import "./style.scss";
import { IoIosLogOut } from "react-icons/io";

const { Sider, Content } = Layout;

function LayoutAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Layout>
                <header className="header__admin">
                    <div className={"header__admin__logo " + (collapsed && "header__admin__logo--collapsed")}>
                        <img src={!collapsed ? logo : logo_fold} alt="logo" />
                    </div>
                    <div className="header__admin__navs">
                        <div className="header__admin__navs__left">
                            <div className="header__admin__collapse" onClick={() => setCollapsed(!collapsed)}>
                                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            </div>
                        </div>
                        <div className="header__admin__navs__right">
                            <Link to={"/home-admin"}><Button icon={<IoHomeOutline />}>Trang chủ</Button></Link>
                            <Link to={"/logout"}><Button icon={<IoIosLogOut />}>Đăng xuất</Button></Link>
                        </div>
                    </div>
                </header>
                <Layout className="sider">
                    <Sider collapsed={collapsed} theme="light">
                        <MenuSider />
                    </Sider>
                    <Content className="content">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default LayoutAdmin;